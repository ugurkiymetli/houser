import { useState } from "react";
import { Box, Flex, Avatar, Button, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  CalendarIcon,
  ChatIcon,
  DragHandleIcon,
  ViewIcon,
  StarIcon,
} from "@chakra-ui/icons";
function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({ name: "John Doe", isAdmin: true });
  return (
    <>
      <Box bg={"gray.100"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Button variant="Link" fontSize={"lg"} href={"#"}>
              <StarIcon mr={1} />
              Houser
            </Button>
          </Box>
          {/* if user is not logged in */}
          {!isLoggedIn && (
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={6}
            >
              <Link to="/register">
                <Button variant="solid" colorScheme="blue" href={"#"}>
                  Sign In
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="solid" colorScheme="blue" href={"#"}>
                  Sign Up
                </Button>
              </Link>
            </Stack>
          )}
          {/* if user logged in */}
          {isLoggedIn && (
            <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={user.isAdmin ? 2 : 6}>
                {/* if user is admin */}
                {user.isAdmin && (
                  <>
                    <Link to="/apartments">
                      <Button variant="outline" colorScheme="black" href={"#"}>
                        <DragHandleIcon mr={1} />
                        Apartments
                      </Button>
                    </Link>
                    <Link to="/users">
                      <Button variant="outline" colorScheme="black" href={"#"}>
                        <ViewIcon mr={1} />
                        Users
                      </Button>
                    </Link>
                  </>
                )}
                <Link to="/payments">
                  <Button variant="outline" colorScheme="black" href={"#"}>
                    <CalendarIcon mr={1} />
                    Payments
                  </Button>
                </Link>
                <Link to="/messages">
                  <Button variant="outline" colorScheme="black" href={"#"}>
                    <ChatIcon mr={1} />
                    Messages
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="outline" colorScheme="black" href={"#"}>
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                      mr={1}
                    />
                    {user.name}
                  </Button>
                </Link>
              </Stack>
            </Flex>
          )}
        </Flex>
      </Box>
    </>
  );
}
export default Navbar;
