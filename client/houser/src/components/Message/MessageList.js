import React from "react";
import { List, Typography } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Box, Container } from "@chakra-ui/react";
function MessageList({ messages, residents }) {
  const date = Date.now();
  const { user } = useAuth();
  return (
    <Container maxW="container.md">
      {messages && residents && (
        <List
          itemLayout="horizontal"
          bordered
          dataSource={messages}
          renderItem={(item) => (
            <Box borderBottom="2px" borderBottomColor="#d9d9d9">
              <Link
                to={`./${
                  item.senderId === user.id ? item.recieverId : item.senderId
                }`}
              >
                <List.Item>
                  <List.Item.Meta
                    title={
                      residents &&
                      residents.find(
                        (resident) => resident.id === item.senderId
                      )["name"]
                    }
                    description={item.messageText}
                  />
                  <Box mr={2}>
                    <Typography.Text underline>
                      {Math.round(
                        Math.abs(date - Date.parse(item.idatetime)) / 86400000
                      ) <= 0
                        ? `Today`
                        : ` ${Math.round(
                            Math.abs(date - Date.parse(item.idatetime)) /
                              86400000
                          )} Days Ago`}{" "}
                    </Typography.Text>
                  </Box>
                  {!item.isRead && (
                    <Typography.Text mark>[NEW]</Typography.Text>
                  )}
                </List.Item>
              </Link>
            </Box>
          )}
        />
      )}
    </Container>
  );
}
export default MessageList;
