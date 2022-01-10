import { Flex, Spinner } from "@chakra-ui/react";
function LoadingSpinner() {
  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Spinner
        thickness="5px"
        speed="0.65s"
        emptyColor="gray.200"
        size="xl"
        color="red.500"
      />
    </Flex>
  );
}

export default LoadingSpinner;
