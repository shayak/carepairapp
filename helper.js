var fs = require("fs");

var renderHtml = function(content, response) 
{
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(content, 'utf-8');
}

var renderHtmlFile = function(filename, response)
{
    fs.readFile(filename,
        function(error, content)
        {
            if (error)
                serverError(500, response);
            else
                renderHtml(content, response);
        });
}

var serverError = function(code, response, content) 
{
    response.writeHead(500, {'Content-Type': 'text/plain'});
    response.end(content, 'utf-8');
}

var renderImage = function(response)
{
    response.writeHead(200, {'Content-Type': 'image/png'});
    fs.createReadStream('./tmp/test.png').pipe(response);
}

exports.renderHtml = renderHtml;
exports.serverError = serverError;
exports.renderImage = renderImage;
exports.renderHtmlFile = renderHtmlFile;
