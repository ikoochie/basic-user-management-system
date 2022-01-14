import React, { useState, useEffect } from "react";
import { Button, Table, Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

function User() {
  const [users, setUsers] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("username") === null) {
      alert("Please login first to access this page");
      navigate("/");
    } else {
      axios.get("http://localhost:3001/users").then((response) => {
        // console.log(response);
        setUsers(response.data);
      });
    }
  }, [navigate]);

  function handleEditUser(key) {
    navigate(`/edit-user/${key}`);
  }

  function handleDeleteUser(key) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .post(`http://localhost:3001/users/delete/${key}`)
        .then((response) => {
          if (response.data?.error) {
            alert(response.data.error);
          } else {
            alert(response.data.message);
          }
        });
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("username");
    navigate("/");
  }

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
                <h3>Users</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Address</th>
                      <th>Postal Code</th>
                      <th>Contact Number</th>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Password</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((value, i) => (
                      <tr key={i}>
                        <td>{value.id}</td>
                        <td>{value.firstName}</td>
                        <td>{value.lastName}</td>
                        <td>{value.address}</td>
                        <td>{value.postCode}</td>
                        <td>{value.contactNumber}</td>
                        <td>{value.email}</td>
                        <td>{value.username}</td>
                        <td>{value.password}</td>
                        <td>
                          <div className="d-grid gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleEditUser(value.id)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDeleteUser(value.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={2}>
            <Card>
              <Card.Body>
                <h3>Controls</h3>
                <div className="d-grid gap-2">
                  <Button as={NavLink} to="/add-user">
                    Add
                  </Button>
                  <Button variant="danger" onClick={() => handleLogout()}>
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

export default User;
