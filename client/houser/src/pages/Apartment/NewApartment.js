import React, { useState } from "react";
import { insertApartment } from "../../api";
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
import { Formik, Form } from "formik";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { insertApartmentValidations } from "../../validations/validations";
import { alertError, alertSuccess } from "../../helpers/messageAlert";
import { useNavigate } from "react-router-dom";

function NewApartment() {
  const { user, isAdmin } = useAuth();

  const queryClient = useQueryClient();
  const newApartmentMutation = useMutation(insertApartment, {
    onSuccess: () => queryClient.invalidateQueries("apartments"),
  });
  let navigate = useNavigate();

  const handleSubmit = async (values) => {
    console.log(values);
    // newApartmentMutation.mutate(values, {
    //   onSuccess: () => {
    //     alertSuccess("Apartment added!");
    //   },
    //   onError: () => {
    //     alertError("Error!!");
    //   },
    // });

    try {
      const res = await insertApartment(values);
      res.isSuccess
        ? alertSuccess("Apartment added!")
        : alertError(res.exceptionMessage);
      queryClient.invalidateQueries("apartments");
      navigate("/apartments");
    } catch (error) {
      alertError(error);
    }
  };

  if (!isAdmin) return <Heading>User is not admin!</Heading>;
  return (
    <Container maxW="container.lg">
      <Heading textAlign="center">New Apartment</Heading>
      <Formik
        initialValues={{
          block: "A",
          number: 1,
          floor: 1,
          residentId: 1,
          type: "1+1",
          isEmpty: true,
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
                <Form onSubmit={handleSubmit}>
                  <FormControl mt={5}>
                    <FormLabel>Resident ID</FormLabel>

                    <NumberInput
                      name="residentId"
                      value={values.residentId}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      isInvalid={touched.residentId && errors.residentId}
                      min={0}
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
                      max={99}
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
                        value={!values.isEmpty}
                        colorScheme="green"
                        size="lg"
                        defaultChecked
                        onChange={handleChange}
                      />
                    </FormControl>
                    <Button
                      mt={5}
                      size="lg"
                      width="full"
                      type="submit"
                      isDisabled={
                        errors.type ||
                        errors.residentId ||
                        errors.number ||
                        errors.floor ||
                        errors.block
                      }
                    >
                      {isSubmitting ? <Spinner /> : "Add Apartment"}
                    </Button>
                  </FormControl>
                </Form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </Container>
  );
}

export default NewApartment;
