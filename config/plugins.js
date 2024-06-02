const dbConfig = require("./dbConfig.json");

const plugins = [
    {
        plugin: require('hapi-mongodb'),
        options: dbConfig
    }
];


module.exports = plugins;