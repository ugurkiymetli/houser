import React from "react";
import { fetchPayments } from "../api";
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
function Payments({ user = user }) {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(
    ["payments", user.id],
    () => fetchPayments(user.id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error {error.message}</div>;
  }
  if (!data.isSuccess) console.log(data.exceptionMessage);

  //   console.log({ user });
  return (
    <Box mb={2} p={6}>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Heading>Payments</Heading>
        {user.isAdmin && (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={1}
          >
            <Button direction={"row"} variant="outline" colorScheme="blue">
              Add Payment
            </Button>
          </Stack>
        )}
      </Flex>
      {/* CHAKRA TABLE */}

      <Table mt={5} variant="simple">
        {!data.isSuccess && (
          <TableCaption> Error - ({data.exceptionMessage})</TableCaption>
        )}
        <TableCaption> Payments - Total ({data.totalCount})</TableCaption>

        <Thead>
          <Tr>
            <Th textAlign="center">ID</Th>
            <Th textAlign="center">Amount</Th>
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
