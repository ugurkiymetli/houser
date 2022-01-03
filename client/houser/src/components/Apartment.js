import React, { useState } from "react";

import { fetchApartments, deleteApartment } from "../api";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
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
import { EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";

function Apartment({ user = user }) {
  const [params, setParams] = useState({ pageSize: 100, pageNumber: 1 });
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(
    ["apartments", params.pageSize, params.pageNumber],
    () => fetchApartments(params.pageSize, params.pageNumber)
  );

  const deleteMutation = useMutation(deleteApartment, {
    onSuccess: () => queryClient.invalidateQueries("users"),
  });
  if (!user.isAdmin) return <Heading>User is not admin!</Heading>;
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error {error.message}</div>;
  }
  if (!data.isSuccess) console.log(data.exceptionMessage);

  return (
    <Box mb={2} p={6}>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Heading>Apartments</Heading>
        {user.isAdmin && (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={1}
          >
            <Button direction={"row"} colorScheme="green">
              Add Apartment
            </Button>
          </Stack>
        )}
      </Flex>
      {/* CHAKRA TABLE */}

      <Table mt={5} variant="simple">
        {!data.isSuccess && (
          <TableCaption> Error - ({data.exceptionMessage})</TableCaption>
        )}
        <TableCaption> Users - Total ({data.totalCount})</TableCaption>
        <Thead>
          <Tr>
            <Th textAlign="center">Detail</Th>
            <Th textAlign="center">ID</Th>
            <Th textAlign="center">Resident Id</Th>
            <Th textAlign="center">Block</Th>
            <Th textAlign="center">Floor</Th>
            <Th textAlign="center">Number</Th>
            <Th textAlign="center">Type</Th>
            <Th textAlign="center">Occupation</Th>
            <Th textAlign="center">Edit</Th>
            <Th textAlign="center">Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.isSuccess &&
            data.list.map((item) => (
              <Tr key={item.id}>
                <Th textAlign="center">
                  <Link to={`apartment/${item.id}`}>
                    <Button variant={"link"}>
                      <ViewIcon mr={2} />
                    </Button>
                  </Link>
                </Th>
                <Th textAlign="center">{item.id}</Th>
                <Th textAlign="center">
                  {item.residentId == null ? "-" : item.residentId}
                </Th>
                <Th textAlign="center">{item.block}</Th>
                <Th textAlign="center">{item.floor}</Th>
                <Th textAlign="center">{item.number}</Th>
                <Th textAlign="center">{item.type}</Th>
                <Th textAlign="center">
                  {item.isEmpty ? "Empty" : "Occupied"}
                </Th>
                <Th textAlign="center">
                  <Button size={"sm"} colorScheme={"blue"}>
                    <EditIcon />
                  </Button>
                </Th>
                <Th textAlign="center">
                  <Button
                    size={"sm"}
                    colorScheme={"red"}
                    disabled={deleteMutation.isLoading ? true : false}
                    onClick={() => {
                      deleteMutation.mutate(item.id, {
                        onSuccess: (data) => {
                          //   console.log(data);
                          !data.isSuccess
                            ? alert(data.exceptionMessage)
                            : console.log(
                                `Apartment with id:${item.id} deleted!`
                              );
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

export default Apartment;
