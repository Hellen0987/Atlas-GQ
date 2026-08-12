import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import productRoutes from "./routes/product";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Basic health
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).json({ message: "Erro interno" });
});

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
