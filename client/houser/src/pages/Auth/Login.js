import React from "react";
import { Formik, Form } from "formik";
import {
  Box,
  Button,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Spinner,
  Input,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { fetchLogin } from "../../api";
import { useAuth } from "../../context/AuthContext";
import { loginValidation } from "../../validations/validations";
import { alertError, alertSuccess } from "../../helpers/messageAlert";
function Login() {
  const { login } = useAuth();
  const handleSubmit = async (values, bag) => {
    try {
      // console.log(values);
      const loginResponse = await fetchLogin({
        email: values.email,
        password: values.password,
      });
      // console.log({ loginResponse });
      if (!loginResponse.isSuccess) {
        alertError(loginResponse.exceptionMessage);
        values.email = "";
        values.password = "";
        return;
      }
      login(loginResponse);
      alertSuccess("Logged in!");
    } catch (error) {
      bag.setErrors({ general: error.response.data.message });
    }
  };
  return (
    <Formik
      // initialValues={{ email: "", password: "" }}
      initialValues={{ email: "ugurkiymetli@mail.com", password: "abc123" }}
      onSubmit={handleSubmit}
      validationSchema={loginValidation}
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
        <div>
          <Flex align="center" justifyContent="center" width="full">
            <Box pt={10}>
              <Box textAlign="center">
                <Heading>HOUSER APP</Heading>
                <Heading as="h3" size="lg">
                  Log In
                </Heading>
                {/* ugurkiymetli@mail.com abc123 */}
              </Box>
              <Box my={5}>
                {errors.general && (
                  <Alert status="error">{errors.general}</Alert>
                )}
              </Box>
              <Box>
                <Form onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel>E-mail</FormLabel>
                    <Input
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      isInvalid={touched.email && errors.email}
                      autoComplete={"off"}
                    ></Input>
                    {touched.email && errors.email && (
                      <Box mt={2}>
                        <Alert status="error" variant="subtle">
                          <AlertIcon />
                          {errors.email}
                        </Alert>
                      </Box>
                    )}
                  </FormControl>
                  <FormControl mt="4">
                    <FormLabel>Password </FormLabel>
                    <Input
                      name="password"
                      value={values.password}
                      type="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      isInvalid={touched.password && errors.password}
                    ></Input>
                    {touched.password && errors.password && (
                      <Box mt={2}>
                        <Alert status="error" variant="subtle">
                          <AlertIcon />
                          {errors.password}
                        </Alert>
                      </Box>
                    )}
                  </FormControl>

                  <Button
                    isDisabled={errors.email || errors.password}
                    mt="4"
                    size="lg"
                    width="full"
                    type="submit"
                  >
                    {isSubmitting ? (
                      <Spinner
                        thickness="2px"
                        speed="0.5s"
                        emptyColor="gray.200"
                        color="red.500"
                      />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </Form>
              </Box>
            </Box>
          </Flex>
        </div>
      )}
    </Formik>
  );
}

export default Login;
