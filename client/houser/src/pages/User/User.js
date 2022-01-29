import React, { useState } from "react";
import { deleteUser, fetchUsers } from "../../api";
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
import { Link } from "react-router-dom";
// import { FiEdit } from "react-icons/fi";
// import { AiFillDelete } from "react-icons/ai";
// import { GoPlus } from "react-icons/go";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../helpers/LoadingSpinner";
import { alertError, alertSuccess } from "../../helpers/messageAlert";
import {
  Table,
  Typography,
  Checkbox,
  Space,
  Popconfirm,
  Button,
  Tooltip,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
function User() {
  const { isAdmin } = useAuth();
  const [params] = useState({ pageSize: 100, pageNumber: 1 });
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(
    ["users", params.pageSize, params.pageNumber],
    () => fetchUsers(params.pageSize, params.pageNumber)
  );
  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => queryClient.invalidateQueries("users"),
  });
  const deleteUserRecord = (record) => {
    deleteUserMutation.mutate(record.id, {
      onSuccess: (data) => {
        !data.isSuccess
          ? alertError(data.exceptionMessage)
          : alertSuccess(`User with id:${record.id} deleted!`);
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
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),

      render: (record) => <a href={`mailto:${record}`}>{record}</a>,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNum",
      key: "phoneNum",
      sorter: (a, b) => a.phoneNum - b.phoneNum,

      render: (record) => <a href={`tel:+90${record}`}>+90{record}</a>,
      responsive: ["md"],
    },
    {
      title: "Identity Number",
      dataIndex: "identityNum",
      key: "identityNum",
      sorter: (a, b) => a.identityNum - b.identityNum,

      responsive: ["lg"],
    },
    {
      title: "Car Plate Number",
      dataIndex: "carPlateNum",
      key: "carPlateNum",
      // sorter: (a, b) => a.carPlateNum.localeCompare(b.carPlateNum),
      render: (record) => <p>{record === null || "" ? "-" : record}</p>,
      responsive: ["lg"],
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <Space
          direction="horizontal"
          style={{ marginTop: "10px", width: "100%", justifyContent: "center" }}
        >
          {/* //edit button */}
          <Link
            to={`./${record.id}`}
            onClick={() => queryClient.invalidateQueries("users")}
          >
            <Tooltip placement="top" title="Edit user.">
              <Button
                style={{ backgroundColor: "#bae7ff" }}
                icon={<EditOutlined />}
              ></Button>
            </Tooltip>
          </Link>
          {/* //delete button */}

          <Tooltip placement="top" title="Delete user." color={"red"}>
            <div>
              <Popconfirm
                title="Are you sure to delete this user?"
                onConfirm={() => deleteUserRecord(record)}
                onCancel={() => console.log("canceled")}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  style={{ backgroundColor: "#ffa39e" }}
                  loading={deleteUserMutation.isLoading ? true : false}
                  icon={<DeleteOutlined />}
                ></Button>
              </Popconfirm>
            </div>
          </Tooltip>
        </Space>
      ),
      fixed: "right",
      width: 90,
    },
    ,
  ];
  const { Title } = Typography;

  if (!isAdmin) {
    return <Title>User is not admin!</Title>;
  }
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
        <Title level={3}>Users</Title>
        <Link to="./new">
          <Tooltip title="Add user!" placement="right">
            <Button
              icon={<PlusOutlined />}
              style={{
                marginBottom: "10px",
              }}
            />
          </Tooltip>
        </Link>
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
  );
}

export default User;
