const routerm = require('express').Router();

const categoriaController = require('../controllers/categoriaController');

routerm.get('/', categoriaController.listm);
routerm.post('/addm', categoriaController.savem);
routerm.get('/updatem/:id', categoriaController.editm);
routerm.post('/updatem/:id', categoriaController.updatem);
routerm.get('/deletem/:id', categoriaController.deletem);


module.exports = routerm;

