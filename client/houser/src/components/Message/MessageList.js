import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { Card } from "antd";
import { Link } from "react-router-dom";
function MessageList({ messages }) {
  const date = Date.now();

  return (
    <div>
      <ScrollableFeed forceScroll={true}>
        {messages.map((item, key) => (
          <Link to={`./${item.senderId}`} key={key}>
            <Card
              title={`Sender:${item.senderId} ${!item.isRead ? " - New" : ""}`}
              extra={`${Math.round(
                Math.abs(date - Date.parse(item.idatetime)) / 86400000
              )} Days Ago`}
              style={{ width: 300 }}
            >
              <p>{item.messageText}</p>
            </Card>
          </Link>
        ))}
      </ScrollableFeed>
    </div>
  );
}

export default MessageList;
