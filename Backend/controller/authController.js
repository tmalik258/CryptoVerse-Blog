const Joi = require( "joi" );
const bcryptjs = require( 'bcryptjs' );
const User = require( '../models/user' );

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const authController = {
	async register(req, res, next) {
		// 1. Validate user input
		const userRegisterSchema = Joi.object({
			username: Joi.string().alphanum().min(3).max(20).required(),
			email: Joi.string().email().required(),
			name: Joi.string().max(30).required(),
			password: Joi.string().pattern(passwordPattern).required(),
			confirmPassword: Joi.ref("password"),
		});

		const { error } = userRegisterSchema.validate(req.body);

		// 2. if error in validation -> return error via middleware,
		if (error) {
			return next(error);
		}
		// 3. if email/username already exists -> return error
		const { username, email, name, password } = req.body;

		try {
			const emailTaken = await User.exists({ email });
			const usernameTaken = await User.exists({ username });
			if (emailTaken) {
				const error = {
					status: 409,
					message: "Email already registered, use another email!",
				};

				return next(error);
			}
			if (usernameTaken) {
				const error = {
					status: 409,
					message: "Username not available, another username",
				};
				return next(error);
			}
		} catch (error) {
			return next(error);
		}
		// 4. password hash
        const hashedPassword = await bcryptjs.hash( password, 10 );
        // 5. create new user and save to DB
        const userToRegister = new User( {
            username,
            email,
            name,
            password: hashedPassword
        } );

        const user = await userToRegister.save();
        // 6. response send
        return res.status( 201 ).json( { user } );
	},
	async login() {},
	async logout() {},
};

module.exports = authController;
