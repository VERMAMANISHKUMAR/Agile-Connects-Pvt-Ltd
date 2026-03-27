import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Navbar, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addData } from "../api/adminApi";

function App() {
  const [formData, setFormData] = useState({
    clientName: "",
    storeCode: "",
    address: "",
    city: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addData(formData);

      toast.success("✅ Data Added Successfully!");

      setFormData({
        clientName: "",
        storeCode: "",
        address: "",
        city: ""
      });

    } catch (error) {
      toast.error("❌ Error saving data!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />

      {/* Navbar */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Admin Panel</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link>Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Form */}
      <Container className="mt-5">
        <h3>Add Data</h3>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Control
                placeholder="Client Name"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                required
                className="mb-3"
              />
            </Col>

            <Col md={6}>
              <Form.Control
                placeholder="Store Code"
                name="storeCode"
                value={formData.storeCode}
                onChange={handleChange}
                required
                className="mb-3"
              />
            </Col>
          </Row>

          <Form.Control
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mb-3"
          />

          <Form.Control
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="mb-3"
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Submit"}
          </Button>
        </Form>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-white text-center p-3 mt-5">
        © 2026 Admin Dashboard
      </footer>
    </>
  );
}

export default App;