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

export const fetchUsers = async (pageSize = 100, pageNumber = 1) => {
  console.log({ pageSize, pageNumber });
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENPOINT}/user?pageSize=${pageSize}&pageNumber=${pageNumber}  `
  );
  return data;
};
export const deleteUser = async (id) => {
  //   console.log({ id });
  const { data } = await axios.delete(
    `${process.env.REACT_APP_BASE_ENPOINT}/user/${id}`
  );
  return data;
};
export const fetchApartments = async (pageSize = 100, pageNumber = 1) => {
  console.log({ pageSize, pageNumber });
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENPOINT}/apartment?pageSize=${pageSize}&pageNumber=${pageNumber}  `
  );
  return data;
};
export const deleteApartment = async (id) => {
  //   console.log({ id });
  const { data } = await axios.delete(
    `${process.env.REACT_APP_BASE_ENPOINT}/apartment/${id}`
  );
  return data;
};
