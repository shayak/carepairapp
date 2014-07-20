var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/uploadText"] = requestHandlers.uploadText;
handle["/uploadFile"] = requestHandlers.uploadFile;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);

