import axios from "axios";
// export const fetchProductList = async ({ pageSize = 1, pageNumber = 1 }) => {
//   const { data } = await axios.get(
//     `${process.env.REACT_APP_BASE_ENDPOINT}/user?pageSize=${pageSize}&pageNumber=${pageNumber}`
//   );
//   return data;
// };

export const fetchPayments = async (payerId) => {
  //   console.log({ payerId });
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENPOINT}/payment?payerId=${payerId}  `
  );
  return data;
};

