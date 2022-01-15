import React, { useState } from "react";
import { fetchMessageDetail, fetchUserDetail, insertMessage } from "../../api";
import styles from "./styles.module.css";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import ScrollableFeed from "react-scrollable-feed";
import {
  Container,
  Tooltip,
  InputGroup,
  InputRightAddon,
  Input,
  Text,
  Box,
} from "@chakra-ui/react";

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
  } = useQuery(["message-detail"], () => fetchMessageDetail(user.id, senderId));
  const { data: sender, isLoading: isSenderLoading } = useQuery(
    ["sender", senderId],
    () => fetchUserDetail(senderId)
  );
  const insertMessageMutation = useMutation(insertMessage, {
    onSuccess: () => {
      queryClient.invalidateQueries("message-detail");
      queryClient.invalidateQueries("messages");
      queryClient.refetchQueries("message-detail");
      queryClient.refetchQueries("messages");
    },
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
    setMessage("");
    alertSuccess("Message sent!");
    queryClient.refetchQueries("messages");
  };

  return (
    <Container maxW="container.lg">
      <Box mb={"0px"}>
        <Text fontSize="3xl" textAlign={"center"}>
          {sender.entity.name}
        </Text>
      </Box>
      <div className={styles.messageList}>
        <ScrollableFeed forceScroll={true}>
          {data.list
            ? data.list.map((item, key) => (
                <React.Fragment key={key}>
                  <h2
                    className={` ${
                      item.senderId === user.id ? styles.right : ""
                    }`}
                  >
                    {item.senderId === user.id
                      ? user.name.split(" ")[0]
                      : sender.entity.name.split(" ")[0]}
                  </h2>
                  <Tooltip
                    label={moment(item.idatetime).format(
                      "DDD.MMM.YYYY -  hh:mm:ss"
                    )}
                    placement="right"
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
        <InputGroup>
          <Tooltip
            label="Press enter to send message!"
            defaultIsOpen
            closeDelay={30}
            placement="bottom-start"
          >
            <Input
              // className={styles.textInput}
              borderColor={"#ddd"}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message!"
            />
          </Tooltip>
          <InputRightAddon
            borderColor={"#ddd"}
            children={
              <Tooltip label="Send message." size="sm" openDelay={50}>
                <Text as="button" onClick={handleSubmit}>
                  Send!
                </Text>
              </Tooltip>
            }
          />
        </InputGroup>
      </form>
    </Container>
  );
}

export default MessageItem;
