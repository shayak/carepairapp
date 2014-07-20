function route(handle, pathname, response, request)
{
    console.log("About to route to request for " + pathname);
    if (pathname == '/uploadText')
    {
        var postData = "";
        request.addListener("data",
            function(postDataChunk)
            {
                postData += postDataChunk;
                console.log("Received POST data chunk '" +
                postDataChunk + "'.")
            });

        request.addListener("end",
            function()
            {
                handle[pathname](response, postData);
            });
    }
    else if (typeof handle[pathname] == 'function')
    {
        handle[pathname](response, request);
    }
    else
    {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}

exports.route = route;
