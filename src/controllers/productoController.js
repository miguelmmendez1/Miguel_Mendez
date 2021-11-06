const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(`
    SELECT
    categorias.categoria AS categoria,
    producto,
    productos.id as id,
    precio,
    disponibles
    FROM productos
    LEFT JOIN categorias
    ON productos.categoria = categorias.id;
      `, (err1, productos) => {
     if (err1) {
      res.json(err1);
     }
     conn.query('SELECT * FROM categorias', (err2, categorias) => {
       if (err2) {
        res.json(err2);
       }
       res.render('productos', {
          data: productos,
          categorias
       });
     });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO productos set ?', data, (err, producto) => {
      console.log(producto)
      res.redirect('/');
    })
  })
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM productos WHERE id = ?", [id], (err1, rows1) => {
      conn.query("SELECT * FROM categorias", (err2, rows2) => {
        res.render('productos_edit', {
          data: rows1[0],
          categorias: rows2
        })
      });
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newproducto = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE productos set ? where id = ?', [newproducto, id], (err, rows) => {
    res.redirect('/');
  });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM productos WHERE id = ?', [id], (err, rows) => {
      res.redirect('/');
    });
  });
}

module.exports = controller;
