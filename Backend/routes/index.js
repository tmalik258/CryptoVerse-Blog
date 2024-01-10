const express = require( 'express' );
const authController = require( '../controller/authController' );

const router = express.Router();

// testing
router.get( '/test', ( req, res ) => res.json( { msg: 'Hello World via router' } ) );

// User

// register
router.post( '/register', authController.register );
// login
router.post( '/login', authController.login );
// logout
router.post( '/logout', authController.logout );
// refresh

// Blog
// CRUD
// create
// read all blogs
// read one blog by id
// update a blog by id
// delete a blog by id

// Comment
// create comment
// read comments of a blog by blog id

module.exports = router;