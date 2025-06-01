const pool = require("../bd/bd");

async function getUsers(req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  } catch (error) {
    console.error(error);
    res.status(500).send("Error del servidor");
  }
}
async function createUser(userData) {
  if (!userData.name || !userData.mail || !userData.age) {
    throw new Error("Nombre, email y edad son requeridos");
  }

  const [result] = await pool.query(
    "INSERT INTO users (name, mail, age) VALUES (?, ?, ?)",
    [userData.name, userData.mail, userData.age || null]
  );

  return { id: result.insertId, ...userData };
}
async function getUser(id) {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id_user = ?", [id]);
    return rows;
  } catch (error) {
    console.error(error);
    res.status(500).send("Error del servidor");
  }
}
async function updateUser(userData) {
  if (!userData.id_user) {
    throw new Error("Se requiere el ID del usuario para actualizar");
  }

  if (!userData.name && !userData.mail && !userData.age) {
    throw new Error("Se requiere al menos un campo para actualizar (name, mail o age)");
  }

  const updateFields = [];
  const queryParams = [];

  if (userData.name) {
    updateFields.push("name = ?");
    queryParams.push(userData.name);
  }

  if (userData.mail) {
    updateFields.push("mail = ?");
    queryParams.push(userData.mail);
  }

  if (userData.age) {
    updateFields.push("age = ?");
    queryParams.push(userData.age);
  }

  queryParams.push(userData.id_user);

  const query = `
    UPDATE users 
    SET ${updateFields.join(", ")} 
    WHERE id_user = ?
  `;

  const [result] = await pool.query(query, queryParams);

  if (result.affectedRows === 0) {
    throw new Error("Usuario no encontrado o ningún campo fue modificado");
  }

  return {
    id: userData.id_user,
    ...userData,
    message: "Usuario actualizado correctamente"
  };
}
async function deleteUser(id) {
  try {
    const [result] = await pool.query("DELETE FROM users WHERE id_user = ?", [id]);
    if (result.affectedRows === 0) {
      throw new Error("Usuario no encontrado");
    }
    return true;
  } catch (error) {
    console.error(error);
    res.status(500).send("Error del servidor");
  }
}
module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
