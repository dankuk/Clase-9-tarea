const express = require("express");
const router = express.Router();
const producto = require("../productos");
const fs = require("fs");

router.post("/guardar", (req, res) => {
  const body = req.body;
  console.log(body);
  if (!body.title || !body.price || !body.thumbnail) {
    res.status = 400;
    return res.json({
      msg: "Falta el nombre, el precio o la url de imagen",
    });
  }
  producto.guardar(body.title,body.price,body.thumbnail);
  res.redirect("/api/productos/vista");
});

router.put("/modificar/:id", (req, res) => {
  console.log(req.params);
  const idBuscado = Number(req.params.id);
  const body = req.body;

  const posicion = productos.map((aProduct) => aProduct.id).indexOf(idBuscado);
  console.log(posicion);
  if (posicion == -1) {
    res.status = 404;
    return res.json({
      msg: "Producto no encontrado",
    });
  }

  if (!body.nombre || !body.precio) {
    res.status = 400;
    return res.json({
      msg: "Falta el nombre o el precio",
    });
  }

  productos[posicion].nombre = body.nombre;
  productos[posicion].precio = body.precio;
  res.status = 201;
  res.json({
    data: productos[posicion],
  });
});

router.get("/listar/:id", (req, res) => {
  console.log(req.params.id);
  const idBuscado = Number(req.params.id);

  const findProducto = productos.filter(
    (aProduct) => aProduct.id === idBuscado
  );
  console.log(findProducto.length);
  if (findProducto.length > 0) {
    res.json({
      data: findProducto,
    });
  } else {
    res.json({
      data: "Producto no encontrado",
    });
  }
});

router.get("/listar", async(req, res) => {
   let data = await producto.leer();
  if (data.length > 0) {
    res.json({
      data: data,
    });
  } else {
    res.json({
      error: "No hay productos cargados",
    });
  }
});

router.get("/vista", async(req, res) => {
  let data = await producto.leer();
  let datos = {};
  if(data!=undefined){
    datos = {
      existe : true,
      data: data
    };
    console.log(datos);
    res.render('main', datos);
  }else{
    datos = {
      noexiste : true,
    };
    console.log(datos);
    res.render('main', datos);
  }
});

router.get("/formulario", async(req, res) => {
  res.render('form');
});

module.exports=router;