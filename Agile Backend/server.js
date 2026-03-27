const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // ✅ Import CORS
const connectDB = require('./config/db');
const siteVisitRoutes = require('./routes/siteVisits');
const adminDashboardRoutes = require('./models/adminDashboard.model');
const asyncHandler = require('express-async-handler');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
// Or for specific origin only:
// app.use(cors({ origin: 'http://localhost:3000' }));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// ✅ Routes
const adminRoutes = require("./routes/adminDashboard.router");
app.use("/api/admin", adminRoutes);

app.use('/api/sitevisits', siteVisitRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
