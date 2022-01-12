import React, { useState } from "react";
import { fetchMessageDetail, fetchUserDetail, insertMessage } from "../../api";
import styles from "./styles.module.css";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import ScrollableFeed from "react-scrollable-feed";
import { Tooltip } from "@chakra-ui/react";
import moment from "moment";
import { alertError, alertSuccess } from "../../helpers/messageAlert";
import LoadingSpinner from "../../helpers/LoadingSpinner";
function MessageItem() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");

  const { senderId } = useParams();

  const queryClient = useQueryClient();
  const {
    data,
    error,
    isLoading: isMessageDetailLoading,
    isError,
  } = useQuery(["message-detail", user.id, senderId], () =>
    fetchMessageDetail(user.id, senderId)
  );
  const { data: sender, isLoading: isSenderLoading } = useQuery(
    ["sender", senderId],
    () => fetchUserDetail(senderId)
  );
  const insertMessageMutation = useMutation(insertMessage, {
    onSuccess: () => queryClient.invalidateQueries("message-detail"),
  });

  if (isMessageDetailLoading || isSenderLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <div>Error! : {error.message}</div>;
  }
  if (!data?.isSuccess) console.log(data?.exceptionMessage);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message === "" || null) {
      alertError("Message cannot be empty");
      return;
    }
    insertMessageMutation.mutate({
      messageText: message,
      senderId: user.id,
      recieverId: senderId,
    });
    // console.log(message);
    setMessage("");
    alertSuccess("Message sent!");
  };

  return (
    <>
      <div className={styles.messageList}>
        <ScrollableFeed forceScroll={true}>
          {/* {console.log(data)} */}
          {data.list
            ? data.list.map((item, key) => (
                <React.Fragment key={key}>
                  <h2
                    className={` ${
                      item.senderId === user.id ? styles.right : ""
                    }`}
                  >
                    {item.senderId === user.id ? user.name : sender.entity.name}
                  </h2>
                  <Tooltip
                    label={moment(item.idatetime).format(
                      "DDD.MMM.YYYY -  hh:mm:ss"
                    )}
                    placement="right-end"
                    size="sm"
                    openDelay={50}
                  >
                    <div
                      className={`${styles.messageItem} ${
                        item.senderId === user.id ? styles.right : ""
                      }`}
                    >
                      {item.messageText}
                    </div>
                  </Tooltip>
                </React.Fragment>
              ))
            : null}
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
