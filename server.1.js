var express = require('express')
var app = express()
var path = process.cwd();
var moment = require('moment');
var url = require('url');

app.route('/').get(function (req, res) {
	res.sendFile(path + '/public/index.html');
});

app.get('/*', function(req, res) {
    var requrl = url.parse(req.url).pathname;
    var noslashurl = requrl.replace(/^\/|\/$/g, '');
    var cleaninput = noslashurl.replace(/%20+/g, '');
    
    if (isNaN(cleaninput)) {
        var unixtime = moment(cleaninput, "MMMM-DD-YYYY").unix()
        var naturaltime = moment(cleaninput, "MMMM-DD-YYYY").format("MMMM D, YYYY")
    }
    else {
        var unixtime = moment(+cleaninput)
        var naturaltime = moment.unix(+cleaninput).format("MMMM D, YYYY")
    }
    res.send("{ \"unix\": "+unixtime+", "+"\"natural\": \""+naturaltime+"\" }")
});

app.listen(8080, function() {
	console.log('Node.js listening on port 8080 ...')
})
