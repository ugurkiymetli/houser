import React from "react";
import { deletePayment, fetchPayments, fetchPaymentsAdmin } from "../../api";
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
  Tooltip,
} from "@chakra-ui/react";

import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { MdPayment } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAuth } from "../../context/AuthContext";
import { alertError, alertSuccess } from "../../helpers/messageAlert";
import LoadingSpinner from "../../helpers/LoadingSpinner";
function Payments() {
  const { user, isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(
    ["payments", user.id],
    () => (!isAdmin ? fetchPayments(user.id) : fetchPaymentsAdmin())
  );

  const deleteMutation = useMutation(deletePayment, {
    onSuccess: () => queryClient.invalidateQueries("payments"),
  });
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
        <Heading marginLeft={"40%"}>Payments</Heading>
        {isAdmin && (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={1}
          >
            <Link to="./new">
              <Tooltip label="Add Payment!" closeDelay={30} placement="left">
                <Button size={"sm"} direction={"row"} colorScheme="green">
                  <GoPlus />
                </Button>
              </Tooltip>
            </Link>
          </Stack>
        )}
      </Flex>
      {/* CHAKRA TABLE */}

      <Table mt={5} variant="striped" colorScheme="black">
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
            {isAdmin && (
              <>
                <Th textAlign="center">Edit</Th>
                <Th textAlign="center">Delete</Th>
              </>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {data.isSuccess &&
            data.list.map((item) => (
              <Tr key={item.id}>
                <Th textAlign="center">{item.id}</Th>
                <Th textAlign="center">{item.amount} ₺</Th>
                <Th textAlign="center">{item.type}</Th>
                <Th textAlign="center">{item.isPayed ? "✓" : "x"}</Th>
                <Th textAlign="center">{item.payerId}</Th>
                <Th textAlign="center">
                  {moment(item.paymentDueDate).format("DD.MM.YYYY")}
                </Th>
                <Th textAlign="center">
                  {item.payedDate === null
                    ? "-"
                    : moment(item.payedDate).format("DD.MM.YYYY hh:mm:ss")}
                </Th>
                <Th textAlign="center">
                  {moment(item.idatetime).format("DD.MM.YYYY hh:mm:ss")}
                </Th>
                <Th>
                  {/* {!item.isPayed && item.payerId === user.id ? ( */}
                  <Link
                    to={
                      item.isPayed || item.payerId !== user.id
                        ? ""
                        : `./${item.id}/pay`
                    }
                  >
                    <Tooltip
                      label={"Pay with credit card."}
                      size="sm"
                      openDelay={50}
                    >
                      <Button
                        size={"sm"}
                        disabled={item.isPayed || item.payerId !== user.id}
                        colorScheme="green"
                      >
                        <MdPayment />
                      </Button>
                    </Tooltip>
                  </Link>
                </Th>
                {isAdmin && (
                  <>
                    <Th textAlign="center">
                      <Link to={item.isPayed ? "" : `./${item.id}`}>
                        <Tooltip label="Edit payment." size="sm" openDelay={50}>
                          <Button
                            size={"sm"}
                            colorScheme={"blue"}
                            disabled={item.isPayed}
                          >
                            <FiEdit />
                          </Button>
                        </Tooltip>
                      </Link>
                    </Th>
                    <Th textAlign="center">
                      <Tooltip label="Delete payment." size="sm" openDelay={50}>
                        <Button
                          size={"sm"}
                          colorScheme={"red"}
                          disabled={
                            deleteMutation.isLoading
                              ? true
                              : false || item.isPayed
                          }
                          onClick={() => {
                            deleteMutation.mutate(item.id, {
                              onSuccess: (data) => {
                                !data.isSuccess
                                  ? alertError(data.exceptionMessage)
                                  : alertSuccess(
                                      `Payment with id:${item.id} deleted!`
                                    );
                              },
                            });
                          }}
                        >
                          <AiFillDelete />
                        </Button>
                      </Tooltip>
                    </Th>
                  </>
                )}
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Payments;
