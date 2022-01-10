import React from "react";
import { fetchApartmentDetail, updateApartment } from "../../api";
import {
  Flex,
  Spinner,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";

function ApartmentDetail() {
  const { user, isAdmin } = useAuth();

  const queryClient = useQueryClient();
  const { apartmentId } = useParams();
  const { isLoading, error, data } = useQuery(
    ["apartment-detail", apartmentId],
    () => fetchApartmentDetail(apartmentId)
  );

  if (!isAdmin && user.apartmentId != apartmentId)
    return <Heading>User is not admin!</Heading>;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error {error.message}</div>;
  }
  if (!data.isSuccess) console.log(data.exceptionMessage);
  const handleSubmit = async (values, bag) => {
    try {
      console.log("Update submitted!");
      // const { res } = await updateApartment(values, apartmentId);
      // console.log(res);
      // queryClient.invalidateQueries("apartment-detail");
    } catch (errors) {
      console.log(errors);
    }
  };
  return (
    <div>
      <Heading textAlign="center">Apartment Edit</Heading>
      <Formik
        initialValues={{
          id: data.entity.id,
          block: data.entity.block,
          number: data.entity.number,
          floor: data.entity.floor,
          residentId: data.entity.residentId,
          type: data.entity.type,
          isEmpty: data.entity.isEmpty,
        }}
        onSubmit={handleSubmit}
      >
        {({ handleBlur, handleSubmit, handleChange, values, isSubmitting }) => (
          <>
            <Box m={5}>
              <Box my="5" textAlign="left">
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel>ID</FormLabel>
                    <Input
                      name="id"
                      value={values.id}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    ></Input>
                  </FormControl>
                  <FormControl mt={5}>
                    <FormLabel>Resident ID</FormLabel>
                    <Input
                      name="residentId"
                      value={values.residentId}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    ></Input>
                  </FormControl>
                  <FormControl mt={5}>
                    <FormLabel>Block</FormLabel>
                    <Input
                      name="block"
                      value={values.block}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    ></Input>
                  </FormControl>
                  <FormControl mt={5}>
                    <FormLabel>Floor</FormLabel>
                    <Input
                      name="floor"
                      value={values.floor}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    ></Input>
                    <FormControl mt={5}>
                      <FormLabel>Number</FormLabel>
                      <Input
                        name="number"
                        value={values.number}
                        disabled={isSubmitting}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      ></Input>
                    </FormControl>
                  </FormControl>

                  <FormControl mt={5}>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Input
                        name="type"
                        value={values.type}
                        disabled={isSubmitting}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      ></Input>
                    </FormControl>
                    <FormControl mt={5}>
                      <FormLabel>Is Empty?</FormLabel>
                      <Checkbox
                        colorScheme="green"
                        size="lg"
                        isChecked={values.isEmpty}
                        onChange={handleChange}
                      >
                        Occupation
                      </Checkbox>
                    </FormControl>
                    <Button
                      mt={5}
                      width="full"
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      Update
                    </Button>
                  </FormControl>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </div>
  );
}

export default ApartmentDetail;
