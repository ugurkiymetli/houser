import React from "react";
import { List, Card, Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Box, Container } from "@chakra-ui/react";
function MessageList({ messages }) {
  const date = Date.now();
  const { user } = useAuth();

  return (
    <Container maxW="container.md">
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
                  title={`Sender User ID : ${item.senderId}`}
                  description={item.messageText}
                />
                <Box mr={2}>
                  <Typography.Text disabled>
                    {Math.round(
                      Math.abs(date - Date.parse(item.idatetime)) / 86400000
                    ) <= 0
                      ? `Today`
                      : ` ${Math.round(
                          Math.abs(date - Date.parse(item.idatetime)) / 86400000
                        )} Days Ago`}{" "}
                  </Typography.Text>
                </Box>
                {!item.isRead && <Typography.Text mark>[NEW]</Typography.Text>}
              </List.Item>
            </Link>
          </Box>
        )}
      />
    </Container>
    // <Row gutter={[8, 8]}>
    //   {messages
    //     ? messages.map((item, key) => (
    //         <Col span={24} key={key}>
    //           <Link
    //             to={`./${
    //               item.senderId === user.id ? item.recieverId : item.senderId
    //             }`}
    //             key={key}
    //           >
    //             <Card
    //               bordered={!item.isRead}
    //               // style={`${!item.isRead ? "border: 2px solid black" : null} `}
    //               // style={!item.isRead ? { border: "2px solid black" } : null}
    //               style={{ border: "2px solid black" }}
    //               hoverable={true}
    //               title={`Sender:${item.senderId} ${
    //                 !item.isRead ? " - New" : ""
    //               }`}
    //               extra={`
    //               ${
    //                 Math.round(
    //                   Math.abs(date - Date.parse(item.idatetime)) / 86400000
    //                 ) <= 0
    //                   ? `Today`
    //                   : ` ${Math.round(
    //                       Math.abs(date - Date.parse(item.idatetime)) / 86400000
    //                     )} Days Ago`
    //               }
    //               `}
    //               style={{ width: 300 }}
    //             >
    //               <p>{item.messageText}</p>
    //             </Card>
    //           </Link>
    //         </Col>
    //       ))
    //     : "No message is found"}
    // </Row>
  );
}
export default MessageList;
