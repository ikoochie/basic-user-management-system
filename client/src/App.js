import Login from "./pages/Login";
import User from "./pages/User";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default App;
