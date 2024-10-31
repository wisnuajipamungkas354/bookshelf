'use strict';
import routes from './routes.js';
import Hapi from '@hapi/hapi';

const init = async () => {

    const server = Hapi.server({
        port: 9000,
        host: 'localhost'
    });

    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();