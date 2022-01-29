import React, { useState } from "react";
import LoadingSpinner from "../../helpers/LoadingSpinner";
import { useParams } from "react-router";
import { useQuery, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { fetchPaymentDetail, updatePaidPayment } from "../../api";
import { useAuth } from "../../context/AuthContext";
import ErrorPayment from "../../helpers/ErrorPayment";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";

import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import PaymentInfo from "../../components/Payment/PaymentInfo";
import { Form, Formik } from "formik";
import { creditCardValidation } from "../../validations/validations";
import {
  alertSuccess,
  alertError,
  alertInfo,
} from "../../helpers/messageAlert";
import axios from "axios";

function PaymentPage() {
  const { user } = useAuth();
  const { paymentId } = useParams();
  const { isLoading, error, data } = useQuery(
    ["payment-detail", paymentId],
    () => fetchPaymentDetail(paymentId)
  );
  const [focusedItem, setFocusedItem] = useState("");
  const queryClient = useQueryClient();
  let navigate = useNavigate();
  if (data && data.entity.payerId !== user.id)
    return <ErrorPayment error={"othersPayment"} />;
  if (data && data.entity.isPayed) return <ErrorPayment error={"alreayPaid"} />;
  if (isLoading) return <LoadingSpinner />;
  if (error) {
    return <div>Error {error.message}</div>;
  }
  const fetchCreditCardPayment = async (input) => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_PAYMENT_ENDPOINT}/payment`,
      input
    );
    return data;
  };

  const handleSubmit = async (values) => {
    values.creditCardNumber = values.creditCardNumber.toString();
    values.creditCardHolderName = values.creditCardHolderName.toUpperCase();
    console.log({ values });
    try {
      const paymentResponse = await fetchCreditCardPayment(values);
      console.log({ paymentResponse });
      if (paymentResponse) {
        const updateResponse = await updatePaidPayment(values.paymentId);
        console.log({ updateResponse });
        if (updateResponse.isSuccess) {
          alertSuccess(
            `${values.amount} ₺ payed for payment with id :${data.entity.id}!`
          );
          queryClient.refetchQueries("payments");
          queryClient.refetchQueries("payment-detail");
          navigate("/payments");
        } else {
          console.log(updateResponse.exceptionMessage);
          alertError("Payment failed!");
        }
      } else {
        alertError("Payment failed!");
      }
    } catch (error) {
      alertError(error);
      console.log(error);
    }
  };
  const handleInputFocus = (e) => {
    e.target.name === "creditCardCVC"
      ? setFocusedItem("cvc")
      : setFocusedItem(e.target.name);
  };
  return (
    <Container mt={5} maxW="container.sm">
      <PaymentInfo payment={data.entity} />

      <Formik
        initialValues={{
          userId: user.id,
          paymentId: data?.entity.id,
          amount: data?.entity.amount,
          creditCardNumber: "4644509881052561",
          creditCardHolderName: "uğur kıymetli",
          creditCardCVC: "123",
          creditCardExpiryDate: "12/23",
        }}
        // initialValues={{
        //   userId: user.id,
        //   paymentId: data?.entity.id,
        //   amount: data?.entity.amount,
        //   creditCardNumber: "",
        //   creditCardHolderName: "",
        //   creditCardCVC: "",
        //   creditCardExpiryDate: "",
        // }}
        onSubmit={handleSubmit}
        validationSchema={creditCardValidation}
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
          <SimpleGrid columns={2} spacing={5}>
            <Box mt={"30%"}>
              <Cards
                cvc={values.creditCardCVC}
                expiry={values.creditCardExpiryDate}
                focused={focusedItem}
                name={values.creditCardHolderName}
                number={values.creditCardNumber}
              ></Cards>
            </Box>
            <Form onSubmit={handleSubmit}>
              <Box>
                <FormControl mt={4}>
                  <FormLabel>Credit Card Number</FormLabel>
                  <Input
                    name="creditCardNumber"
                    value={values.creditCardNumber}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    disabled={isSubmitting}
                    isInvalid={
                      touched.creditCardNumber && errors.creditCardNumber
                    }
                    onBlur={handleBlur}
                    maxLength={16}
                    type={"number"}
                  ></Input>
                  {touched.creditCardNumber && errors.creditCardNumber && (
                    <span>{errors.creditCardNumber}</span>
                  )}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Card Holder Name</FormLabel>
                  <Input
                    name="creditCardHolderName"
                    value={values.creditCardHolderName}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    disabled={isSubmitting}
                    onBlur={handleBlur}
                    isInvalid={
                      touched.creditCardHolderName &&
                      errors.creditCardHolderName
                    }
                  ></Input>
                  {touched.creditCardHolderName &&
                    errors.creditCardHolderName && (
                      <span>{errors.creditCardHolderName}</span>
                    )}
                </FormControl>
                <SimpleGrid columns={2} spacing={1}>
                  <FormControl mt={4}>
                    <FormLabel>CVC</FormLabel>
                    <Input
                      name="creditCardCVC"
                      value={values.creditCardCVC}
                      onChange={handleChange}
                      onFocus={handleInputFocus}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      isInvalid={touched.creditCardCVC && errors.creditCardCVC}
                      maxLength={3}
                      width={"50%"}
                    ></Input>
                    {touched.creditCardCVC && errors.creditCardCVC && (
                      <p>{errors.creditCardCVC}</p>
                    )}
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Expiry Date</FormLabel>
                    <Input
                      name="creditCardExpiryDate"
                      value={values.creditCardExpiryDate}
                      onChange={handleChange}
                      onFocus={handleInputFocus}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      isInvalid={
                        touched.creditCardExpiryDate &&
                        errors.creditCardExpiryDate
                      }
                      maxLength={5}
                    ></Input>
                    {touched.creditCardExpiryDate &&
                      errors.creditCardExpiryDate && (
                        <p>{errors.creditCardExpiryDate}</p>
                      )}
                  </FormControl>
                </SimpleGrid>
                <Button
                  type="submit"
                  name="submit"
                  mt={5}
                  mb={10}
                  isFullWidth
                  colorScheme="green"
                  bg="green.400"
                  color="blackAlpha.900"
                  _hover={{
                    bg: "green.500",
                  }}
                  size={"lg"}
                  isDisabled={
                    errors.cardNumber ||
                    errors.holderName ||
                    errors.cvcNumber ||
                    errors.expiryDate
                  }
                  isLoading={isSubmitting}
                >
                  Pay- <strong>{data && data.entity.amount} ₺</strong>
                </Button>
              </Box>
            </Form>
          </SimpleGrid>
        )}
      </Formik>
    </Container>
  );
}

export default PaymentPage;
