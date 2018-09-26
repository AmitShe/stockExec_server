"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // this shim is required
var routing_controllers_1 = require("routing-controllers");
var user_controller_1 = require("./controllers/user.controller");
// creates express app, registers all controller routes and returns you express app instance
var app = routing_controllers_1.createExpressServer({
    controllers: [user_controller_1.UserController] // we specify controllers we want to use
});
// run express application on port 3000
app.listen(3000);
