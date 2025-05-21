const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../users/users");

router.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.json({
      success: true,
      data: users,
      message: "Usuarios obtenidos correctamente",
      count: users.length,
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
      details: error.message,
    });
  }
});

router.post("/users", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        error: "Cuerpo de la solicitud vacío",
      });
    }

    const newUser = await createUser(req.body);

    res.status(201).json({
      success: true,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        age: newUser.age,
      },
      message: "Usuario creado exitosamente",
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);

    res.status(400).json({
      success: false,
      error: error.message.includes("requeridos")
        ? error.message
        : "Error al crear usuario",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

router.get("/users/:id", async (req, res) => {
  // Ejemplo: http://localhost:3000/api/users/3
  try {
    const userId = req.params.id;
    if (!userId || isNaN(userId)) {
      return res.status(400).json({
        success: false,
        error: "ID de usuario inválido",
      });
    }

    const user = await getUser(parseInt(userId));
    if (!user || user.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Usuario no encontrado",
      });
    }

    res.json({
      success: true,
      data: user[0],
      message: "Usuario obtenido correctamente",
    });
  } catch (error) {
    console.error(`Error al obtener usuario ID ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
      details: error.message,
    });
  }
});

router.put("/users/:id", async (req, res) => {
  // Para usarlo se envía un body a la url con el id del usuario http://localhost:3000/api/users/15
  try {
    const userId = req.params.id;
    const updateData = req.body;

    if (!userId || isNaN(userId)) {
      return res.status(400).json({
        success: false,
        error: "ID de usuario inválido",
      });
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        error:
          "Debe proporcionar al menos un campo para actualizar (name, mail o age)",
      });
    }

    updateData.id_user = parseInt(userId);

    const updatedUser = await updateUser(updateData);

    res.json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error(`Error al actualizar usuario ID ${req.params.id}:`, error);

    const statusCode = error.message.includes("no encontrado") ? 404 : 500;

    res.status(statusCode).json({
      success: false,
      error: error.message,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId || isNaN(userId)) {
      return res.status(400).json({
        success: false,
        error: "ID de usuario inválido",
      });
    }

    const deletionSuccess = await deleteUser(parseInt(userId));

    if (deletionSuccess) {
      return res.json({
        success: true,
        message: "Usuario eliminado correctamente.",
      });
    }
  } catch (error) {
    console.error(`Error al eliminar usuario ID ${req.params.id}:`, error);

    if (error.message.includes("no encontrado")) {
      return res.status(404).json({
        success: false,
        error: "No se pudo eliminar el usuario. El ID no existe.",
      });
    }

    res.status(500).json({
      success: false,
      error: "Error interno al eliminar usuario",
    });
  }
});

module.exports = router;
