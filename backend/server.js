const express = require("express");
const app = express();

app.use(express.json()); // important

// Import auth routes
const authRoutes = require("./modules/auth/auth.routes");

// Use auth routes
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});