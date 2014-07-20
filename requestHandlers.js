var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");
var helper = require("./helper"); 

function start(response)
{
    console.log("Request handler 'start' was called.");
    
    //var body = render.renderHtml
    
    helper.renderHtmlFile('view/index.html', response);
}

function uploadText(response, postData)
{
    console.log("Request handler 'uploadText' was called");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You've sent: " + querystring.parse(postData).text);
    response.end();    
}

function uploadFile(response, request)
{
    console.log("Request handler 'uploadFile' was called");

    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request,
        function(error, fields, files)
        {
            console.log("parsing done");
            fs.rename(files.upload.path, "./tmp/test.png", 
                function(error)
                {
                    if (error)
                    {
                        fs.unlink("./tmp/test.png");
                        fs.rename(files.upload.path, "./tmp/test.png");
                    }
                });
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write("received image:<br/>");
            response.write("<img src='/show' />");
            response.end();
        });
}

function show(response)
{
    console.log("Request handler 'show' was called.");
    helper.renderImage(response);  
    //response.writeHead(200, {"Content-Type": "image/png"});
    //fs.createReadStream("tmp/test.png").pipe(response);
}

exports.start = start;
exports.uploadText = uploadText;
exports.uploadFile = uploadFile;
exports.show = show;
