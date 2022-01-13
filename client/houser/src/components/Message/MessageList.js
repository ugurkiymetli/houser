import React from "react";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
function MessageList({ messages }) {
  const date = Date.now();
  const { user } = useAuth();
  return (
    <Row gutter={[8, 8]}>
      {messages
        ? messages.map((item, key) => (
            <Col span={24} key={key}>
              <Link
                to={`./${
                  item.senderId === user.id ? item.recieverId : item.senderId
                }`}
                key={key}
              >
                <Card
                  bordered={true}
                  hoverable={true}
                  title={`Sender:${item.senderId} ${
                    !item.isRead ? " - New" : ""
                  }`}
                  extra={`
                  ${
                    Math.round(
                      Math.abs(date - Date.parse(item.idatetime)) / 86400000
                    ) <= 0
                      ? `Today`
                      : ` ${Math.round(
                          Math.abs(date - Date.parse(item.idatetime)) / 86400000
                        )} Days Ago`
                  }
                  `}
                  style={{ width: 300 }}
                >
                  <p>{item.messageText}</p>
                </Card>
              </Link>
            </Col>
          ))
        : "No message is found"}
    </Row>
  );
}
export default MessageList;
