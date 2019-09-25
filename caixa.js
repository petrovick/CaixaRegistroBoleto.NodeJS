/*
const server = require("./src/server");
server.listen(process.env.PORT || 5006);
*/

//const http = require("http");
const server = require("./src/server");
//const app = http.Server(server)

if(process.env.PORT) {
    server.listen(process.env.PORT, '0.0.0.0', () => console.log("Server has been started.."));
}
else
{
    throw new Exception('PORT not defined at .env file.');
}