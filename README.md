<h1>Simple REST API based on node.js with mysql connectivity</h1>

This is a simple example of how you can build a REST API based on nodejs with a mysql db as data store.

<h2>Getting started</h2>

<ol>
<li> get the code : git clone
<li> install dependecies : npm install
<li> create a local mysql database and create the table user in it, see mysql table
<li> define the mysql credentials in server.js
<li> start the rest api server : npm start
</ol>

<h2>REST API</h2>

<h3>User Management</h3>
<b>GET http://localhost:8081/api/users</b></br>

<pre>
POST http://localhost:8081/api/users
{
	"email": "hans@mydomain.com",
	"name": "neuer name",
	"password": "meinpassword",
}
</pre>
<b>GET http://localhost:8081/api/users/hans@mydomain.com</b></br>
<pre>

</pre>
<b>PUT http://localhost:8081/api/users/hans@mydomain.com</b></br>
<pre>
{
	"name": "neuer name",
	"password": "meinpassword"
}
</pre>
<b>DELETE http://localhost:8081/api/users/hans@mydomain.com</b></br>
<pre>

</pre>

<h3>Auth</h3>

<b>POST http://localhost:8081/api/auth</b></br>

<pre>
POST http://localhost:8081/api/auth
{
	"email": "hans@mydomain.com",
	"password": "meinpassword",
}
</pre>


<h2>MySQL table</h2></br>
<pre>
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(70) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `groups` varchar(1024) NULL,
  `password` varchar(45) DEFAULT NULL,
  `join_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

</pre>