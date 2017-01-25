require('dotenv').config(); // tarvitaanko?

var awsIot = require('aws-iot-device-sdk');
var device = awsIot.device({
   keyPath: "certs/DogFeeder.private.key",
  certPath: "certs/DogFeeder.cert.pem",
    caPath: "certs/rootCA.pem",
  clientId: "Asiakas" + Math.floor(Math.random() * 20),
    region: "eu-west-1"
});

/* ExpressJS alkaa */
/* luodaan serveri ja laitetaan se kuuntelemaan porttia 9000 */
/* kun porttiin 9000 tulee pyyntö, serverille kerrotaan siitä ja riippuen pyynnöstä tehdään jokin toiminto */
var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/src/static/index.html'); //tyhjä pyyntö -> lähetetään /static/index.html
});

app.use(express.static(__dirname + '/src/static')); //pyyntö static-kansioon -> lähetetään pyydetty tiedosto kansiosta

/* client voi pyytää tiedostoja vain kahdesta yllä olevasta paikasta */
/* eli jos pyydetään esim. /server/secureFile.js -> ei tee yhtikäs mitään */

/* API endpointit */
app.post('/feed/:mac', function(req, res){
	var macParsed = String(req.params.mac).replace(/%3A/g, ":");
    device.publish('DogFeeder/' + macParsed, JSON.stringify({ foodfeed: 'instant' }));
});

serv.listen(9000, err => {
	if (err) {
		return console.error(err);
	}
	console.log("Serveri startattu: kuuntelee porttia 9000.");
});
/* ExpressJS loppuu */

