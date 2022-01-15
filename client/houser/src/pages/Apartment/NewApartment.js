import React from "react";
import { fetchUsers, insertApartment } from "../../api";
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
  Select,
  Tooltip,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { GoPlus } from "react-icons/go";
import { useQuery, useQueryClient } from "react-query";
import { insertApartmentValidations } from "../../validations/validations";
import { alertError, alertSuccess } from "../../helpers/messageAlert";
import { Link, useNavigate } from "react-router-dom";

function NewApartment() {
  const { isAdmin } = useAuth();

  const { data: residents, isLoading: residentsLoading } = useQuery(
    ["residentId-selectbox"],
    () => fetchUsers(100, 1)
  );
  const queryClient = useQueryClient();
  let navigate = useNavigate();

  const handleSubmit = async (values) => {
    values.residentId = values.residentId === "" ? null : values.residentId;
    values.block = values.block.toUpperCase();
    console.log("new apartment ->", { values });
    try {
      const res = await insertApartment(values);
      if (res.isSuccess) {
        alertSuccess("Apartment created!");
        queryClient.refetchQueries("apartments");
        queryClient.refetchQueries("users");
        queryClient.invalidateQueries("apartment-detail");
        queryClient.invalidateQueries("residentId-selectbox");
        navigate("/apartments");
      } else alertError(res.exceptionMessage);
    } catch (errors) {
      console.log(errors.response.data.errors);
      alertError("Error");
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
          residentId: "",
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
                    <FormLabel>
                      Resident Name{" "}
                      <Link to="/users/new">
                        <Tooltip
                          label="Add User!"
                          closeDelay={30}
                          placement="right"
                        >
                          <Button size="xs">
                            <GoPlus />
                          </Button>
                        </Tooltip>
                      </Link>
                    </FormLabel>
                    <Select
                      placeholder="Select resident"
                      name="residentId"
                      value={values.residentId}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isLoading={residentsLoading}
                      isInvalid={touched.residentId && errors.residentId}
                    >
                      {residents &&
                        residents.isSuccess &&
                        residents.list
                          .filter(
                            (item) =>
                              item.apartmentId === null ||
                              item.apartmentId === 0
                          )
                          .map((item, key) => (
                            <option key={key} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                    </Select>

                    {touched.residentId && errors.residentId && (
                      <span>{errors.residentId}</span>
                    )}
                  </FormControl>
                  <FormControl mt={5} isRequired>
                    <FormLabel>Block</FormLabel>
                    <Input
                      name="block"
                      textTransform={"uppercase"}
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
                      //min={0}
                      max={99}
                    >
                      <NumberInputField onChange={handleChange} />
                    </NumberInput>

                    {touched.floor && errors.floor && (
                      <span>{errors.floor}</span>
                    )}
                  </FormControl>
                  <FormControl mt={5} isRequired>
                    <FormLabel>Number</FormLabel>
                    <NumberInput
                      name="number"
                      value={values.number}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      isInvalid={touched.number && errors.number}
                      //min={0}
                    >
                      <NumberInputField onChange={handleChange} />
                    </NumberInput>
                    {touched.number && errors.number && (
                      <span>{errors.number}</span>
                    )}
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
                      <FormLabel>Is Empty ?</FormLabel>
                      <Checkbox
                        variant="solid"
                        border={"1px solid #38a169"}
                        borderRadius={"5px"}
                        name="isEmpty"
                        value={!values.isEmpty}
                        colorScheme="green"
                        size="lg"
                        disabled={isSubmitting}
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
                      {isSubmitting ? (
                        <Spinner color="red.500" />
                      ) : (
                        "Add Apartment"
                      )}
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
