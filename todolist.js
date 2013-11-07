// Créer une TODO List en Node.js

// Un petit framework node
var express = require('express');
var app = express();

/* On utilise les cookies, les sessions et les formulaires */
app.use(express.cookieParser())
.use(express.session({secret: 'todotopsecret'}))
.use(express.bodyParser())
// middleware qyu créer un array vide par défaut si n'existe pas en session
.use(function(req, res, next)
{
	if (typeof(req.session.todolist) == 'undefined') 
	{
        req.session.todolist = [];
    }
    // On passe à la suite maintenant que ce point a été testé
    next();
})

/* On affiche la todolist et le formulaire */
.get('/todo', function(req, res) 
{
    res.setHeader('Content-Type', 'text/html');
    res.render('todolisthtml.ejs', {todoList: req.session.todolist});
})
/* On ajoute un élément à la todolist */
.post('/todo/add', function(req, res) 
{
	if (req.body.newtodo != '') 
	{
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})
/* Supprime un élément de la todolist */
.get('/todo/delete/:id', function(req, res) 
{
    if (req.params.id != '')
    {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})
.use(function(req, res, next){
    res.redirect('/todo')
});

 
app.listen(1337);