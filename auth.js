var mysql = require("mysql");
function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
    router.get("/",function(req,res){
           res.json({"Message" : "Hello World !"});
    });
    router.post("/auth",function(req,res){
		var credentials = req.body;
        var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
        var table = ["user","email",credentials.email,"password",md5(credentials.password)];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
				res.status(500);
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
				if (rows.length == 0) {
					res.status(403);
					res.json({"Error" : false, "Message" : "credentials not correct"});
				}
				else {
					res.json({"Error" : false, "Message" : "Success","User" : rows});
				}
            }
        });
    });
	
}

module.exports = REST_ROUTER;