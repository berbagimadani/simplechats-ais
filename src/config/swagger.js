'strict'; 
const dotenv = require('dotenv'); 

dotenv.config();
const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

let swagger = {
  swaggerDefinition: {
    info: {
        description: 'Simple Chat Labs for Warunk Pintar, stack: redis, socket.io, express js. creator Ade iskandar',
        title: 'Warung Pintar',
        version: '2.0.0',
    },
        host: hostname+':'+port,
        basePath: '/api',
        produces: [
        "application/json",
        "application/xml"
    ],
    schemes: ['http'],
    securityDefinitions: {
        JWT: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: "",
        }
    }
  },
  basedir: __dirname, //app absolute path
  files: ['../controllers/api/*.js'], //Path to the API handle folder
  route: {
      url: '/api-docs',
      docs: '/api-docs.json'
  }
};

module.exports  = swagger