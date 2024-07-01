const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const path = require("path");

server.use(middlewares);

// Middleware para gerar IDs sequenciais
server.use((req, res, next) => {
  if (req.method === "POST") {
    const db = JSON.parse(fs.readFileSync(path.join(__dirname, "db.json")));
    const investors = db.investidores;
    const lastId = investors.length ? investors[investors.length - 1].id : 0;
    req.body.id = lastId + 1;
  }
  next();
});

server.use(router);
server.listen(3001, () => {
  console.log("JSON Server is running on port 3001");
});
