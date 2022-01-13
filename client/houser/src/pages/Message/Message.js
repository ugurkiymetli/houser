import { Heading } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { fetchMessageList } from "../../api";
import MessageList from "../../components/Message/MessageList";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../helpers/LoadingSpinner";
import { Container } from "@chakra-ui/react";
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
    // <Box m={5} p={10}>

    <Container maxW="container.lg">
      <Heading mb="5" textAlign="center">
        Messages
      </Heading>
      <MessageList messages={data?.list} />
    </Container>
  );
}

export default Message;
