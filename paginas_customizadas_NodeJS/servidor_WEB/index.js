const http = require('http');
const fs = require('fs');
const porta = 443;
const readline = require('readline');

const servidor = http.createServer((req, res) => {
  fs.readFile('pagina.html', (err, arquivo) => {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(arquivo);
    res.end()
  })
  async function readFileByLine(file) {
    const fileStream = fs.createReadStream(file);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    for await (const line of rl) {
      console.log(line);
    }
  }
  readFileByLine('texte.txt')
})

servidor.listen(porta, () => { console.log('Servidor rodando') });