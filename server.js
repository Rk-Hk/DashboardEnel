const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
app.use(function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');
  
    next();
  });

app.use(express.static(__dirname+'/dist/plan-mtto-enel'));
app.get('/*',function(req,res){
    res.sendFile('index.html', {root: 'dist/plan-mtto-enel/'});
});
// path.join(__dirname+'/dist/plan-mtto-enel/index.html')

const port = process.env.PORT || '9000';
app.set('port', port);

const server = http.createServer(app);

// listen (start app with node server.js) ==============================================
server.listen(port, () => console.log(`API running on localhost:${port}`));
