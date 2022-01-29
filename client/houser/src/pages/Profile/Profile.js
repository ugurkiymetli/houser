import React from "react";
import { Card, Space, Typography } from "antd";
import { Heading } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import styles from "./styles.module.css";
function Profile() {
  const { user, isAdmin } = useAuth();
  const { Text, Title } = Typography;
  return (
    <>
      <Space
        direction="horizontal"
        style={{ marginTop: "10px", width: "100%", justifyContent: "center" }}
      >
        <Title level={3}>Profile</Title>
      </Space>
      <Space
        direction="horizontal"
        style={{ marginTop: "5px", width: "100%", justifyContent: "center" }}
      >
        <div className={styles.profile}>
          <Card bor level={2} title={user.name} style={{ width: 500 }}>
            <p>
              Id: <Text strong>{user.id}</Text>
            </p>
            <p>
              Role: <Text strong>{isAdmin ? "Admin" : "User"}</Text>
            </p>
            <p>
              Apartmetnt Id: <Text strong>{user.apartmentId}</Text>
            </p>
            <p>
              Email: <Text strong>{user.email}</Text>
            </p>
          </Card>
        </div>
      </Space>
    </>
  );
}

export default Profile;
