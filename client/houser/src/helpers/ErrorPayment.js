import React from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
function ErrorPayment({ error }) {
  return (
    <Flex justifyContent="center" alignItems="center" mt={5}>
      <Alert
        status={error === "alreayPaid" ? "info" : "error"}
        variant="solid"
        bgColor={"red.500"}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
        width="65%"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle textColor={"ghostwhite"} mt={4} mb={1} fontSize="2xl">
          {error === "alreayPaid"
            ? "Its already paid!"
            : "You cannot make other people's payments!"}
        </AlertTitle>
      </Alert>
    </Flex>
  );
}

export default ErrorPayment;
