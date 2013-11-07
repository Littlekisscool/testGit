// Ce code a pour but de tester Node.js et bien comprendre son fonctionnement
// d'où l'affulence de commentaires :)

// Charge la bil (module) http de Node.js
var http = require('http');
// Le module url qui nous servora à réupérer la page demandée par le visiteur
var url = require("url");
// Le module qui va nous découper les paramètres inclus dans l'URL du visiteur
var querystring = require('querystring');
// Un module custom
var monmodule = require('moduleperso');

console.log('Experimentations Node.js, c\'est parti !\n');

// Appel d'une fonction de mon module custom
monmodule.direBonjour();

// Crée le serveur HTTP écoutant sur le port 1337 en 127.0.0.1
// son paramètre est la fonction executée qund un visiteur se connecte au serveur via HTTP
// @param req = la requete du visiteur. cet objet contient toutes les informations sur ce que le visiteur a demandé. On y trouve le nom de la page appelée, les paramètres, les éventuels champs de formulaires remplis..
// @param res = la reponse renvoyée. C'est cet objet qu'il faut remplir pour donner un retour au visiteur.
var server = http.createServer(function (req, res) 
{
	// On parse la requete du visiteur pour obtenir le nom de la page demandée
	var page = url.parse(req.url).pathname;
	// On parse la requete du visiteur pour obtenir ses paramètres
	var params = querystring.parse(url.parse(req.url).query);

	var pagePrinted = '';
    if (page == '/') 
    {
		// code 200 dans le header de la réponse pour dire que tout va bien. Ainsi que el type MIME
		res.writeHead(200, {'Content-Type': 'text/html'});
        var paramsPrinted = '';
        if ('prenom' in params && 'nom' in params) 
        {
        	paramsPrinted = params['prenom'] + ' ' + params['nom'];
	    }
	    else 
	    {
	        paramsPrinted = 'visiteur anonyme';
	    }
	    pagePrinted = 'Vous êtes à l\'accueil, que puis-je pour vous '+paramsPrinted+'?';
    }
    else
    {
		// code 404 dans le header pour dire que la page n'existe pas. Ainsi que el type MIME
		res.writeHead(404, {'Content-Type': 'text/html'});
        pagePrinted = 'Erreur 404 : la page '+page+' que vous avez demandé n\'exite pas !';
        monmodule.direByeBye();
    }


	// La réponse pour le navigateur (pour faire plus propre nous devrons plus tard passer par un templater)
	res.write('<!DOCTYPE html>'+
'<html>'+
'    <head>'+
'        <meta charset="utf-8" />'+
'        <title>Testons Node.js !</title>'+
'    </head>'+ 
'    <body>'+
'       <p>Bonjour visiteur !</p>'+
'       <p>'+pagePrinted+'</p>'+
'    </body>'+
'</html>');
	// La toute dernière réponse
	res.end()

}).listen(1337, "127.0.0.1");

// On écoute sur l'évènement de connexion du serveur
server.on('connection', function()
{
    console.log('Un utilisateur s\'est connecté à notre serveur !\n');
})

// On écoute sur l'évènement de fermeture du serveur
server.on('close', function()
{
    console.log('Extinction du serveur, bye bye !\n');
})
