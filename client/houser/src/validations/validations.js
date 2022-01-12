import * as Yup from "yup";

export const insertApartmentValidations = Yup.object().shape({
  block: Yup.string().required("Required"),
  number: Yup.number().required("Required").min(0).max(99),
  floor: Yup.number().required("Required").min(1).max(10),
  residentId: Yup.number().required("Required").min(1),
  type: Yup.string()
    .required("Required")
    .matches("^([0-9]{1})[+]([1-6]{1})$", "Type must be x+y => 9>x>1 / 6>y>1"),
  isEmpty: Yup.bool(),
});
export const insertPaymentValidations = Yup.object().shape({
  apartmentId: Yup.number().required("Required").min(1),
  payerId: Yup.number().required("Required").min(1),
  amount: Yup.number().required("Required").min(1),
  type: Yup.string().required("Required").max(50),
  isPayed: Yup.bool(),
  // paymentDate: Yup.date(),
  paymentDueDate: Yup.date().required("Required"),
});

export const loginValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});
