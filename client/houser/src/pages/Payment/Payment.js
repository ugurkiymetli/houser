import React from "react";
import { fetchPayments } from "../../api";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  Button,
  Box,
  Flex,
  Stack,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  TableCaption,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import moment from "moment";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";
function Payments() {
  const { user, isAdmin } = useAuth();
  console.log("payments", user.id);
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(
    ["payments", user.id],
    () => fetchPayments(user.id)
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <div>Error {error.message}</div>;
  }
  if (!data.isSuccess) console.log(data.exceptionMessage);

  return (
    <Box mb={2} p={6}>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Heading>Payments</Heading>
        {isAdmin && (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={1}
          >
            <Button direction={"row"} colorScheme="green">
              Add Payment
            </Button>
          </Stack>
        )}
      </Flex>
      {/* CHAKRA TABLE */}

      <Table variant="striped" colorScheme="gray" mt={5}>
        {!data.isSuccess && (
          <TableCaption> Error - ({data.exceptionMessage})</TableCaption>
        )}
        <TableCaption> Payments - Total ({data.totalCount})</TableCaption>

        <Thead>
          <Tr>
            <Th textAlign="center">ID</Th>
            <Th isNumeric textAlign="center">
              Amount
            </Th>
            <Th textAlign="center">Type</Th>
            <Th textAlign="center">Payed</Th>
            <Th textAlign="center">Payer</Th>
            <Th textAlign="center">Due Date</Th>
            <Th textAlign="center">Payment Date</Th>
            <Th textAlign="center">Insert Date</Th>
            <Th textAlign="center">Pay</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.isSuccess &&
            data.list.map((item) => (
              <Tr key={item.id}>
                <Th textAlign="center">{item.id}</Th>
                <Th textAlign="center">{item.amount} ₺</Th>
                <Th textAlign="center">{item.type}</Th>
                <Th textAlign="center">
                  {item.isPayed ? "Payed" : "Not Payed"}
                </Th>
                <Th textAlign="center">{item.payerId}</Th>
                <Th textAlign="center">
                  {moment(item.paymentDueDate).format("D:M:YYYY, h:m:s")}
                </Th>
                <Th textAlign="center">
                  {item.paymentDate == null
                    ? "-"
                    : moment(item.paymentDate).format("D:M:YYYY, h:m:s")}
                </Th>
                <Th textAlign="center">
                  {moment(item.idatetime).format("D:M:YYYY, h:m:s")}
                </Th>
                <Th>
                  <Button colorScheme="green">Pay</Button>
                </Th>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Payments;
