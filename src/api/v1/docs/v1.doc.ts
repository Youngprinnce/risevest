import { Application } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
const {NODE_ENV, PORT, baseUrl} = process.env;

export default ({ app }: { app: Application }) => {
  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      contact: {
        name: 'Ajiboye Adedotun',
        email: '',
        url: ''
      },
      title: 'API',
      description: 'Backend Server - API Documentation',
    },
    servers: [
      {
        url: baseUrl,
        description: 'Live Server'
      },
      {
        url: `http://localhost:${PORT}`,
        description: 'Development Server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
    },
    tags: [
      {
        name: 'User',
        description: 'Users routes'
      },
      {
        name: 'Post',
        description: 'Posts routes'
      },
    ],
  };

  const options = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Backend Server - API Documentation",
    explorer: true,
    swaggerOptions: {
      urls: [
        {
          url: '/v1/api-docs',
          name: 'v1'
        },
      ]
    }
  };
  const swaggerDoc = swaggerJSDoc({swaggerDefinition, apis: ['./src/api/v1/components/**/*.yml']});

  app.use('/v1/api-docs', swaggerUi.serveFiles(swaggerDoc), swaggerUi.setup(swaggerDoc, options));
};
