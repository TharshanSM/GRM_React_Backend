const mongoose = require("mongoose");
const { MongoDBURI } = process.env;

const connect = async () => {
    try {
        const conn = await mongoose.connect(MongoDBURI);
        console.log(
            `MongoDB Connected: ${conn.connection.host}`.cyan.underline
        );
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
};

module.exports = connect;
