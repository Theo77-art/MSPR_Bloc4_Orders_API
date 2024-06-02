'use strict';

const Hapi = require('@hapi/hapi');
const Routes = require('./app/routes');
const Plugins = require('./config/plugins');

const init = async () => {
    const server = Hapi.server({
        port: 8000,
        host: 'localhost'
    });

    await server.register(Plugins);

    Routes.forEach((route) => server.route(route));

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init()