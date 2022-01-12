import React from "react";
import { Heading } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
function Profile() {
  const { user, isAdmin } = useAuth();
  return (
    <>
      <Heading textAlign="center">Profile</Heading>
      <Heading fontSize="2xl" textAlign="center">
        Id: {user.id}
      </Heading>
      <Heading fontSize="2xl" textAlign="center">
        Role: {isAdmin ? "Admin" : "User"}
      </Heading>
      <Heading fontSize="2xl" textAlign="center">
        Apartmetnt Id: {user.apartmentId}{" "}
      </Heading>
      <Heading fontSize="2xl" textAlign="center">
        Email: {user.email}
      </Heading>
    </>
  );
}

export default Profile;
