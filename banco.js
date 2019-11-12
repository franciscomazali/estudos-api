const mysql = require('mysql');

function execSQLQuery(sqlQry, res) {
  const connection = mysql.createConnection({
    host: "db4free.net",
    port: 3306,
    user: "estudos",
    password: "estudos@666",
    database: "estudosdb"
  });

  connection.query(sqlQry, function(error, results, fields) {
    if (error) res.json(error);
    else res.json(results);
    connection.end();
    console.log("executou!");
  });
}

module.exports = { execSQLQuery };
