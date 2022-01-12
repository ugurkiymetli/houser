import axios from "axios";

axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");

export const fetchPayments = async (payerId) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/payment?payerId=${payerId}  `
  );
  return data;
};

export const fetchLogin = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/user/login`,
    input
  );
  return data;
};

export const fetchUsers = async (pageSize = 100, pageNumber = 1) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/user?pageSize=${pageSize}&pageNumber=${pageNumber}  `
  );
  return data;
};
export const fetchUserDetail = async (id) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/user/${id}`
  );
  return data;
};

export const updateUser = async (input, id) => {
  const { data } = await axios.put(
    `${process.env.REACT_APP_BASE_ENDPOINT}/user/${id}`,
    input
  );
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await axios.delete(
    `${process.env.REACT_APP_BASE_ENDPOINT}/user/${id}`
  );
  return data;
};
export const fetchApartments = async (pageSize = 100, pageNumber = 1) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/apartment?pageSize=${pageSize}&pageNumber=${pageNumber}  `
  );
  return data;
};
export const fetchApartmentDetail = async (id) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/apartment/${id}`
  );
  return data;
};

export const updateApartment = async (input, id) => {
  const { data } = await axios.put(
    `${process.env.REACT_APP_BASE_ENDPOINT}/apartment/${id}`,
    input
  );
  return data;
};

export const deleteApartment = async (id) => {
  const { data } = await axios.delete(
    `${process.env.REACT_APP_BASE_ENDPOINT}/apartment/${id}`
  );
  return data;
};

export const fetchMessageList = async (receiverId) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/message?receiverId=${receiverId}`
  );
  return data;
};
export const fetchMessageDetail = async (receiverId, senderId) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/Message/detail?receiverId=${receiverId}&senderId=${senderId}`
  );
  return data;
};

export const insertMessage = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/Message`,
    input
  );
  return data;
};
