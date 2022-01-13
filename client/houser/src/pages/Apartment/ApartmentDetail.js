import React from "react";
import { fetchApartmentDetail, updateApartment } from "../../api";
import { useAuth } from "../../context/AuthContext";
import {
  Heading,
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { insertApartmentValidations } from "../../validations/validations";
import LoadingSpinner from "../../helpers/LoadingSpinner";
function ApartmentDetail() {
  const { user, isAdmin } = useAuth();

  const queryClient = useQueryClient();
  const { apartmentId } = useParams();
  const { isLoading, error, data } = useQuery(
    ["apartment-detail", apartmentId],
    () => fetchApartmentDetail(apartmentId)
  );

  if (!isAdmin && user.apartmentId !== apartmentId)
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
      const res = await updateApartment(values, apartmentId);
      console.log(res);
      queryClient.invalidateQueries("apartment-detail");
    } catch (errors) {
      alert(errors);
      console.log(errors);
    }
  };
  return (
    <Container maxW="container.lg">
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
        validationSchema={insertApartmentValidations}
        onSubmit={handleSubmit}
      >
        {({
          handleBlur,
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
          isSubmitting,
        }) => (
          <>
            <Box m={5}>
              <Box my="5" textAlign="left">
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel>ID</FormLabel>
                    <Input
                      name="id"
                      value={values.id}
                      isReadOnly={true}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    ></Input>
                  </FormControl>
                  <FormControl mt={5} isRequired>
                    <FormLabel>Resident ID</FormLabel>

                    <NumberInput
                      name="residentId"
                      value={values.residentId}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      isInvalid={touched.residentId && errors.residentId}
                      min={0}
                      max={99}
                    >
                      <NumberInputField onChange={handleChange} />
                    </NumberInput>

                    {touched.residentId && errors.residentId && (
                      <span>{errors.residentId}</span>
                    )}
                  </FormControl>
                  <FormControl mt={5} isRequired>
                    <FormLabel>Block</FormLabel>
                    <Input
                      name="block"
                      value={values.block}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={touched.block && errors.block}
                    ></Input>
                    {touched.block && errors.block && (
                      <span>{errors.block}</span>
                    )}
                  </FormControl>
                  <FormControl mt={5} isRequired>
                    <FormLabel>Floor</FormLabel>
                    <NumberInput
                      name="floor"
                      value={values.floor}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      isInvalid={touched.floor && errors.floor}
                      min={0}
                    >
                      <NumberInputField onChange={handleChange} />
                    </NumberInput>

                    {touched.floor && errors.floor && (
                      <span>{errors.floor}</span>
                    )}
                    <FormControl mt={5} isRequired>
                      <FormLabel>Number</FormLabel>
                      <NumberInput
                        name="number"
                        value={values.number}
                        disabled={isSubmitting}
                        onBlur={handleBlur}
                        isInvalid={touched.number && errors.number}
                        min={0}
                      >
                        <NumberInputField onChange={handleChange} />
                      </NumberInput>
                      {touched.number && errors.number && (
                        <span>{errors.number}</span>
                      )}
                    </FormControl>
                  </FormControl>

                  <FormControl mt={5} isRequired>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Input
                        name="type"
                        value={values.type}
                        disabled={isSubmitting}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isInvalid={touched.type && errors.type}
                      ></Input>
                      {touched.type && errors.type && (
                        <span>{errors.type}</span>
                      )}
                    </FormControl>
                    <FormControl mt={5}>
                      <FormLabel>Is Empty?</FormLabel>
                      <Checkbox
                        name="isEmpty"
                        colorScheme="green"
                        size="lg"
                        defaultChecked={!values.isEmpty}
                        onChange={handleChange}
                      >
                        Occupied
                      </Checkbox>
                    </FormControl>
                    <Button
                      mt={5}
                      size="lg"
                      width="full"
                      type="submit"
                      isLoading={isSubmitting}
                      isDisabled={
                        errors.type ||
                        errors.residentId ||
                        errors.number ||
                        errors.floor ||
                        errors.block
                      }
                    >
                      Update Apartment
                    </Button>
                  </FormControl>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </Container>
  );
}

export default ApartmentDetail;
