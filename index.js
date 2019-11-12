const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const banco = require("./banco");

var port = Number(process.env.PORT || 3111);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log("listening to the port " + port);
});

app.post("/pessoa", (req, res) => {
  var body = req.body;

  const nome = body.nome;
  const tipo = body.tipo;
  const email = body.email;
  const telefone = body.telefone;
  const documento = body.documento;

  banco.execSQLQuery(
    `INSERT INTO pessoa(nome, tipo, email, telefone, documento) VALUES('${nome}','${tipo}','${email}','${telefone}','${documento}')`,
    res
  );
});


app.get("/pessoa/:id", (req, res) => {
  let sql = "SELECT id, nome, tipo, email, telefone, documento FROM pessoa";
  if (req.params.id) {
    sql += " where id=" + req.params.id;
  }

  return banco.execSQLQuery(sql, res);
});

app.put("/pessoa/:id", (req, res) => {
  var body = req.body;

  const nome = body.nome;
  const tipo = body.tipo;
  const email = body.email;
  const telefone = body.telefone;
  const documento = body.documento;

  let sql = "UPDATE pessoa set ";

  if (nome) {
    sql += "nome = " + nome;
  }
  if (tipo) {
    sql += "tipo = " + tipo;
  }
  if (email) {
    sql += "email = " + email;
  }
  if (telefone) {
    sql += "telefone = " + telefone;
  }
  if (documento) {
    sql += "documento = " + documento;
  }

  sql + "WHERE id = " + req.params.id;

  return banco.execSQLQuery(sql, res);
});
