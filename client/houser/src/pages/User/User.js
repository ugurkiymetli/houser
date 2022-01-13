import React, { useState } from "react";
import { deleteUser, fetchUsers } from "../../api";
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
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../helpers/LoadingSpinner";
import { alertError, alertSuccess } from "../../helpers/messageAlert";
function User() {
  const { isAdmin } = useAuth();
  const [params] = useState({ pageSize: 100, pageNumber: 1 });
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(
    ["users", params.pageSize, params.pageNumber],
    () => fetchUsers(params.pageSize, params.pageNumber)
  );

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => queryClient.invalidateQueries("users"),
  });
  if (!isAdmin) {
    // alert("User is not admin!");
    // window.location.href = "http://localhost:11887/payments";

    // navigate("/payments", { replace: true });
    return <Heading>User is not admin!</Heading>;
  }
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
        <Heading marginLeft={"50%"}>Users</Heading>
        {isAdmin && (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={1}
          >
            <Link to="./new">
              <Tooltip label="Add User!" closeDelay={30} placement="left">
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
        <TableCaption> Users - Total ({data.totalCount})</TableCaption>
        <Thead>
          <Tr>
            <Th textAlign="center">ID </Th>
            <Th textAlign="center">Apartment Id</Th>
            <Th textAlign="center">Name</Th>
            <Th textAlign="center">Email</Th>
            <Th textAlign="center">Phone Number</Th>
            <Th textAlign="center">Identity Number (T.C Number)</Th>
            <Th textAlign="center">Car Plate Number</Th>
            <Th textAlign="center">Edit</Th>
            <Th textAlign="center">Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.isSuccess &&
            data.list.map((item) => (
              <Tr key={item.id}>
                <Th textAlign="center">{item.id}</Th>
                <Th textAlign="center">
                  {item.apartmentId === null || item.apartmentId === 0
                    ? "-"
                    : item.apartmentId}
                </Th>
                <Th textTransform="capitalize" textAlign="center">
                  {item.name}
                </Th>
                <Th textTransform={"lowercase"} textAlign="center">
                  <a href={`mailto:${item.email}`}>{item.email}</a>
                </Th>
                <Th textAlign="center">
                  <a href={`tel:+90${item.phoneNum}`}>+90{item.phoneNum}</a>
                </Th>
                <Th textAlign="center">{item.identityNum}</Th>
                <Th textAlign="center">
                  {item.carPlateNum === null || item.carPlateNum === ""
                    ? "-"
                    : item.carPlateNum}
                </Th>
                <Th textAlign="center">
                  <Link to={`./${item.id}`}>
                    <Tooltip label="Edit user." size="sm" openDelay={50}>
                      <Button size={"sm"} colorScheme={"blue"}>
                        <FiEdit />
                      </Button>
                    </Tooltip>
                  </Link>
                </Th>
                <Th textAlign="center">
                  <Tooltip label="Delete user." size="sm" openDelay={50}>
                    <Button
                      size={"sm"}
                      colorScheme={"red"}
                      disabled={deleteUserMutation.isLoading ? true : false}
                      onClick={() => {
                        deleteUserMutation.mutate(item.id, {
                          onSuccess: (data) => {
                            //   console.log(data);
                            !data.isSuccess
                              ? alertError(data.exceptionMessage)
                              : alertSuccess(
                                  `User with id:${item.id} deleted!`
                                );
                          },
                        });
                      }}
                    >
                      <AiFillDelete />
                    </Button>
                  </Tooltip>
                </Th>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default User;
