const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/database");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "El email y la contraseña son requeridos" });
  }

  try {
    const query = "SELECT id, password, role FROM users WHERE email = ?";
    db.query(query, [email], async (err, results) => {
      if (err) return res.status(500).json({ error: "Error en el servidor" });

      if (results.length === 0) {
        return res
          .status(401)
          .json({ error: "El mail y/o contraseña ingresados son incorrectos" });
      }

      const user = results[0];

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ error: "El mail y/o contraseña ingresados son incorrectos" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({ message: "Login exitoso", token });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;
