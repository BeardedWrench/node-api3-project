// require your server and launch it
const server = require('./api/server');

const port = process.env.PORT || 4000;

server.listen( port, () => console.log(`Running on port ${port}`))