import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    login(emailRef.current.value, passwordRef.current.value);
  }

  function login(email, password) {
    setLoading(true);
    console.log(email);
    console.log(password);

    axios
      .post("http://localhost:3001/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (!response.data?.error) {
          if (response.data.accountType === "admin") {
            sessionStorage.setItem("accessToken", response.data.accessToken);
            sessionStorage.setItem(
              "username",
              response.data?.username || "N/A"
            );
            setLoading(false);
            navigate("/user");
          } else {
            alert("You are not authorized to access this feature");
            setLoading(false);
          }
        } else {
          alert(response.data.error);
          setLoading(false);
        }
      });

    setLoading(false);
  }

  useEffect(() => {
    if (sessionStorage.getItem("username") !== null) {
      alert("You are still logged in");
      navigate("/user");
    }
  }, [navigate]);

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <Card style={{ width: "20rem" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2" id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group className="mb-4" id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
