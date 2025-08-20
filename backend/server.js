// server.js
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import connectDB from "./src/config/db.js";

// Import routes
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import formationRoutes from "./src/routes/formationRoutes.js";
import teamRoutes from "./src/routes/teamRoutes.js";
import testimonialRoutes from "./src/routes/testimonialRoutes.js";
import newsRoutes from "./src/routes/newsRoutes.js";
import faqRoutes from "./src/routes/faqRoutes.js";

dotenv.config();
const app = express();

// ✅ Middlewares globaux (sécurité + parsing JSON)
app.use(express.json());
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));

// ✅ Limite de requêtes (sécurité)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requêtes par IP
  message: "Trop de requêtes, réessayez plus tard.",
});
app.use(limiter);

// ✅ Connexion DB
connectDB();

// ✅ Routes principales
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/formations", formationRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/faq", faqRoutes);

// ✅ Route test
app.get("/", (req, res) => {
  res.send("🚀 API Simplon Guinée fonctionne !");
});

// ✅ Gestion erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: "Route non trouvée" });
});

// ✅ Lancement serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Serveur backend lancé sur le port ${PORT}`);
});
