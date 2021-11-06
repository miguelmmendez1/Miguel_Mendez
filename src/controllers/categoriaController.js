
const controllerm = {};

controllerm.listm = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM categorias', (err, categorias) => {
     if (err) {
      res.json(err);
     }
     res.render('categorias', {
      data: categorias
     });
    });
  });
};

controllerm.savem = (req, res) => {
  const { categoria, descripcion } = req.body;
  console.log("datos  ", req.body);
  req.getConnection((err, connection) => {
    const query = connection.query(`
      INSERT INTO
      categorias(categoria, descripcion)
      VALUES("${categoria}", "${descripcion}")
    `, (err, municipio) => {
        res.redirect('/categorias');
    })
  })
};

controllerm.editm = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM categorias WHERE id = ?", [id], (err, rows) => {
      res.render('categoria_edit', {
        data: rows[0]
      })
    });
  });
};

controllerm.updatem = (req, res) => {
  const { id } = req.params;
  const { categoria, descripcion } = req.body;
  console.log(req.body)
  req.getConnection((err, conn) => {

  conn.query(`
    UPDATE categorias
    set
    categoria = "${ categoria }",
    descripcion = "${ descripcion }"
    where id = ${ id }
    `, (err, rows) => {
      res.redirect('/categorias');
    });
  });
};

controllerm.deletem = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM categorias WHERE id = ?', [id], (err, rows) => {
      res.redirect('/categorias');
    });
  });
}

module.exports = controllerm;
