import React from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Heading,
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  Spinner,
  Tooltip,
  Select,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useQuery, useQueryClient } from "react-query";
import { insertUserValidations } from "../../validations/validations";
import { alertError, alertSuccess } from "../../helpers/messageAlert";
import { Link, useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { fetchApartments, insertUser } from "../../api";

function NewUser() {
  const { isAdmin } = useAuth();

  const queryClient = useQueryClient();
  const { data: apartments, isLoading: apartmentsLoading } = useQuery(
    ["apartmentId-selectbox"],
    () => fetchApartments(100, 1)
  );
  let navigate = useNavigate();

  const handleSubmit = async (values) => {
    console.log(values);
    values.apartmentId = values.apartmentId === "" ? null : values.apartmentId;
    values.carPlateNum =
      values.carPlateNum === "" || values.carPlateNum === null
        ? null
        : values.carPlateNum.toUpperCase();
    console.log(values);

    try {
      const res = await insertUser(values);
      if (res.isSuccess) {
        alertSuccess(
          `User created with Email: ${values.email} / Password: ${res.exceptionMessage} ! Please note this password.`
        );
        queryClient.refetchQueries("users");
        queryClient.refetchQueries("apartments");
        queryClient.invalidateQueries("user-detail");
        queryClient.invalidateQueries("apartmentId-selectbox");
        navigate("/users");
      } else alertError(res.exceptionMessage);
    } catch (errors) {
      console.log(errors);
    }
  };

  if (!isAdmin) return <Heading>User is not admin!</Heading>;
  return (
    <Container maxW="container.lg">
      <Heading textAlign="center">New User</Heading>
      <Formik
        initialValues={{
          apartmentId: "",
          name: "TestUser",
          email: "testuser@mail.com",
          phoneNum: "5321212312",
          identityNum: "11111111111",
          carPlateNum: "",
        }}
        validationSchema={insertUserValidations}
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
                      Apartment ID{" "}
                      <Link to="/apartments/new">
                        <Tooltip
                          label="Add Apartment!"
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
                      placeholder="Select apartment!"
                      name="apartmentId"
                      value={values.apartmentId}
                      disabled={isSubmitting || apartmentsLoading}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={touched.apartmentId && errors.apartmentId}
                    >
                      {apartments &&
                        apartments.isSuccess &&
                        apartments.list
                          .filter((item) => item.isEmpty)
                          .map((item, key) => (
                            <option key={key} value={item.id}>
                              Block : {item.block} / Floor : {item.floor} /
                              Number : {item.number}
                            </option>
                          ))}
                    </Select>
                    {touched.apartmentId && errors.apartmentId && (
                      <span>{errors.apartmentId}</span>
                    )}
                  </FormControl>
                  <FormControl mt={5} isRequired>
                    <FormLabel>
                      <Tooltip
                        placement="right"
                        ml={3}
                        isOpen={touched.name && errors.name}
                        bgColor={"red.400"}
                        borderRadius={2}
                        label={errors.name}
                        variant="ghost"
                      >
                        Name
                      </Tooltip>
                    </FormLabel>
                    <Input
                      name="name"
                      value={values.name}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={touched.name && errors.name}
                    ></Input>
                    {/* {touched.name && errors.name && <span>{errors.name}</span>} */}
                  </FormControl>
                  <FormControl mt={5} isRequired>
                    <FormLabel>E-Mail</FormLabel>
                    <Input
                      name="email"
                      value={values.email}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={touched.email && errors.email}
                    ></Input>
                    {touched.email && errors.email && (
                      <span>{errors.email}</span>
                    )}
                  </FormControl>

                  <FormControl mt={5} isRequired>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        name="phoneNum"
                        value={values.phoneNum}
                        disabled={isSubmitting}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isInvalid={touched.phoneNum && errors.phoneNum}
                      ></Input>
                      {touched.phoneNum && errors.phoneNum && (
                        <span>{errors.phoneNum}</span>
                      )}
                    </FormControl>
                  </FormControl>
                  <FormControl mt={5} isRequired>
                    <FormLabel>Identity Number</FormLabel>
                    <Input
                      name="identityNum"
                      value={values.identityNum}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={touched.identityNum && errors.identityNum}
                    ></Input>
                    {touched.identityNum && errors.identityNum && (
                      <span>{errors.identityNum}</span>
                    )}
                  </FormControl>
                  <FormControl mt={5}>
                    <FormLabel>Car Plate Number</FormLabel>
                    <Input
                      name="carPlateNum"
                      value={values.carPlateNum}
                      textTransform={"uppercase"}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={touched.carPlateNum && errors.carPlateNum}
                    ></Input>
                    {touched.carPlateNum && errors.carPlateNum && (
                      <span>{errors.carPlateNum}</span>
                    )}
                  </FormControl>
                  <Button
                    mt={5}
                    size="lg"
                    width="full"
                    type="submit"
                    isDisabled={
                      errors.apartmentId ||
                      errors.name ||
                      errors.email ||
                      errors.phoneNum ||
                      errors.identityNum ||
                      errors.carPlateNum
                    }
                  >
                    {isSubmitting ? <Spinner color="red.500" /> : "Add User"}
                  </Button>
                </Form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </Container>
  );
}

export default NewUser;
