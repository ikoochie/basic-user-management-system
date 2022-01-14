import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { NavLink, useParams, useNavigate } from "react-router-dom";

function EditUser() {
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

  let { id } = useParams();

  function handleSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    if (sessionStorage.getItem("username") === null) {
      alert("Please login first to access this page");
      navigate("/");
    } else {
      axios
        .get(`http://localhost:3001/users/editById/${id}`)
        .then((response) => {
          const userData = response.data;

          fNameRef.current.value = userData.firstName;
          lNameRef.current.value = userData.lastName;
          addressRef.current.value = userData.address;
          postCodeRef.current.value = userData.postCode;
          contactNumberRef.current.value = userData.contactNumber;
          emailRef.current.value = userData.email;
          usernameRef.current.value = userData.username;
          passwordRef.current.value = userData.password;
        });
    }
  }, [id, navigate]);

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
                <h2 className="text-center mb-4">Edit User</h2>
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
                    Update
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

export default EditUser;
