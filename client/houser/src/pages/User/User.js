import React, { useState } from "react";
import { deleteUser, fetchUsers } from "../../api";
import { useNavigate } from "react-router-dom";
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
  // Link,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";
function User() {
  const { user, isAdmin } = useAuth();

  let navigate = useNavigate();
  const [params, setParams] = useState({ pageSize: 100, pageNumber: 1 });
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(
    ["users", params.pageSize, params.pageNumber],
    () => fetchUsers(params.pageSize, params.pageNumber)
  );

  const deleteMutation = useMutation(deleteUser, {
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
        <Heading>Users</Heading>
        {isAdmin && (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={1}
          >
            <Button direction={"row"} colorScheme="green">
              Add User
            </Button>
          </Stack>
        )}
      </Flex>
      {/* CHAKRA TABLE */}

      <Table mt={5} variant="simple" colorScheme="black">
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
                  {item.apartmentId == null ? "-" : item.apartmentId}
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
                  {item.carPlateNum == null ? "-" : item.carPlateNum}
                </Th>
                <Th textAlign="center">
                  <Link to={`./${item.id}`}>
                    <Button size={"sm"} colorScheme={"blue"}>
                      <EditIcon />
                    </Button>
                  </Link>
                </Th>
                <Th textAlign="center">
                  <Button
                    size={"sm"}
                    colorScheme={"red"}
                    onClick={() => {
                      deleteMutation.mutate(item.id, {
                        onSuccess: (data) => {
                          //   console.log(data);
                          !data.isSuccess
                            ? alert(data.exceptionMessage)
                            : alert(`User with id:${item.id} deleted!`);
                        },
                      });
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </Th>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default User;
