const config = require('./config/config')
const express = require('express')
const cors = require("cors");
const app = express();
const path = require('path')
const corsOptions = { origin: config.allow_cors_url, optionsSuccessStatus: 200 };

app.use(cors(corsOptions));
app.use(express.urlencoded({ limit: '20mb', extended: false }))
app.use(express.json({ limit: '20mb' }))

const apiRouter = require('./router/index.router');
app.use('/', apiRouter);

const db = require("./models");

app.get('/', (req, res) => {
  res.status(200).send({ message: 'hello world' })
})

if (config.server_port === 443) {
  const https = require('https');
  const httpsServer = https.createServer({
    key: fs.readFileSync(config.server_key_file),
    cert: fs.readFileSync(config.server_cert_file),
  }, app);

  httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
  });
} else {
  const http = require('http');
  const httpServer = http.createServer(app);
  httpServer.listen(config.server_port, () => {
    console.log('HTTP Server running on port ' + config.server_port);
  });
}

