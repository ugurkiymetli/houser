import React, { useState } from "react";
import { fetchApartments, deleteApartment } from "../../api";
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
import { alertSuccess, alertError } from "../../helpers/messageAlert";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { GoPlus } from "react-icons/go";

import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../helpers/LoadingSpinner";
function Apartment() {
  const { isAdmin } = useAuth();

  const [params] = useState({ pageSize: 100, pageNumber: 1 });
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery(
    ["apartments", params.pageSize, params.pageNumber],
    () => fetchApartments(params.pageSize, params.pageNumber)
  );

  const deleteMutation = useMutation(deleteApartment, {
    onSuccess: () => queryClient.invalidateQueries("apartments"),
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
  if (!data.isSuccess) alertError(data.exceptionMessage);

  return (
    <Box mb={2} p={6}>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Heading marginLeft={"50%"}>Apartments</Heading>
        {isAdmin && (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={1}
          >
            <Link to="./new">
              <Tooltip label="Add Apartment!" closeDelay={30} placement="left">
                <Button size={"sm"} direction={"row"} colorScheme="green">
                  <GoPlus />
                </Button>
              </Tooltip>
            </Link>
          </Stack>
        )}
      </Flex>
      <Table mt={5} variant="striped" colorScheme="black">
        {!data.isSuccess && (
          <TableCaption> Error - ({data.exceptionMessage})</TableCaption>
        )}
        <TableCaption> Apartments - Total ({data.totalCount})</TableCaption>
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
                  <Link
                    to={`./${item.id}`}
                    onClick={() => queryClient.invalidateQueries("apartments")}
                  >
                    <Tooltip label="Edit apartment." size="sm" openDelay={50}>
                      <Button size={"sm"} colorScheme={"blue"}>
                        <FiEdit />
                      </Button>
                    </Tooltip>
                  </Link>
                </Th>
                <Th textAlign="center">
                  <Tooltip label="Delete apartment." size="sm" openDelay={50}>
                    <Button
                      size={"sm"}
                      colorScheme={"red"}
                      disabled={deleteMutation.isLoading ? true : false}
                      onClick={() => {
                        deleteMutation.mutate(item.id, {
                          onSuccess: (data) => {
                            !data.isSuccess
                              ? alertError(data.exceptionMessage)
                              : alertSuccess(
                                  `Apartment with id:${item.id} deleted!`
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

export default Apartment;
