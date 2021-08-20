const fs = require("fs");
const path = require("path");
const ruta = "./producto/productos.txt";

class archivo {
  constructor(id, title, price, thumbnail) {
    (this.id = id),
      (this.title = title),
      (this.price = price),
      (this.thumbnail = thumbnail);
  }
}

const guardar = async (title, price, thumbnail) => {
    try {
      let arreglo = [];
      let id = 1;
      const data = await fs.promises.readFile(ruta, "utf-8");
      if (data) {
        const jData = JSON.parse(data);
        id = jData.length + 1;
        arreglo.push(...jData);
      }
      const nuevo = new archivo(id, title, price, thumbnail);
      arreglo.push(nuevo);
      console.log("añadido correctamente");
      await fs.promises.writeFile(ruta, JSON.stringify(arreglo, null, "\t"));
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  };
  
  const leer = async () => {
    const data = await fs.promises.readFile(ruta, "utf-8");
    if (data) {
      const jData = JSON.parse(data);
      return jData;
    }
    console.log("prooducto: " + data);
    return;
  };
  
  const borrar = async () => {
    await fs.promises.unlink(ruta);
    console.log("borrado");
  };

  module.exports={
    borrar,
    leer,
    guardar
  }