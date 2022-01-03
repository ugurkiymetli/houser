import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* <Route path="register" element={<Register />} /> */}
        {/* <Route path="login" element={<Login />} /> */}
        {/* <Route path="apartments" element={<Apartment />} /> */}
        {/* <Route path="users" element={<User />} /> */}
        {/* <Route path="payments" element={<Payment />} /> */}
        {/* <Route path="messages" element={<Message />} /> */}
      </Routes>
    </>
  );
}

export default App;
