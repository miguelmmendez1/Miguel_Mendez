const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection');

const app = express();

// importing routes
const productoRoutes = require('./routes/producto');
const categoriaRoutes = require('./routes/categoria')

// settings
app.set('port', process.env.PORT || 15000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'miguel_mendez'
}, 'single'));
app.use(express.urlencoded({extended: false}));

// routes
app.use('/', productoRoutes);
app.use('/categorias', categoriaRoutes)

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
