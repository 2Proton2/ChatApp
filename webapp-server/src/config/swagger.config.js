import swaggerUI from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import packageFile from '../../package.json' assert {type: 'json'};
import dotenv from 'dotenv';
dotenv.config({path: ".env"});

export const setUpSwaggerConfig = (app, port) => {
    console.log(port);
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: packageFile.name,
                version: packageFile.version,
                description: packageFile.description
            },
            servers: [{ url: `http://localhost:${port}`, description: 'Development Server' }],
        },
        apis: ['./src/routes/*.route.js'],
    };

    const spec = swaggerJsdoc(options);

    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(spec));
}