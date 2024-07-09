const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/nombre') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString(); // Convertir el buffer en string y agregarlo al cuerpo
    });

    req.on('end', () => {
      const { nombre } = JSON.parse(body); // Parsear el cuerpo como JSON

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ nombre: nombre })); // Devolver el nombre en formato JSON
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
