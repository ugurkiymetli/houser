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
import loginValidationSchema from "./validations";

function Login() {
  const { login } = useAuth();
  const handleSubmit = async (values, bag) => {
    try {
      console.log(values);
      const loginResponse = await fetchLogin({
        email: values.email,
        password: values.password,
      });
      login(loginResponse);
      console.log(loginResponse);
    } catch (error) {
      bag.setErrors({ general: error.response.data.message });
    }
  };
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginValidationSchema}
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
        <div>
          <Flex align="center" justifyContent="center" width="full">
            <Box pt={10}>
              <Box textAlign="center">
                <Heading>HOUSER APP</Heading>
                <Heading as="h3" size="lg">
                  Log In
                </Heading>
                ugurkiymetli@mail.com abc123
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
                    isDisabled={touched.password && errors.password}
                    mt="4"
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
    // <div>
    //   <Flex align="center" justifyContent="center" width="full">
    //     <Box pt={10}>
    //       <Box textAlign="center">
    //         <Heading>Log In</Heading>
    //         ugurkiymetli@mail.com abc123
    //       </Box>
    //       <Box my={5}>
    //         {formik.errors.general && (
    //           <Alert status="error">{formik.errors.general}</Alert>
    //         )}
    //       </Box>
    //       <Box>
    //         <form onSubmit={formik.handleSubmit}>
    //           <FormControl>
    //             <FormLabel>E-mail</FormLabel>
    //             <Input
    //               name="email"
    //               onChange={formik.handleChange}
    //               onBlur={formik.handleBlur}
    //               value={formik.values.email}
    //               isInvalid={formik.touched.email && formik.errors.email}
    //             ></Input>
    //           </FormControl>

    //           <FormControl mt="4">
    //             <FormLabel>Password</FormLabel>

    //             <Input
    //               name="password"
    //               type="password"
    //               onChange={formik.handleChange}
    //               onBlur={formik.handleBlur}
    //               value={formik.values.password}
    //               isInvalid={formik.touched.password && formik.errors.password}
    //             ></Input>
    //           </FormControl>

    //           <Button mt="4" width="full" type="submit">
    //             Log In
    //           </Button>
    //         </form>
    //       </Box>
    //     </Box>
    //   </Flex>
    // </div>
  );
}

export default Login;
