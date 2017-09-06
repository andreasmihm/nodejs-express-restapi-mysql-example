var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var md5 = require('MD5');
var rest = require("./rest.js");
var auth = require("./auth.js");
var app  = express();

function REST(){
    var self = this;
    //self.connectMysql();
	self.configureExpress(null);
};

REST.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        host     : 'localhost',
        user     : 'nodejs_rest_demo',
        password : 'nodejs_rest_demo',
        database : 'nodejs_rest_demo',
        debug    :  false
    });
    pool.getConnection(function(err,connection){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(connection);
        }
    });
}

REST.prototype.configureExpress = function(connection) {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      var router = express.Router();
      app.use('/api', router);
      var rest_router = new rest(router,connection,md5);
	  var rest_router2 = new auth(router,connection,md5);
      self.startServer();
}

REST.prototype.startServer = function() {
      app.listen(8081,function(){
          console.log("All right ! I am alive at Port 8081.");
      });
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL n" + err);
    process.exit(1);
}

new REST();