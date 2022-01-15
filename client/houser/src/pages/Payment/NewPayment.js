import React from "react";
import { fetchApartments, fetchUsers, insertPayment } from "../../api";
import {
  Heading,
  Box,
  Container,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Spinner,
  Select,
  Tooltip,
  Link,
  Text,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useQuery, useQueryClient } from "react-query";
import { useAuth } from "../../context/AuthContext";
import { insertPaymentValidations } from "../../validations/validations";
import { alertSuccess, alertError } from "../../helpers/messageAlert";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { GoPlus } from "react-icons/go";

function NewPayment() {
  const { isAdmin } = useAuth();
  const queryClient = useQueryClient();
  let navigate = useNavigate();
  const { data: residents, isLoading: residentsLoading } = useQuery(
    ["payerId-selectbox"],
    () => fetchUsers(100, 1)
  );
  const { data: apartments, isLoading: apartmentsLoading } = useQuery(
    ["apartmentId-selectbox"],
    () => fetchApartments(100, 1)
  );
  if (!isAdmin) return <Heading>User is not admin!</Heading>;
  //form submit
  const handleSubmit = async (values, bag) => {
    values.paymentDueDate = moment(values.paymentDueDate).toDate();
    values.payerId = apartments.list.find(
      (item) => item.id == values.apartmentId
    )["residentId"];
    console.log(values);
    try {
      console.log("insert submitted!");
      const res = await insertPayment(values);
      if (res.isSuccess) {
        alertSuccess("Payment created!");
        queryClient.refetchQueries("payments");
        queryClient.invalidateQueries("payment-detail");
        navigate("/payments");
      } else alertError(res.exceptionMessage);
    } catch (errors) {
      console.log(errors);
    }
  };
  return (
    <Container maxW="container.lg">
      <Heading textAlign="center">Create Payment </Heading>
      <Formik
        initialValues={{
          apartmentId: "",
          payerId: "",
          amount: "",
          type: "",
          paymentDueDate: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={insertPaymentValidations}
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
                  <FormControl mt={5} isRequired>
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
                      placeholder="Select apartment"
                      name="apartmentId"
                      value={values.apartmentId}
                      disabled={isSubmitting}
                      isDisabled={apartmentsLoading}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={touched.apartmentId && errors.apartmentId}
                    >
                      {apartments &&
                        apartments.isSuccess &&
                        apartments.list
                          .filter((item) => !item.isEmpty)
                          .map((item, key) => (
                            <option key={key} value={item.id}>
                              ID: {item.id} / Block : {item.block} / Floor :{" "}
                              {item.floor} / Number : {item.number}
                            </option>
                          ))}
                    </Select>
                    {touched.apartmentId && errors.apartmentId && (
                      <span>{errors.apartmentId}</span>
                    )}
                  </FormControl>
                  <FormControl mt={5} isRequired>
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
                    <Text fontSize={"xl"} as="b">
                      {residents && values.apartmentId !== ""
                        ? residents.list.find(
                            (item) => item.apartmentId == values.apartmentId
                          )["name"]
                        : "-"}
                    </Text>
                  </FormControl>
                  {/* <FormControl mt={5} isRequired>
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
                      name="payerId"
                      value={values.payerId}
                      disabled={isSubmitting || residentsLoading}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={touched.payerId && errors.payerId}
                    >
                      {residents &&
                        residents.isSuccess &&
                        residents.list.map((item, key) => (
                          <option key={key} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                    </Select>

                    {touched.payerId && errors.payerId && (
                      <span>{errors.payerId}</span>
                    )}
                  </FormControl> */}
                  <FormControl mt={5} isRequired>
                    <FormLabel>Amount</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        fontSize="1.2em"
                        children="₺"
                      />
                      <Input
                        name="amount"
                        placeholder="Enter amount"
                        value={values.amount}
                        disabled={isSubmitting}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isInvalid={touched.amount && errors.amount}
                        autoComplete="off"
                      ></Input>
                    </InputGroup>
                    {touched.amount && errors.amount && (
                      <span>{errors.amount}</span>
                    )}
                  </FormControl>
                  <FormControl mt={5} isRequired>
                    <FormLabel>Type</FormLabel>
                    <Select
                      placeholder="Select type"
                      name="type"
                      value={values.type}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={touched.type && errors.type}
                    >
                      <option value="Electricity">Electricity</option>
                      <option value="Gas">Gas</option>
                      <option value="Water">Water</option>
                      <option value="General">General</option>
                    </Select>
                    {touched.type && errors.type && <span>{errors.type}</span>}
                  </FormControl>
                  <FormControl mt={5} isRequired>
                    <FormLabel>Payment Due Date</FormLabel>
                    <Input
                      name="paymentDueDate"
                      value={values.paymentDueDate}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={
                        touched.paymentDueDate && errors.paymentDueDate
                      }
                    ></Input>
                    {touched.paymentDueDate && errors.paymentDueDate && (
                      <span>{errors.paymentDueDate}</span>
                    )}
                  </FormControl>

                  <Button
                    mt={5}
                    size="lg"
                    width="full"
                    type="submit"
                    isDisabled={
                      errors.apartmentId ||
                      errors.amount ||
                      // errors.payerId ||
                      errors.type ||
                      errors.paymentDueDate
                    }
                  >
                    {isSubmitting ? <Spinner color="red.500" /> : "Add Payment"}
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
export default NewPayment;
