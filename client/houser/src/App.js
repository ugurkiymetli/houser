import "./App.css";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import User from "./components/User/User";
import Payments from "./components/Payment/Payment";
import Apartment from "./components/Apartment/Apartment";
import ApartmentDetail from "./components/Apartment/ApartmentDetail";
import Profile from "./components/Profile/Profile";
import UserDetail from "./components/User/UserDetail";
function App() {
  const [user, setUser] = useState({
    id: 3,
    apartmentId: 1009,
    name: "John Doe",
    isAdmin: true,
    isLoggedIn: true,
    email: "user@mail.com",
    password: "admin123",
  });
  // console.log(user);
  return (
    <>
      <Navbar user={user} />
      <Routes>
        {/* <Route path="login"element={<Login user={user} setUser={setUser} />}/> */}
        {/* <Route path="register" element={<Register />} /> */}
        <Route path="profile" element={<Profile user={user} />} />
        <Route path="apartments" element={<Apartment user={user} />} />
        <Route
          path="apartments/:apartmentId"
          element={<ApartmentDetail user={user} />}
        />
        <Route path="users" element={<User user={user} />} />
        <Route path="users/:userId" element={<UserDetail user={user} />} />
        <Route path="payments" element={<Payments user={user} />} />
        {/* <Route path="messages" element={<Message />} /> */}
      </Routes>
    </>
  );
}

export default App;
