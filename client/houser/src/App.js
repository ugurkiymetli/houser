import "./App.css";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Payments from "./components/Payments";
import User from "./components/User";
function App() {
  const [user, setUser] = useState({
    id: 3,
    name: "John Doe",
    isAdmin: true,
    isLoggedIn: true,
  });
  // console.log(user);
  return (
    <>
      <Navbar user={user} />
      <Routes>
        {/* <Route path="register" element={<Register />} /> */}
        {/* <Route path="login" element={<Login />} /> */}
        {/* <Route path="apartments" element={<Apartment />} /> */}
        <Route path="users" element={<User user={user} />} />
        <Route path="payments" element={<Payments user={user} />} />
        {/* <Route path="messages" element={<Message />} /> */}
      </Routes>
    </>
  );
}

export default App;
