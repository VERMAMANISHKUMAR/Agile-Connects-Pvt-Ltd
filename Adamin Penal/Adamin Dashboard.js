// FRONTEND: React + Bootstrap Admin Dashboard + Form
// Install: npm install react-bootstrap bootstrap axios

import React, { useState } from "react";
import { Navbar, Container, Nav, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [formData, setFormData] = useState({
    clientName: "",
    storeCode: "",
    address: "",
    city: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/data", formData);
      alert("Data Added Successfully");
      setFormData({ clientName: "", storeCode: "", address: "", city: "" });
    } catch (error) {
      console.error(error);
      alert("Error saving data");
    }
  };

  return (
    <>
      {/* HEADER */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">MyLogo</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#login">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* FORM PAGE */}
      <Container className="mt-5">
        <h3 className="mb-4">Add Data</h3>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Client Name</Form.Label>
                <Form.Control
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Store Code</Form.Label>
                <Form.Control
                  type="text"
                  name="storeCode"
                  value={formData.storeCode}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Locality Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>City Name</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">Submit</Button>
        </Form>
      </Container>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center p-3 mt-5">
        © 2026 Admin Dashboard
      </footer>
    </>
  );
}

export default App;


// BACKEND: Node.js + Express + MongoDB
// Install: npm install express mongoose cors body-parser

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/adminDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema
const DataSchema = new mongoose.Schema({
  clientName: String,
  storeCode: String,
  address: String,
  city: String,
});

const Data = mongoose.model("Data", DataSchema);

// API Route
app.post("/api/data", async (req, res) => {
  try {
    const newData = new Data(req.body);
    await newData.save();
    res.status(200).send("Data saved");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
