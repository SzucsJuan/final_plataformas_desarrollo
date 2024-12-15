const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "El email y la contraseña son requeridos" });
  }

  try {
    const query = "SELECT id, password, role FROM users WHERE email = ?";
    db.query(query, [email], async (err, results) => {
      if (err) return res.status(500).json({ error: "Error en el servidor" });

      if (results.length === 0) {
        return res.status(401).json({
          error: "El email y/o contraseña ingresados son incorrectos",
        });
      }

      const user = results[0];

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          error: "El email y/o contraseña ingresados son incorrectos",
        });
      }

      if (user.role === "admin") {
        const token = jwt.sign(
          { id: user.id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        return res
          .status(200)
          .json({
            message: "Logueo exitoso",
            user: { id: user.id, role: user.role },
            token,
          });
      } else if (user.role === "user") {
        return res
          .status(200)
          .json({
            message: "Logueo exitoso",
            user: { id: user.id, role: user.role },
          });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = { loginUser };
