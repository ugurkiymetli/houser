import { Heading } from "@chakra-ui/react";
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { fetchMessageList } from "../../api";
import MessageList from "../../components/Message/MessageList";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../helpers/LoadingSpinner";
import { Container } from "@chakra-ui/react";
function Message() {
  const { user } = useAuth();

  const queryClient = useQueryClient();
  const { data, error, isError, isLoading } = useQuery(
    ["messages", user.id],
    () => fetchMessageList(user.id)
  );
  const invalidateMessageQuery = () => {
    queryClient.refetchQueries("messages");
    // console.log(queryClient);
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <div>Error! : {error.message}</div>;
  }
  if (!data?.isSuccess) console.log(data?.exceptionMessage);

  return (
    <Container maxW="container.lg">
      <Heading mb="5" textAlign="center">
        Messages
      </Heading>
      <div onClick={invalidateMessageQuery}>
        <MessageList messages={data?.list} />
      </div>
    </Container>
  );
}

export default Message;
