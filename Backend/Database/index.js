const mongoose = require( 'mongoose' );
const { MONGODB_CONNECTION_STRING } = require("../config/index");

const dbConnect = async () =>
{
    try
    {
        const conn = await mongoose.connect( MONGODB_CONNECTION_STRING );
        console.log(`MongoDB connected with host: ${conn.connection.host}`);
    }
    catch ( err )
    {
        console.error('Error connecting to MongoDB', err);
    }
};

module.exports = dbConnect;