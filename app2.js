// Voyons un peu les routes avec le module express
// Et les vues avec le templater EJS

// Un petit framework node
var express = require('express');
var app = express();

// Si appel à l'url d'accueil
app.get('/', function(req, res) 
{
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à l\'accueil');
})
// URL particulières
.get('/cetteurlexiste', function(req, res) 
{
    res.setHeader('Content-Type', 'text/plain');
    res.end('Un vrai Easter Egg cette URL (ou pas) !');
})
// Gestion des URL non existantes
.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Cette page n\'existe pas !');
})
// Gestion des URL avec paramètre variable
.get('/etage/:etagenum/chambre', function(req, res) 
{
    res.setHeader('Content-Type', 'text/plain');
    // Envoi de la variable au template chambre.ejs
    res.render('chambre.ejs', {etage: req.params.etagenum});
});
 
app.listen(1337);