import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { fetchMessageList, fetchUsers } from "../../api";
import MessageList from "../../components/Message/MessageList";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../helpers/LoadingSpinner";
import { Box, Container } from "@chakra-ui/react";
import { Button, Select } from "antd";
import Title from "antd/lib/typography/Title";
import { useNavigate } from "react-router-dom";
function Message() {
  const { user } = useAuth();
  const { Option } = Select;

  const queryClient = useQueryClient();
  let navigate = useNavigate();
  const { data, error, isError, isLoading } = useQuery(["messages"], () =>
    fetchMessageList(user.id)
  );
  const { data: residents, isLoading: residentsLoading } = useQuery(
    ["residentId-selectbox"],
    () => fetchUsers(100, 1)
  );
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <div>Error! : {error.message}</div>;
  }
  if (!data?.isSuccess) console.log(data?.exceptionMessage);

  const onChange = (value) => {
    navigate(`/messages/${value}`);
  };
  return (
    <>
      <Container maxW="container.lg">
        <Container display={"flex"} alignItems={"baseline"}>
          <Box marginLeft="25%">
            <Title level={2}>Messages</Title>
          </Box>
          <Box marginLeft="30%">
            <Select
              showSearch
              placeholder="Select a person to message!"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {residents &&
                residents.list.map(
                  (item, key) =>
                    item.id !== user.id && (
                      <Option key={key} value={item.id}>
                        {item.name}
                      </Option>
                    )
                )}
            </Select>
          </Box>
        </Container>
        {residents && data && (
          <MessageList
            messages={data && data?.list}
            residents={residents && residents?.list}
          />
        )}
      </Container>
    </>
  );
}

export default Message;
