const https = require('https');
const fs = require('fs');

const path = require('path');
const keyPath = path.join('C:/Users/aaron/cert.key');
const certPath = path.join('C:/Users/aaron/cert.pem');

const options = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem'),
};


server.listen(3000);
// next start -p 3000 -o https://localhost:3000 --key key.pem --cert cert.pem
