import { Routes, Route, Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Profile from "./Profile/Profile";
import Apartment from "./Apartment/Apartment";
import ApartmentDetail from "./Apartment/ApartmentDetail";
import User from "./User/User";
import UserDetail from "./User/UserDetail";
import Payments from "./Payment/Payment";
import Message from "./Message/Message";
import MessageItem from "../components/Message/MessageItem";

function AuthenticatedApp() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="apartments" element={<Apartment />} />
        <Route path="apartments/:apartmentId" element={<ApartmentDetail />} />
        <Route path="users" element={<User />} />
        <Route path="users/:userId" element={<UserDetail />} />
        <Route path="payments" element={<Payments />} />
        <Route path="messages" element={<Message />} />
        <Route path="messages/:senderId" element={<MessageItem />} />
      </Routes>
    </>
  );
}

export default AuthenticatedApp;