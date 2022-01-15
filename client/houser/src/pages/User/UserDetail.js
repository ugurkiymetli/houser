import React from "react";
import { fetchApartments, fetchUserDetail, updateUser } from "../../api";
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
import { Formik } from "formik";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../helpers/LoadingSpinner";
import {
  alertError,
  alertInfo,
  alertSuccess,
} from "../../helpers/messageAlert";
import { insertUserValidations } from "../../validations/validations";
import { Link, useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
function UserDetail() {
  const { userId } = useParams();
  const { user, isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery(["user-detail", userId], () =>
    fetchUserDetail(userId)
  );
  //fetchUserDetail returns apartmentId = 0 if it is null so we set it null instead of 0
  data &&
    (data.entity.apartmentId =
      data.entity.apartmentId === 0 ? null : data.entity.apartmentId);
  data && console.log("data:", data);
  //fetchApartments for apartments selectbox
  const { data: apartments, isLoading: apartmentsLoading } = useQuery(
    ["apartmentId-selectbox"],
    () => fetchApartments(100, 1)
  );

  let navigate = useNavigate();
  //if user is not admin we do not render page
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
    // console.log("user-detail-values:", values);
    values.apartmentId =
      values.apartmentId === "" || values.apartmentId === 0
        ? null
        : values.apartmentId;

    //convert carplatenum empty string to null and toUpperCase here
    values.carPlateNum =
      values.carPlateNum === "" ? null : values.carPlateNum.toUpperCase();

    try {
      console.log("Update submitted!");
      const res = await updateUser(values, userId);
      if (res.isSuccess) {
        alertSuccess("Updated!");
        //refetch and invalidate queries here after updating
        queryClient.refetchQueries("users", values.id);
        queryClient.refetchQueries("user-detail");
        queryClient.refetchQueries("apartments");
        queryClient.refetchQueries("apartmentId-selectbox");
        //redirect to users page
        navigate("/users");
      } else alertError(res.exceptionMessage);
    } catch (errors) {
      console.log(errors);
    }
  };
  return (
    <Container maxW="container.lg">
      <Heading textAlign="center">User Edit</Heading>
      <Formik
        //initial form values from fetchUserDetail
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
                    <FormLabel>
                      Apartment{" "}
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
                      name="apartmentId"
                      value={values.apartmentId}
                      disabled={isSubmitting}
                      isLoading={apartmentsLoading}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={touched.apartmentId && errors.apartmentId}
                    >
                      <option value={""}>Empty</option>
                      //if user has apartment we render its apartment in
                      selectbox option
                      {values.apartmentId !== null && (
                        // && values.apartmentId !== 0
                        <option value={values.apartmentId}>
                          {values.apartmentId}
                        </option>
                      )}
                      //we render empty apartments here for user to choose
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
                      isInvalid={touched.email && errors.email}
                    ></Input>
                    {touched.email && errors.email && (
                      <span>{errors.email}</span>
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
                    {isSubmitting ? <Spinner color="red.500" /> : "Update User"}
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
