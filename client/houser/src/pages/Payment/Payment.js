import React from "react";
import { deletePayment, fetchPayments, fetchPaymentsAdmin } from "../../api";
import { useQuery, useMutation, useQueryClient } from "react-query";
// import {
//   Button,
//   Box,
//   Flex,
//   Stack,
//   Heading,
//   Table,
//   Thead,
//   Tr,
//   Th,
//   Tbody,
//   TableCaption,
//   Tooltip,
// } from "@chakra-ui/react";

// import { FiEdit } from "react-icons/fi";
// import { AiFillDelete } from "react-icons/ai";
// import { MdPayment } from "react-icons/md";
// import { GoPlus } from "react-icons/go";

import { Link } from "react-router-dom";
import moment from "moment";
import { useAuth } from "../../context/AuthContext";
import { alertError, alertSuccess } from "../../helpers/messageAlert";
import LoadingSpinner from "../../helpers/LoadingSpinner";
import {
  Table,
  Typography,
  Checkbox,
  Space,
  Popconfirm,
  Button,
  Tooltip,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
function Payments() {
  const { user, isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(
    ["payments", user.id],
    () => (!isAdmin ? fetchPayments(user.id) : fetchPaymentsAdmin())
  );
  const deletePaymentMutation = useMutation(deletePayment, {
    onSuccess: () => queryClient.invalidateQueries("payments"),
  });
  const deletePaymentRecord = (record) => {
    deletePaymentMutation.mutate(record.id, {
      onSuccess: (data) => {
        !data.isSuccess
          ? alertError(data.exceptionMessage)
          : alertSuccess(`Payment with id:${record.id} deleted!`);
      },
    });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: {
        compare: (a, b) => a.id - b.id,
      },
      width: 80,
    },
    {
      title: "Apartment Id",
      dataIndex: "apartmentId",
      key: "apartmentId",
      render: (record) => (
        <p>{record === null || record === 0 ? "-" : record}</p>
      ),
      sorter: (a, b) => a.apartmentId - b.apartmentId,
      width: 135,
    },
    {
      title: "Payer Id",
      dataIndex: "payerId",
      key: "payerId",
      render: (record) => (
        <p>{record === null || record === 0 ? "-" : record}</p>
      ),
      sorter: (a, b) => a.payerId - b.payerId,
      width: 100,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => a.type - b.type,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (record) => <p>{record} ₺ </p>,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Due Date",
      dataIndex: "paymentDueDate",
      key: "paymentDueDate",
      render: (record) => (
        <>
          <p>{moment(record).format("DD.MM.YYYY")}</p>
        </>
      ),
      sorter: (a, b) =>
        moment(a.paymentDueDate).unix() - moment(b.paymentDueDate).unix(),
      responsive: ["lg"],
    },
    {
      title: "Payment Date",
      dataIndex: "payedDate",
      key: "payedDate",
      render: (record) => (
        <>
          <p>{record !== null ? moment(record).format("DD.MM.YYYY") : "-"}</p>
        </>
      ),
      responsive: ["lg"],
    },
    {
      title: "Created At",
      dataIndex: "idatetime",
      key: "idatetime",
      render: (record) => (
        <>
          <p>{moment(record).format("DD.MM.YYYY")}</p>
        </>
      ),
      sorter: (a, b) => moment(a.idatetime).unix() - moment(b.idatetime).unix(),
      responsive: ["lg"],
    },
    {
      title: "Paid",
      dataIndex: "isPayed",
      key: "isPayed",
      render: (record) => (
        <Checkbox checked={record} onClick={null}>
          {record ? "Paid" : "Not Paid"}
        </Checkbox>
      ),
      responsive: ["lg"],
      sorter: (a, b) => a.isPayed - b.isPayed,
    },
    {
      title: "Pay",
      render: (record) => (
        <>
          <Link
            to={
              record.isPayed || record.payerId !== user.id
                ? ""
                : `./${record.id}/pay`
            }
          >
            <Tooltip
              title={
                record.payerId !== user.id
                  ? "You can't pay other's!"
                  : record.isPayed
                  ? "Already paid!"
                  : "Pay"

                // record.isPayed
                //   ? "Already paid!"
                //   : "Pay"
                //   ? record.payerId !== user.id
                //   : "You can't pay other's!"
              }
            >
              <Button
                style={{ backgroundColor: "#b7eb8f" }}
                disabled={record.isPayed || record.payerId !== user.id}
                icon={<CreditCardOutlined />}
              ></Button>
            </Tooltip>
          </Link>
        </>
      ),
      width: 70,
    },
    isAdmin
      ? {
          title: "Action",
          dataIndex: "action",
          render: (text, record) =>
            isAdmin && (
              <Space
                direction="horizontal"
                style={{
                  marginTop: "10px",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                {/* //edit button */}
                <Link
                  to={`./${record.id}`}
                  onClick={() => queryClient.invalidateQueries("users")}
                >
                  <Tooltip
                    placement="top"
                    title={
                      record.isPayed
                        ? "You can't edit paid items!"
                        : "Edit payment."
                    }
                  >
                    <Button
                      style={{ backgroundColor: "#bae7ff" }}
                      disabled={record.isPayed}
                      icon={<EditOutlined />}
                    ></Button>
                  </Tooltip>
                </Link>
                {/* //delete button */}

                <Tooltip
                  placement="top"
                  title={
                    record.isPayed
                      ? "You can't delete paid items!"
                      : "Delete payment."
                  }
                  color={"red"}
                >
                  <div>
                    <Popconfirm
                      title="Are you sure to delete this payment?"
                      onConfirm={() => deletePaymentRecord(record)}
                      onCancel={() => console.log("canceled")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        style={{ backgroundColor: "#ffa39e" }}
                        disabled={record.isPayed}
                        loading={deletePaymentMutation.isLoading ? true : false}
                        icon={<DeleteOutlined />}
                      ></Button>
                    </Popconfirm>
                  </div>
                </Tooltip>
              </Space>
            ),
          fixed: "right",
          width: 150,
        }
      : { title: "", responsive: ["xs"], width: 1 },
    ,
  ];
  const { Title } = Typography;

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <div>Error {error.message}</div>;
  }
  if (!data.isSuccess) console.log(data.exceptionMessage);

  return (
    <>
      <Space
        direction="horizontal"
        style={{ marginTop: "10px", width: "100%", justifyContent: "center" }}
      >
        <Title>Payments</Title>
        {isAdmin && (
          <Link to="./new">
            <Tooltip title="Add Payment!" placement="right">
              <Button
                icon={<PlusOutlined />}
                style={{
                  marginBottom: "10px",
                }}
              />
            </Tooltip>
          </Link>
        )}
      </Space>

      <Table
        style={{ marginRight: "2.5%", marginLeft: "2.5%" }}
        loading={isLoading}
        dataSource={data.list}
        columns={columns}
        rowKey="id"
        scroll={{ y: "70vh" }}
        // pagination={{
        //   defaultPageSize: 20,
        //   simple: true,
        //   position: ["topRight", "bottomRight"],
        // }}
        pagination={false}
      ></Table>
    </>
    // <Box mb={2} p={6}>
    //   <Flex alignItems={"center"} justifyContent={"space-between"}>
    //     <Heading marginLeft={"40%"}>Payments</Heading>
    //     {isAdmin && (
    //       <Stack
    //         flex={{ base: 1, md: 0 }}
    //         justify={"flex-end"}
    //         direction={"row"}
    //         spacing={1}
    //       >
    //         <Link to="./new">
    //           <Tooltip label="Add Payment!" closeDelay={30} placement="left">
    //             <Button size={"sm"} direction={"row"} colorScheme="green">
    //               <GoPlus />
    //             </Button>
    //           </Tooltip>
    //         </Link>
    //       </Stack>
    //     )}
    //   </Flex>
    //   {/* CHAKRA TABLE */}

    //   <Table mt={5} variant="striped" colorScheme="black">
    //     {!data.isSuccess && (
    //       <TableCaption> Error - ({data.exceptionMessage})</TableCaption>
    //     )}
    //     <TableCaption> Payments - Total ({data.totalCount})</TableCaption>

    //     <Thead>
    //       <Tr>
    //         <Th textAlign="center">ID</Th>
    //         <Th isNumeric textAlign="center">
    //           Amount
    //         </Th>
    //         <Th textAlign="center">Type</Th>
    //         <Th textAlign="center">Payed</Th>
    //         <Th textAlign="center">Payer</Th>
    //         <Th textAlign="center">Due Date</Th>
    //         <Th textAlign="center">Payment Date</Th>
    //         <Th textAlign="center">Insert Date</Th>
    //         <Th textAlign="center">Pay</Th>
    //         {isAdmin && (
    //           <>
    //             <Th textAlign="center">Edit</Th>
    //             <Th textAlign="center">Delete</Th>
    //           </>
    //         )}
    //       </Tr>
    //     </Thead>
    //     <Tbody>
    //       {data.isSuccess &&
    //         data.list.map((item) => (
    //           <Tr key={item.id}>
    //             <Th textAlign="center">{item.id}</Th>
    //             <Th textAlign="center">{item.amount} ₺</Th>
    //             <Th textAlign="center">{item.type}</Th>
    //             <Th textAlign="center">{item.isPayed ? "✓" : "x"}</Th>
    //             <Th textAlign="center">{item.payerId}</Th>
    //             <Th textAlign="center">
    //               {moment(item.paymentDueDate).format("DD.MM.YYYY")}
    //             </Th>
    //             <Th textAlign="center">
    //               {item.payedDate === null
    //                 ? "-"
    //                 : moment(item.payedDate).format("DD.MM.YYYY hh:mm:ss")}
    //             </Th>
    //             <Th textAlign="center">
    //               {moment(item.idatetime).format("DD.MM.YYYY hh:mm:ss")}
    //             </Th>
    //             <Th>
    //               {/* {!item.isPayed && item.payerId === user.id ? ( */}
    //               <Link
    //                 to={
    //                   item.isPayed || item.payerId !== user.id
    //                     ? ""
    //                     : `./${item.id}/pay`
    //                 }
    //               >
    //                 <Tooltip
    //                   label={"Pay with credit card."}
    //                   size="sm"
    //                   openDelay={50}
    //                 >
    //                   <Button
    //                     size={"sm"}
    //                     disabled={item.isPayed || item.payerId !== user.id}
    //                     colorScheme="green"
    //                   >
    //                     <MdPayment />
    //                   </Button>
    //                 </Tooltip>
    //               </Link>
    //             </Th>
    //             {isAdmin && (
    //               <>
    //                 <Th textAlign="center">
    //                   <Link to={item.isPayed ? "" : `./${item.id}`}>
    //                     <Tooltip label="Edit payment." size="sm" openDelay={50}>
    //                       <Button
    //                         size={"sm"}
    //                         colorScheme={"blue"}
    //                         disabled={item.isPayed}
    //                       >
    //                         <FiEdit />
    //                       </Button>
    //                     </Tooltip>
    //                   </Link>
    //                 </Th>
    //                 <Th textAlign="center">
    //                   <Tooltip label="Delete payment." size="sm" openDelay={50}>
    //                     <Button
    //                       size={"sm"}
    //                       colorScheme={"red"}
    //                       disabled={
    //                         deleteMutation.isLoading
    //                           ? true
    //                           : false || item.isPayed
    //                       }
    //                       onClick={() => {
    //                         deleteMutation.mutate(item.id, {
    //                           onSuccess: (data) => {
    //                             !data.isSuccess
    //                               ? alertError(data.exceptionMessage)
    //                               : alertSuccess(
    //                                   `Payment with id:${item.id} deleted!`
    //                                 );
    //                           },
    //                         });
    //                       }}
    //                     >
    //                       <AiFillDelete />
    //                     </Button>
    //                   </Tooltip>
    //                 </Th>
    //               </>
    //             )}
    //           </Tr>
    //         ))}
    //     </Tbody>
    //   </Table>
    // </Box>
  );
}

export default Payments;
