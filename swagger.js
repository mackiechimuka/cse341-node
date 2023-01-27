const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info:{
        title:'My Contact Api',
        description: 'My contact api'
    },
    host:'https://cse341-node-p.onrender.com/contacts',
    schemes:['http'],
};

const output = './swagger.json';
const endpoint =['./src/routes/index']

swaggerAutogen(output,endpoint,doc);