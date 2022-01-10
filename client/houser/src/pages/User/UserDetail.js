import React from "react";
import { fetchUserDetail, updateUser } from "../../api";

import {
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
function UserDetail() {
  const { userId } = useParams();
  const { user, isAdmin } = useAuth();
  const { isLoading, error, data } = useQuery(["user-detail", userId], () =>
    fetchUserDetail(userId)
  );

  if (!isAdmin && user.id != userId)
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
      <Heading textAlign="center">User Edit</Heading>
      <Formik
        initialValues={{
          id: data.entity.id,
          apartmentId: data.entity.apartmentId,
          name: data.entity.name,
          email: data.entity.email,
          phoneNum: data.entity.phoneNum,
          identityNum: data.entity.identityNum,
          carPlateNum: data.entity.carPlateNum,
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
                    <FormLabel>Apartment ID</FormLabel>
                    <Input
                      name="apartmentId"
                      value={values.apartmentId}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    ></Input>
                  </FormControl>
                  <FormControl mt={5}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      name="name"
                      value={values.name}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    ></Input>
                  </FormControl>
                  <FormControl mt={5}>
                    <FormLabel>E-Mail</FormLabel>
                    <Input
                      name="email"
                      value={values.email}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    ></Input>
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
                      ></Input>
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
                    ></Input>
                  </FormControl>
                  <FormControl mt={5}>
                    <FormLabel>Car Plate Number</FormLabel>
                    <Input
                      name="carPlateNum"
                      value={values.carPlateNum}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    ></Input>
                  </FormControl>
                  <Button
                    mt={5}
                    width="full"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Update
                  </Button>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </div>
  );
}

export default UserDetail;
