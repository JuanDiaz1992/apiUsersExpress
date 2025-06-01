const pool = require("../bd/bd");

async function getProductos() {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, c.nombre AS categoria_nombre
      FROM productos p
      LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
    `);
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener los productos");
  }
}

async function createProducto(productoData) {
  if (
    !productoData.nombre ||
    !productoData.precio ||
    !productoData.id_categoria
  ) {
    throw new Error("Nombre, precio e id_categoria son requeridos");
  }

  const [result] = await pool.query(
    "INSERT INTO productos (nombre, descripcion, precio, id_categoria) VALUES (?, ?, ?, ?)",
    [
      productoData.nombre,
      productoData.descripcion || null,
      productoData.precio,
      productoData.id_categoria,
    ]
  );

  return { id: result.insertId, ...productoData };
}

async function getProducto(id) {
  try {
    const [rows] = await pool.query(
      `
      SELECT p.*, c.nombre AS categoria_nombre
      FROM productos p
      LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
      WHERE p.id_producto = ?
    `,
      [id]
    );
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener el producto");
  }
}

async function getProductosPorCategoria(id_categoria) {
  try {
    const [rows] = await pool.query(
      `
      SELECT p.*, c.nombre AS categoria_nombre
      FROM productos p
      LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
      WHERE p.id_categoria = ?
    `,
      [id_categoria]
    );
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener productos por categoría");
  }
}
async function updateProducto(productoData) {
  if (!productoData.id_producto) {
    throw new Error("Se requiere el ID del producto para actualizar");
  }

  if (
    !productoData.nombre &&
    !productoData.descripcion &&
    !productoData.precio &&
    !productoData.id_categoria
  ) {
    throw new Error(
      "Se requiere al menos un campo para actualizar (nombre, descripcion, precio o id_categoria)"
    );
  }

  const updateFields = [];
  const queryParams = [];

  if (productoData.nombre) {
    updateFields.push("nombre = ?");
    queryParams.push(productoData.nombre);
  }
  if (productoData.descripcion) {
    updateFields.push("descripcion = ?");
    queryParams.push(productoData.descripcion);
  }
  if (productoData.precio) {
    updateFields.push("precio = ?");
    queryParams.push(productoData.precio);
  }
  if (productoData.id_categoria) {
    updateFields.push("id_categoria = ?");
    queryParams.push(productoData.id_categoria);
  }

  queryParams.push(productoData.id_producto);

  const query = `
    UPDATE productos
    SET ${updateFields.join(", ")}
    WHERE id_producto = ?
  `;

  const [result] = await pool.query(query, queryParams);

  if (result.affectedRows === 0) {
    throw new Error("Producto no encontrado o ningún campo fue modificado");
  }

  return {
    id: productoData.id_producto,
    ...productoData,
    message: "Producto actualizado correctamente",
  };
}

async function deleteProducto(id) {
  try {
    const [result] = await pool.query(
      "DELETE FROM productos WHERE id_producto = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      throw new Error("Producto no encontrado");
    }
    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Error al eliminar el producto");
  }
}

module.exports = {
  getProductos,
  createProducto,
  getProducto,
  updateProducto,
  deleteProducto,
  getProductosPorCategoria,
};
