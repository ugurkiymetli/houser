import React from "react";
import { fetchApartmentDetail, fetchUsers, updateApartment } from "../../api";
import { alertError, alertSuccess } from "../../helpers/messageAlert";
import { useAuth } from "../../context/AuthContext";
import {
  Heading,
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  Button,
  Checkbox,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { insertApartmentValidations } from "../../validations/validations";
import LoadingSpinner from "../../helpers/LoadingSpinner";
import { Link, useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
function ApartmentDetail() {
  const { user, isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const { apartmentId } = useParams();
  const { isLoading, error, data } = useQuery(
    ["apartment-detail", apartmentId],
    () => fetchApartmentDetail(apartmentId)
  );
  const { data: residents, isLoading: residentsLoading } = useQuery(
    ["residentId-selectbox"],
    () => fetchUsers(100, 1)
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
    values.residentId = values.residentId === "" ? null : values.residentId;
    values.block = values.block.toUpperCase();
    console.log("update apartment: ", { values });
    if (
      (values.isEmpty && values.residentId !== null) ||
      (!values.isEmpty && values.residentId === null)
    ) {
      values.isEmpty && values.residentId !== null
        ? alertError("Apartment cant be empty and have resident!")
        : alertError("Apartment cant have resident and be empty!");
      return;
    }
    try {
      const res = await updateApartment(values, apartmentId);
      if (res.isSuccess) {
        alertSuccess("Updated!");
        queryClient.refetchQueries("apartments");
        queryClient.invalidateQueries("apartment-detail");
        queryClient.refetchQueries("users");
        navigate("/apartments");
      } else alertError(res.exceptionMessage);
    } catch (errors) {
      console.log(errors.response.data.errors);
      alertError("Error");
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
                      name="residentId"
                      value={values.residentId}
                      disabled={isSubmitting || residentsLoading}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={touched.residentId && errors.residentId}
                    >
                      {" "}
                      <option value={""}>Empty</option>
                      {values.residentId !== null && (
                        <option value={values.residentId}>
                          {values.residentId}
                        </option>
                      )}
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
                        colorScheme="green"
                        size="lg"
                        disabled={isSubmitting}
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
                        <Spinner color="red.500" />
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
