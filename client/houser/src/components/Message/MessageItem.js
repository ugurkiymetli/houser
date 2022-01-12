import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchMessageDetail, fetchUserDetail, insertMessage } from "../../api";
import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import LoadingSpinner from "../LoadingSpinner";
import ScrollableFeed from "react-scrollable-feed";
import { message as messageAlert } from "antd";
import { Tooltip } from "@chakra-ui/react";
import moment from "moment";
function MessageItem() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");

  const { senderId } = useParams();

  const queryClient = useQueryClient();
  const { data, error, isLoading, isError } = useQuery(["message-detail"], () =>
    fetchMessageDetail(user.id, senderId)
  );
  const { data: sender } = useQuery(["sender", senderId], () =>
    fetchUserDetail(senderId)
  );
  const insertMessageMutation = useMutation(insertMessage, {
    onSuccess: () => queryClient.invalidateQueries("message-detail"),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <div>Error! : {error.message}</div>;
  }
  if (!data?.isSuccess) console.log(data?.exceptionMessage);

  const submitError = (errorMessage) => {
    messageAlert.error(errorMessage);
  };
  const submitSuccess = (successMessage) => {
    messageAlert.success(successMessage);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message == "" || null) {
      submitError("Message cannot be empty");
      return;
    }
    insertMessageMutation.mutate({
      messageText: message,
      senderId: user.id,
      recieverId: senderId,
    });
    console.log(message);
    setMessage("");
    submitSuccess("Message sent!");
  };

  return (
    <>
      <div className={styles.messageList}>
        <ScrollableFeed forceScroll={true}>
          {data.list.map((item, key) => (
            <>
              <h2
                className={` ${item.senderId === user.id ? styles.right : ""}`}
              >
                {item.senderId === user.id ? user.name : sender.entity.name}
              </h2>
              <Tooltip
                label={moment(item.idatetime).format("DD.MM.YYYY -  hh:mm:ss")}
                placement="right-end"
                size="sm"
                openDelay={50}
              >
                <div
                  key={key}
                  className={`${styles.messageItem} ${
                    item.senderId === user.id ? styles.right : ""
                  }`}
                >
                  {item.messageText}
                </div>
              </Tooltip>
            </>
          ))}
        </ScrollableFeed>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.textInput}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message!"
        />
      </form>
    </>
  );
}

export default MessageItem;
