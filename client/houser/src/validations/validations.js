import * as Yup from "yup";

// export const updateApartmentValidations = Yup.object().shape({
//   block: Yup.string()
//     .required("Required")
//     .matches("^([A-Z]{1})$", "Apartment block must be A-Z."),
//   number: Yup.number().required("Required").min(0).max(99),
//   floor: Yup.number().required("Required").min(1).max(10),
//   residentId: Yup.number().min(1).nullable(),
//   type: Yup.string()
//     .required("Required")
//     .matches("^([0-9]{1})[+]([1-6]{1})$", "Type must be x+y => 9>x>1 / 6>y>1"),
//   isEmpty: Yup.bool(),
// });

export const insertApartmentValidations = Yup.object().shape({
  block: Yup.string().required("Required"),
  // .matches("^([A-Z]{1})$", "Apartment block must be A-Z."),
  number: Yup.number().required("Required").min(1).max(99),
  floor: Yup.number().required("Required").min(1).max(10),
  residentId: Yup.number().min(1).nullable(),
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
  paymentDate: Yup.date(),
  paymentDueDate: Yup.date().required("Required"),
});

export const insertUserValidations = Yup.object().shape({
  apartmentId: Yup.number().nullable(),
  name: Yup.string().required("Required").max(50),
  email: Yup.string().email().required("Required").max(50),
  phoneNum: Yup.string()
    .required("Required")
    .matches(
      "^(53)([1-9]{1})?([0-9]{3})?([0-9]{2})?([0-9]{2})$",
      "Not a valid phone number."
    ),
  identityNum: Yup.string()
    .required("Required")
    .matches("^[0-9]{11}$", "Identity number must be 11 digits."),
  carPlateNum: Yup.string()
    .matches(
      "^([0-9]{2})([A-Z]{1,3})([0-9]{2,4})$",
      "Not a valid car plate number."
    )
    .nullable(),
});

export const loginValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});
