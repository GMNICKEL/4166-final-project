import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import { authenticate } from "./middleware/authenticate.js";
import { authorizeRoles } from "./middleware/authorizeRoles.js";

const swaggerDocument = YAML.load("./openapi.yaml");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", function (req, res) {
  res.json({ message: "Support Ticket API is running" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/comments", commentRoutes);

app.get("/api/protected", authenticate, function (req, res) {
  res.json({
    message: "Protected route working",
    user: req.user,
  });
});

app.get("/api/support-only", authenticate, authorizeRoles("SUPPORT"), function (req, res) {
  res.json({
    message: "Support-only route working",
    user: req.user,
  });
});

app.use(function (err, req, res, next) {
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal Server Error" });
});

app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});