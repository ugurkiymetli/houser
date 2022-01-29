import React, { useState } from "react";
import { fetchApartments, deleteApartment } from "../../api";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { alertSuccess, alertError } from "../../helpers/messageAlert";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
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
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
function Apartment() {
  const { isAdmin } = useAuth();
  const [params] = useState({ pageSize: 100, pageNumber: 1 });
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(
    ["apartments", params.pageSize, params.pageNumber],
    () => fetchApartments(params.pageSize, params.pageNumber)
  );
  const deleteApartmentMutation = useMutation(deleteApartment, {
    onSuccess: () => queryClient.invalidateQueries("apartments"),
  });

  const deleteApartmentRecord = (record) => {
    deleteApartmentMutation.mutate(record.id, {
      onSuccess: (data) => {
        !data.isSuccess
          ? alertError(data.exceptionMessage)
          : alertSuccess(`Apartment with id:${record.id} deleted!`);
      },
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Block",
      dataIndex: "block",
      key: "block",
      sorter: (a, b) => a.block.localeCompare(b.block),
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: "Floor",
      dataIndex: "floor",
      key: "floor",
      sorter: (a, b) => a.floor - b.floor,
    },
    {
      title: "Resident Id",
      dataIndex: "residentId",
      key: "residentId",
      render: (record) => (
        <p>{record === null || record === 0 ? "-" : record}</p>
      ),
      sorter: (a, b) => a.residentId - b.residentId,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => a.type.localeCompare(b.type),
      responsive: ["lg"],
    },
    {
      title: "Is Empty",
      dataIndex: "isEmpty",
      key: "isEmpty",
      render: (record) => (
        <Checkbox checked={!record} onClick={null}>
          {record ? "Empty" : "Occupied"}
        </Checkbox>
      ),
      responsive: ["lg"],
      sorter: (a, b) => a.isEmpty - b.isEmpty,
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
            onClick={() => queryClient.invalidateQueries("apartments")}
          >
            <Tooltip placement="top" title="Edit apartment.">
              <Button
                style={{ backgroundColor: "#bae7ff" }}
                icon={<EditOutlined />}
              ></Button>
            </Tooltip>
          </Link>
          {/* //delete button */}

          <Tooltip placement="top" title="Delete apartment." color={"red"}>
            <div>
              <Popconfirm
                title="Are you sure to delete this apartment?"
                onConfirm={() => deleteApartmentRecord(record)}
                onCancel={() => console.log("canceled")}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  style={{ backgroundColor: "#ffa39e" }}
                  loading={deleteApartmentMutation.isLoading ? true : false}
                  icon={<DeleteOutlined />}
                ></Button>
              </Popconfirm>
            </div>
          </Tooltip>
        </Space>
      ),
      fixed: "right",
    },
    ,
  ];
  const { Title } = Typography;

  if (!isAdmin) return <Title>User is not admin!</Title>;
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return (
      <div>
        Error {error.message} - {data}
      </div>
    );
  }
  if (!data.isSuccess) alertError(data.exceptionMessage);
  return (
    <>
      <Space
        direction="horizontal"
        style={{ marginTop: "10px", width: "100%", justifyContent: "center" }}
      >
        <Title level={3}>Apartments</Title>
        <Link to="./new">
          <Tooltip title="Add Apartment!" placement="right">
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

export default Apartment;
