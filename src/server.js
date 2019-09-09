const express = require('express'); 
const logger  = require('morgan');
const helmet  = require('helmet');
//const cors    = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); 
const path = require('path'); 
//const multiparty = require('multiparty');

// global variable
require('module-alias/register');
global.__base = __dirname + '/';

var app = express();

const ApiRoutes = require('./api');
const AuthRoutes = require('./api/auth'); 

// load middleware
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

const expressSwagger = require('express-swagger-generator')(app);

app.use('/api', ApiRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/cms/', ApiRoutes)

let options = {
  swaggerDefinition: {
    info: {
        description: 'Mobile API',
        title: 'Swagger',
        version: '2.0.0',
    },
        host: 'localhost:3001',
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
  files: ['./api/auth/*.js', './api/mobile/*.js'], //Path to the API handle folder
  route: {
      url: '/api-docs',
      docs: '/api-docs.json'
  }
};
expressSwagger(options)

let option_cms = {
    swaggerDefinition: {
      info: {
          description: 'CMS API',
          title: 'Swagger',
          version: '2.0.0',
      },
          host: 'localhost:3001',
          basePath: '/api/cms',
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
    files: ['./api/cms/*.js'], //Path to the API handle folder
    route: {
        url: '/cms-docs',
        docs: '/cms-docs.json'
    }
  };
expressSwagger(option_cms)

dotenv.config();
const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

app.listen(port, hostname, () =>
  console.log(`Your port is... ${hostname} ${process.env.PORT}`),
); 

module.exports = app;


