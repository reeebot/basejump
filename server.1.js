var express = require('express')
var app = express()
var moment = require('moment');
var url = require('url');

app.route('/').get(function (req, res) {
    res.sendFile(process.cwd()+'/public/index.html');
});

app.get('/*', function(req, res) {
    var requrl = url.parse(req.url).pathname;
    var cleanreq = requrl.replace(/^\/|\/$|%20+/g, '');
    
    if (isNaN(cleanreq)) {
        var unixtime = moment(cleanreq, "MMMM-DD-YYYY").unix()
        var naturaltime = moment(cleanreq, "MMMM-DD-YYYY").format("MMMM D, YYYY")
    }
    else {
        var unixtime = moment(+cleanreq)
        var naturaltime = moment.unix(+cleanreq).format("MMMM D, YYYY")
    }
    
    res.send("{\"unix\":"+unixtime+","+"\"natural\":\""+naturaltime+"\"}")
});

app.listen(8080, function() {
    console.log('Node.js listening on port 8080 ...')
})