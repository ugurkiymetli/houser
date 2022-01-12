import React, { useState } from "react";
import { fetchApartments, deleteApartment } from "../../api";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  Spinner,
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

import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";
function Apartment() {
  const { user, isAdmin } = useAuth();
  const [params, setParams] = useState({ pageSize: 100, pageNumber: 1 });
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery(
    ["apartments", params.pageSize, params.pageNumber],
    () => fetchApartments(params.pageSize, params.pageNumber)
  );

  const deleteMutation = useMutation(deleteApartment, {
    onSuccess: () => queryClient.invalidateQueries("users"),
  });
  if (!isAdmin) return <Heading>User is not admin!</Heading>;
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return (
      <div>
        Error {error.message} - {data}
      </div>
    );
  }
  if (!data.isSuccess) console.log(data.exceptionMessage);

  return (
    <Box mb={2} p={6}>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Heading>Apartments</Heading>
        {isAdmin && (
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
                    disabled={deleteMutation.isLoading ? true : false}
                    onClick={() => {
                      deleteMutation.mutate(item.id, {
                        onSuccess: (data) => {
                          //   console.log(data);
                          !data.isSuccess
                            ? alert(data.exceptionMessage)
                            : alert(`Apartment with id:${item.id} deleted!`);
                          // console.log(
                          //     `Apartment with id:${item.id} deleted!`
                          //   );
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
