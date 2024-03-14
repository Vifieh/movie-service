module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: " ",
    DB: "movie-service",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};