const express = require("express");
const router = express.Router();
const {
  getCategorias,
  createCategoria,
  getCategoria,
  updateCategoria,
  deleteCategoria,
} = require("../models/categorias");


router.get("/categorias", async (req, res) => {
  try {
    const categorias = await getCategorias();
    res.json({
      success: true,
      data: categorias,
      message: "Categorías obtenidas correctamente",
      count: categorias.length,
    });
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
      details: error.message,
    });
  }
});


router.post("/categorias", async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({
        success: false,
        error: "El nombre de la categoría es requerido",
      });
    }
    const nuevaCategoria = await createCategoria({ nombre });
    res.status(201).json({
      success: true,
      data: nuevaCategoria,
      message: "Categoría creada exitosamente",
    });
  } catch (error) {
    console.error("Error al crear categoría:", error);
    res.status(400).json({
      success: false,
      error: error.message,
      details: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});


router.get("/categorias/:id", async (req, res) => {
  try {
    const categoriaId = req.params.id;
    if (!categoriaId || isNaN(categoriaId)) {
      return res.status(400).json({
        success: false,
        error: "ID de categoría inválido",
      });
    }
    const categoria = await getCategoria(parseInt(categoriaId));
    if (!categoria || categoria.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Categoría no encontrada",
      });
    }
    res.json({
      success: true,
      data: categoria[0],
      message: "Categoría obtenida correctamente",
    });
  } catch (error) {
    console.error(`Error al obtener categoría ID ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
      details: error.message,
    });
  }
});


router.put("/categorias/:id", async (req, res) => {
  try {
    const categoriaId = req.params.id;
    const updateData = req.body;

    if (!categoriaId || isNaN(categoriaId)) {
      return res.status(400).json({
        success: false,
        error: "ID de categoría inválido",
      });
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        error: "Debe proporcionar al menos un campo para actualizar (nombre o descripcion)",
      });
    }

    updateData.id_categoria = parseInt(categoriaId);

    const updatedCategoria = await updateCategoria(updateData);

    res.json({
      success: true,
      data: updatedCategoria,
      message: "Categoría actualizada correctamente",
    });
  } catch (error) {
    console.error(`Error al actualizar categoría ID ${req.params.id}:`, error);

    const statusCode = error.message.includes("no encontrada") ? 404 : 500;

    res.status(statusCode).json({
      success: false,
      error: error.message,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
});


router.delete("/categorias/:id", async (req, res) => {
  try {
    const categoriaId = req.params.id;

    if (!categoriaId || isNaN(categoriaId)) {
      return res.status(400).json({
        success: false,
        error: "ID de categoría inválido",
      });
    }

    const deletionSuccess = await deleteCategoria(parseInt(categoriaId));

    if (deletionSuccess) {
      return res.json({
        success: true,
        message: "Categoría eliminada correctamente.",
      });
    }
  } catch (error) {
    console.error(`Error al eliminar categoría ID ${req.params.id}:`, error);

    if (error.message.includes("no encontrada")) {
      return res.status(404).json({
        success: false,
        error: "No se pudo eliminar la categoría. El ID no existe.",
      });
    }

    res.status(500).json({
      success: false,
      error: "Error interno al eliminar categoría",
    });
  }
});

module.exports = router;