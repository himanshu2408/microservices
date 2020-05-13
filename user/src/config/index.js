let DB_URI = "mongodb://mongodb:27017/userdb";

if (process.env.MONGO_DB_URI) {
    DB_URI = process.env.MONGO_DB_URI;
}

module.exports = {
    DB_URI
};