import React from "react";
import { Box, Heading } from "@chakra-ui/react";
function Profile({ user: user }) {
  return (
    <>
      <Heading textAlign="center">Profile</Heading>
      <Heading fontSize="2xl" textAlign="center">
        Id: {user.id}
      </Heading>
      <Heading fontSize="2xl" textAlign="center">
        Apartmetnt Id: {user.apartmentId}{" "}
      </Heading>
      <Heading fontSize="2xl" textAlign="center">
        Role: {user.isAdmin ? "Admin" : "User"}
      </Heading>
      <Heading fontSize="2xl" textAlign="center">
        Email: {user.email}
      </Heading>
    </>
  );
}

export default Profile;
