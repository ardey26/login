const mongoose = require('mongoose');
require('dotenv').config();
// MONGOOSE CONNECTION TO MONGODB CLUSTER

const mongoConnect = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`MONGODB SUCCESSFULLY CONNECTED: ${connection.connection.host}`)

        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = mongoConnect;
