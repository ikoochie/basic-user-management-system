import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

function AddUser() {
  const formRef = useRef();
  const fNameRef = useRef();
  const lNameRef = useRef();
  const addressRef = useRef();
  const postCodeRef = useRef();
  const contactNumberRef = useRef();
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setLoading(false);
    } else {
      const formData = {
        firstName: fNameRef.current.value,
        lastName: lNameRef.current.value,
        address: addressRef.current.value,
        postCode: postCodeRef.current.value,
        contactNumber: contactNumberRef.current.value,
        email: emailRef.current.value,
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        accountType: "user",
      };

      handleAddUser(formData);
    }

    setValidated(true);
  }

  function handleAddUser(data) {
    axios
      .post("http://localhost:3001/users", data, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data?.error) {
          if (sessionStorage.getItem("accessToken") === null) {
            alert("Please login first to create a user");
          } else {
            alert(response.data.error);
          }

          setLoading(false);
        } else {
          handleResetForm();
          alert("User successfully added!");
        }
      });

    console.log(data);
  }

  function handleResetForm() {
    formRef.current.reset();
    setLoading(false);
    setValidated(false);
  }

  useEffect(() => {
    if (sessionStorage.getItem("username") === null) {
      alert("Please login first to access this page");
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Container
        style={{
          minHeight: "100vh",
          paddingTop: "10vh",
          paddingBottom: "10vh",
        }}
      >
        <Row>
          <Col sm={10}>
            <Card>
              <Card.Body>
                <h2 className="text-center mb-4">Add User</h2>
                <Form
                  ref={formRef}
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  <Form.Group className="mb-2" id="email">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" ref={fNameRef} required />
                    <Form.Control.Feedback type="invalid">
                      Please provide your first name.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4" id="password">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" ref={lNameRef} required />
                    <Form.Control.Feedback type="invalid">
                      Please provide your last name.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4" id="password">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" ref={addressRef} required />
                    <Form.Control.Feedback type="invalid">
                      Please provide an address.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4" id="password">
                    <Form.Label>Postal code</Form.Label>
                    <Form.Control type="number" ref={postCodeRef} required />
                    <Form.Control.Feedback type="invalid">
                      Please provide a postal code.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4" id="password">
                    <Form.Label>Contact number</Form.Label>
                    <Form.Control type="text" ref={contactNumberRef} required />
                    <Form.Control.Feedback type="invalid">
                      Please provide your contact number.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4" id="password">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                    <Form.Control.Feedback type="invalid">
                      Please provide an email.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4" id="password">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" ref={usernameRef} required />
                    <Form.Control.Feedback type="invalid">
                      Please provide a username.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4" id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                    <Form.Control.Feedback type="invalid">
                      Please provide a password.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button disabled={loading} className="w-100" type="submit">
                    Add
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={2}>
            <Card>
              <Card.Body>
                <h3>Controls</h3>
                <div className="d-grid gap-2">
                  <Button as={NavLink} disabled={loading} to="/user">
                    Cancel
                  </Button>
                  <Button disabled={loading} variant="danger">
                    Logout
                  </Button>
                </div>
                <hr />
                <p>Admin: {sessionStorage.getItem("username") || "N/A"}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddUser;
