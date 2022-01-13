import React from "react";
import {
  fetchApartments,
  fetchPaymentDetail,
  fetchUsers,
  updatePayment,
} from "../../api";
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
  Checkbox,
  Spinner,
  Select,
  Tooltip,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../helpers/LoadingSpinner";
import { insertPaymentValidations } from "../../validations/validations";
import { alertSuccess, alertError } from "../../helpers/messageAlert";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { GoPlus } from "react-icons/go";
function PaymentDetail() {
  const { user, isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const { paymentId } = useParams();
  const { isLoading, error, data } = useQuery(
    ["payment-detail", paymentId],
    () => fetchPaymentDetail(paymentId)
  );
  const { data: payers, isLoading: payersLoading } = useQuery(
    ["payerId-selectbox"],
    () => fetchUsers(100, 1)
  );
  const { data: apartments, isLoading: apartmentsLoading } = useQuery(
    ["apartmentId-selectbox"],
    () => fetchApartments(100, 1)
  );
  let navigate = useNavigate();
  if (!isAdmin && user.paymentId !== paymentId)
    return <Heading>User is not admin!</Heading>;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error {error.message}</div>;
  }
  if (!data.isSuccess) console.log(data.exceptionMessage);

  const handleSubmit = async (values, bag) => {
    values.paymentDueDate = moment(values.paymentDueDate).toDate();
    console.log();
    try {
      console.log("Update submitted!");
      const res = await updatePayment(values, paymentId);
      if (res.isSuccess) {
        alertSuccess("Updated!");
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
      <Heading textAlign="center">Payment Edit</Heading>
      <Formik
        initialValues={{
          id: data.entity.id,
          apartmentId: data.entity.apartmentId,
          payerId: data.entity.payerId,
          amount: data.entity.amount,
          type: data.entity.type,
          isPayed: data.entity.isPayed,
          // paymentDate:
          //   data.entity.paymentDate === null ? "" : data.entity.paymentDate,
          paymentDueDate: data.entity.paymentDueDate,
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
                  {/* <FormControl> */}
                  <FormLabel>ID</FormLabel>
                  <Input
                    name="id"
                    value={values.id}
                    disabled={isSubmitting || data.entity.isPayed}
                    isReadOnly={true}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  ></Input>
                  {/* </FormControl> */}
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
                      placeholder="Select apartment!"
                      name="apartmentId"
                      value={values.apartmentId}
                      disabled={isSubmitting}
                      isLoading={apartmentsLoading}
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
                      disabled={isSubmitting || payersLoading}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={touched.payerId && errors.payerId}
                      // //min={0}
                    >
                      {payers &&
                        payers.isSuccess &&
                        payers.list.map((item, key) => (
                          <option key={key} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                    </Select>

                    {touched.payerId && errors.payerId && (
                      <span>{errors.payerId}</span>
                    )}
                  </FormControl>

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
                        disabled={isSubmitting || data.entity.isPayed}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isInvalid={touched.amount && errors.amount}
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
                      disabled={isSubmitting || data.entity.isPayed}
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
                  {/* <FormControl mt={5}>
                    <FormLabel>Payment Date</FormLabel>
                    <Input
                      name="paymentDate"
                      value={values.paymentDate}
                      disabled={isSubmitting || data.entity.isPayed}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={touched.paymentDate && errors.paymentDate}
                    ></Input>
                    {touched.paymentDate && errors.paymentDate && (
                      <span>{errors.paymentDate}</span>
                    )}
                  </FormControl> */}
                  <FormControl mt={5} isRequired>
                    <FormLabel>Payment Due Date</FormLabel>
                    <Input
                      name="paymentDueDate"
                      value={values.paymentDueDate}
                      disabled={isSubmitting || data.entity.isPayed}
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
                  <FormControl mt={5} isRequired>
                    <FormLabel>Is Payed?</FormLabel>
                    <Checkbox
                      name="isPayed"
                      colorScheme="green"
                      size="lg"
                      defaultChecked={values.isPayed}
                      isReadOnly={true}
                      disabled={true}
                      // onChange={handleChange}
                    >
                      Payed
                    </Checkbox>
                  </FormControl>
                  <Button
                    mt={5}
                    size="lg"
                    width="full"
                    type="submit"
                    isDisabled={
                      errors.apartmentId ||
                      errors.amount ||
                      errors.payerId ||
                      errors.type ||
                      errors.paymentDueDate
                    }
                  >
                    {isSubmitting ? (
                      <Spinner color="red.500" />
                    ) : (
                      "Update Payment"
                    )}
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

export default PaymentDetail;
