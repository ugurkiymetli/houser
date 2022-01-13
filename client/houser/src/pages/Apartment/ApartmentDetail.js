import React from "react";
import { fetchApartmentDetail, updateApartment } from "../../api";
import { alertError, alertSuccess } from "../../helpers/messageAlert";
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
  Spinner,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { updateApartmentValidations } from "../../validations/validations";
import LoadingSpinner from "../../helpers/LoadingSpinner";
import { useNavigate } from "react-router-dom";
function ApartmentDetail() {
  const { user, isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const { apartmentId } = useParams();
  const { isLoading, error, data } = useQuery(
    ["apartment-detail", apartmentId],
    () => fetchApartmentDetail(apartmentId)
  );

  let navigate = useNavigate();
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
    console.log({ values });
    values.residentId = values.residentId == "" ? null : values.residentId;
    if (
      (values.isEmpty && values.residentId == null) ||
      (!values.isEmpty && values.residentId !== null)
    ) {
      alertError("Apartment cant be empty and have resident!");
      return;
    }
    try {
      const res = await updateApartment(values, apartmentId);
      if (res.isSuccess) {
        alertSuccess("Updated!");
        queryClient.refetchQueries("apartments");
        queryClient.invalidateQueries("apartment-detail");
        navigate("/apartments");
      } else alertError(res.exceptionMessage);
    } catch (error) {
      alertError(error);
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
        validationSchema={updateApartmentValidations}
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
                  <FormControl mt={5}>
                    <FormLabel>Resident ID</FormLabel>
                    <Input
                      name="residentId"
                      value={values.residentId}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      isInvalid={touched.residentId && errors.residentId}
                    ></Input>
                    {/* <NumberInput
                      name="residentId"
                      value={values.residentId}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      isInvalid={touched.residentId && errors.residentId}
                      min={0}
                      max={99}
                    >
                      <NumberInputField onChange={handleChange} />
                    </NumberInput> */}

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
                      <FormLabel>
                        {values.isEmpty ? "Empty" : "Occupied"}
                      </FormLabel>
                      <Checkbox
                        variant="solid"
                        border={"1px solid #38a169"}
                        borderRadius={"5px"}
                        name="isEmpty"
                        colorScheme="green"
                        size="lg"
                        defaultChecked={values.isEmpty}
                        onChange={handleChange}
                      ></Checkbox>
                    </FormControl>
                    <Button
                      mt={5}
                      size="lg"
                      width="full"
                      type="submit"
                      // isLoading={isSubmitting}
                      isDisabled={
                        errors.type ||
                        errors.residentId ||
                        errors.number ||
                        errors.floor ||
                        errors.block
                      }
                    >
                      {isSubmitting ? (
                        <Spinner color="red" />
                      ) : (
                        "Update Apartment"
                      )}
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
