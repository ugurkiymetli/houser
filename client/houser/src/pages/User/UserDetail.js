import React from "react";
import { fetchUserDetail, updateUser } from "../../api";
import {
  Heading,
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../helpers/LoadingSpinner";
import { alertError, alertSuccess } from "../../helpers/messageAlert";
import { insertUserValidations } from "../../validations/validations";
import { useNavigate } from "react-router-dom";
function UserDetail() {
  const { userId } = useParams();
  const { user, isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery(["user-detail", userId], () =>
    fetchUserDetail(userId)
  );

  let navigate = useNavigate();
  if (!isAdmin && user.id !== userId)
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
      const res = await updateUser(values, userId);
      if (res.isSuccess) {
        alertSuccess("Updated!");
        queryClient.refetchQueries("users");
        queryClient.invalidateQueries("user-detail");
        navigate("/users");
      } else alertError(res.exceptionMessage);
      // res.isSuccess
      //   ? alertSuccess("Updated!")
      //   : alertError(res.exceptionMessage);
      // queryClient.invalidateQueries("user-detail");
    } catch (errors) {
      alertError(errors);
      console.log(errors);
    }
  };
  return (
    <Container maxW="container.lg">
      <Heading textAlign="center">User Edit</Heading>
      <Formik
        initialValues={{
          id: data.entity.id,
          apartmentId: data.entity.apartmentId,
          name: data.entity.name,
          email: data.entity.email,
          phoneNum: data.entity.phoneNum,
          identityNum: data.entity.identityNum,
          carPlateNum:
            data.entity.carPlateNum === null ? "" : data.entity.carPlateNum,
        }}
        onSubmit={handleSubmit}
        validationSchema={insertUserValidations}
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
                      disabled={isSubmitting}
                      isReadOnly={true}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    ></Input>
                  </FormControl>
                  <FormControl mt={5}>
                    <FormLabel>Apartment ID</FormLabel>
                    <Input
                      name="apartmentId"
                      value={values.apartmentId}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={touched.apartmentId && errors.apartmentId}
                    ></Input>
                    {touched.apartmentId && errors.apartmentId && (
                      <span>{errors.apartmentId}</span>
                    )}
                  </FormControl>
                  <FormControl mt={5}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      name="name"
                      value={values.name}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={touched.name && errors.name}
                    ></Input>
                    {touched.name && errors.name && <span>{errors.name}</span>}
                  </FormControl>
                  <FormControl mt={5}>
                    <FormLabel>E-Mail</FormLabel>
                    <Input
                      name="email"
                      value={values.email}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={touched.apartmentId && errors.apartmentId}
                    ></Input>
                    {touched.apartmentId && errors.apartmentId && (
                      <span>{errors.apartmentId}</span>
                    )}
                  </FormControl>

                  <FormControl mt={5}>
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
                  <FormControl mt={5}>
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
                      errors.type ||
                      errors.residentId ||
                      errors.number ||
                      errors.floor ||
                      errors.block
                    }
                  >
                    {isSubmitting ? <Spinner color="red" /> : "Update User"}
                  </Button>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </Container>
  );
}

export default UserDetail;
