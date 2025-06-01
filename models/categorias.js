const pool = require("../bd/bd");

async function getCategorias() {
  try {
    const [rows] = await pool.query("SELECT * FROM categorias");
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener las categorías");
  }
}

async function createCategoria(categoriaData) {
  if (!categoriaData.nombre) {
    throw new Error("El nombre de la categoría es requerido");
  }

  const [result] = await pool.query(
    "INSERT INTO categorias (nombre) VALUES (?)",
    [categoriaData.nombre]
  );

  return { id: result.insertId, ...categoriaData };
}

async function getCategoria(id) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM categorias WHERE id_categoria = ?",
      [id]
    );
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener la categoría");
  }
}

async function updateCategoria(categoriaData) {
  if (!categoriaData.id_categoria) {
    throw new Error("Se requiere el ID de la categoría para actualizar");
  }

  if (!categoriaData.nombre) {
    throw new Error("Se requiere al menos un campo para actualizar (nombre)");
  }

  const [result] = await pool.query(
    "UPDATE categorias SET nombre = ? WHERE id_categoria = ?",
    [categoriaData.nombre, categoriaData.id_categoria]
  );

  if (result.affectedRows === 0) {
    throw new Error("Categoría no encontrada o ningún campo fue modificado");
  }

  return {
    id: categoriaData.id_categoria,
    ...categoriaData,
    message: "Categoría actualizada correctamente",
  };
}

async function deleteCategoria(id) {
  try {
    const [result] = await pool.query(
      "DELETE FROM categorias WHERE id_categoria = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      throw new Error("Categoría no encontrada");
    }
    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Error al eliminar la categoría");
  }
}

module.exports = {
  getCategorias,
  createCategoria,
  getCategoria,
  updateCategoria,
  deleteCategoria,
};