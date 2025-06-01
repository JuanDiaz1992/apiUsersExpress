const express = require("express");
const router = express.Router();
const {
  getProductos,
  createProducto,
  getProducto,
  updateProducto,
  deleteProducto,
  getProductosPorCategoria,
} = require("../models/productos");


router.get("/productos", async (req, res) => {
  try {
    const productos = await getProductos();
    res.json({
      success: true,
      data: productos,
      message: "Productos obtenidos correctamente",
      count: productos.length,
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
      details: error.message,
    });
  }
});


router.get("/productos/:id", async (req, res) => {
  try {
    const productoId = req.params.id;
    if (!productoId || isNaN(productoId)) {
      return res.status(400).json({
        success: false,
        error: "ID de producto inválido",
      });
    }
    const producto = await getProducto(parseInt(productoId));
    if (!producto || producto.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Producto no encontrado",
      });
    }
    res.json({
      success: true,
      data: producto[0],
      message: "Producto obtenido correctamente",
    });
  } catch (error) {
    console.error(`Error al obtener producto ID ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
      details: error.message,
    });
  }
});


router.get("/productos/categoria/:id_categoria", async (req, res) => {
  try {
    const idCategoria = req.params.id_categoria;
    if (!idCategoria || isNaN(idCategoria)) {
      return res.status(400).json({
        success: false,
        error: "ID de categoría inválido",
      });
    }
    const productos =
      await getProductosPorCategoria(
        parseInt(idCategoria)
      );
    res.json({
      success: true,
      data: productos,
      message: "Productos de la categoría obtenidos correctamente",
      count: productos.length,
    });
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
      details: error.message,
    });
  }
});


router.post("/productos", async (req, res) => {
  try {
    const { nombre, descripcion, precio, id_categoria } = req.body;
    if (!nombre || !precio || !id_categoria) {
      return res.status(400).json({
        success: false,
        error: "Nombre, precio e id_categoria son requeridos",
      });
    }
    const nuevoProducto = await createProducto({
      nombre,
      descripcion,
      precio,
      id_categoria,
    });
    res.status(201).json({
      success: true,
      data: nuevoProducto,
      message: "Producto creado exitosamente",
    });
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(400).json({
      success: false,
      error: error.message,
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});


router.put("/productos/:id", async (req, res) => {
  try {
    const productoId = req.params.id;
    const updateData = req.body;

    if (!productoId || isNaN(productoId)) {
      return res.status(400).json({
        success: false,
        error: "ID de producto inválido",
      });
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        error:
          "Debe proporcionar al menos un campo para actualizar (nombre, descripcion, precio o id_categoria)",
      });
    }

    updateData.id_producto = parseInt(productoId);

    const updatedProducto = await updateProducto(updateData);

    res.json({
      success: true,
      data: updatedProducto,
      message: "Producto actualizado correctamente",
    });
  } catch (error) {
    console.error(`Error al actualizar producto ID ${req.params.id}:`, error);

    const statusCode = error.message.includes("no encontrado") ? 404 : 500;

    res.status(statusCode).json({
      success: false,
      error: error.message,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
});


router.delete("/productos/:id", async (req, res) => {
  try {
    const productoId = req.params.id;

    if (!productoId || isNaN(productoId)) {
      return res.status(400).json({
        success: false,
        error: "ID de producto inválido",
      });
    }

    const deletionSuccess = await deleteProducto(parseInt(productoId));

    if (deletionSuccess) {
      return res.json({
        success: true,
        message: "Producto eliminado correctamente.",
      });
    }
  } catch (error) {
    console.error(`Error al eliminar producto ID ${req.params.id}:`, error);

    if (error.message.includes("no encontrado")) {
      return res.status(404).json({
        success: false,
        error: "No se pudo eliminar el producto. El ID no existe.",
      });
    }

    res.status(500).json({
      success: false,
      error: "Error interno al eliminar producto",
    });
  }
});

module.exports = router;
