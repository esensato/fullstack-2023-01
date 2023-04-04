// http modulo padrao do Nodejs
const http = require('http');

// http://localhost:8000/funcionario/10
http.createServer((req, res) => {
console.log(JSON.stringify(req.headers));
console.log(req.headers['host']);
console.log(req.method);
console.log(req.url);

res.write("OK!");
res.end();
}).listen(8000);
