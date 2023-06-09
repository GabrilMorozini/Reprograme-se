const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
var path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const porta = 443;

app.use(session({ secret: '1234567890' }));

app.use(bodyParser.urlencoded({ extended: true }));

var login = 'admin';
var senha = '1234';

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, './'));

app.post('/', (req, res) => {
  if (req.body.password === senha && req.body.login === login) {
    req.session.login = login;
    res.render('logado');
  } else {
    res.render('home');
  }
});

app.get('/', (req, res) => {
  if (req.session.login) {
    res.render('logado');
    console.log('Usuário logado: ' + req.session.login)
  } else {
    res.render('home');
  }
});

app.get("/enviarEmail", (req, res) => {
  if (req.session.login) {
    res.render("email", { mensagem: "" });
  }
  else {
    res.render("home");
  }
});

app.get('/envioEmail', async (req, res) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "",
      pass: ""
    }
  });

  var message = {
    from: "teste@email.com",
    to: "teste@email.com",
    subject: "Teste",
    text: "Esse é o texto da atividade",
    html: "Esse é o texto da atividade"
  };

  transport.sendMail(message, function(err) {
    if (err) {
      res.render("email", { mensagem: "Erro: e-mail não enviado!" });
    }
    else {
      res.render("email", { mensagem: "E-mail enviado com sucesso!" });
    }
  })
})
app.listen(porta, () => {
  console.log('Servidor rodando');
});