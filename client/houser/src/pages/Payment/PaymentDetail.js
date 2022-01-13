import React from "react";
import { fetchPaymentDetail, updatePayment } from "../../api";
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
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../helpers/LoadingSpinner";
import { insertPaymentValidations } from "../../validations/validations";
import { alertSuccess, alertError } from "../../helpers/messageAlert";
function PaymentDetail() {
  const { user, isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const { paymentId } = useParams();
  const { isLoading, error, data } = useQuery(
    ["payment-detail", paymentId],
    () => fetchPaymentDetail(paymentId)
  );
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
    try {
      console.log("Update submitted!");
      const res = await updatePayment(values, paymentId);
      res.isSuccess
        ? alertSuccess("Updated!")
        : alertError(res.exceptionMessage);
      queryClient.invalidateQueries("payment-detail");
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
          //   data.entity.paymentDate === null
          //     ? undefined
          //     : data.entity.paymentDate,
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
                  <FormControl mt={5} isRequired>
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
                      ></Input>
                    </InputGroup>
                    {touched.amount && errors.amount && (
                      <span>{errors.amount}</span>
                    )}
                  </FormControl>
                  <FormControl mt={5} isRequired>
                    <FormLabel>Type</FormLabel>
                    <Input
                      name="type"
                      value={values.type}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={touched.type && errors.type}
                    ></Input>
                    {touched.type && errors.type && <span>{errors.type}</span>}
                  </FormControl>
                  {/* <FormControl mt={5}>
                    <FormLabel>Payment Date</FormLabel>
                    <Input
                      name="paymentDate"
                      value={values.paymentDate}
                      disabled={isSubmitting}
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
                  <FormControl mt={5} isRequired>
                    <FormLabel>Is Payed?</FormLabel>
                    <Checkbox
                      name="isPayed"
                      colorScheme="green"
                      size="lg"
                      defaultChecked={values.isPayed}
                      onChange={handleChange}
                    >
                      Payed
                    </Checkbox>
                  </FormControl>
                  <Button
                    mt={5}
                    size="lg"
                    width="full"
                    type="submit"
                    isLoading={isSubmitting}
                    isDisabled={
                      errors.apartmentId ||
                      errors.amount ||
                      errors.payerId ||
                      errors.type ||
                      errors.paymentDueDate
                    }
                  >
                    Update Payment
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

export default PaymentDetail;
