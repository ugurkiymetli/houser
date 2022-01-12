import { Heading } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { fetchMessageList } from "../../api";
import LoadingSpinner from "../../components/LoadingSpinner";
import MessageList from "../../components/Message/MessageList";
import { useAuth } from "../../context/AuthContext";
function Message() {
  const { user } = useAuth();
  const { data, error, isError, isLoading } = useQuery(
    ["messages", user.id],
    () => fetchMessageList(user.id)
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <div>Error! : {error.message}</div>;
  }
  if (!data?.isSuccess) console.log(data?.exceptionMessage);

  return (
    <div>
      <Heading>Messages</Heading>
      <br />
      <MessageList messages={data?.list} />
    </div>
  );
}

export default Message;
