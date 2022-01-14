import React from "react";
import { Box, Text } from "@chakra-ui/react";
import moment from "moment";
function PaymentInfo({ payment }) {
  return (
    <Box mb={5} textAlign={"center"}>
      <Text mt={5} fontSize={"4xl"}>
        Payment ID: <Text as="strong">{payment && payment.id}</Text>
      </Text>
      <br />
      <Text fontSize={"2xl"}>
        Type: <Text as="strong">{payment && payment.type}</Text> - Amount :{" "}
        <Text as="strong">{payment && payment.amount} ₺</Text>
      </Text>
      <Text fontSize={"xl"}>
        Due Date:{" "}
        <Text as="u">
          {payment && moment(payment.paymentDueDate).format("DD.MM.YYYY")}
        </Text>
      </Text>
    </Box>
  );
}

export default PaymentInfo;
