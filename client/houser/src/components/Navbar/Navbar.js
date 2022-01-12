import { Box, Flex, Button, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { FiUsers, FiUser } from "react-icons/fi";
import { MdOutlinePayments, MdLogout, MdApartment } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { IoIosRocket } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
import styles from "./styles.module.css";
function Navbar() {
  const { user, isLoggedIn, isAdmin, logout } = useAuth();

  return (
    <>
      <Box bg={"gray.100"} px={4} className={styles.nav}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box className={styles.hero}>
            <Button variant="Link" fontSize={"lg"} href={"#"}>
              <IoIosRocket />
              Houser{isAdmin ? " - Admin" : null}
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
                <Button variant="solid" colorScheme="gray" href={"#"}>
                  Sign In
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="solid" colorScheme="gray" href={"#"}>
                  Sign Up
                </Button>
              </Link>
            </Stack>
          )}
          {/* if user logged in */}
          {isLoggedIn && (
            <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={isAdmin ? 2 : 6}>
                {/* if user is admin */}
                {isAdmin && (
                  <>
                    <Link to="/apartments">
                      <Button variant="outline" colorScheme="black" href={"#"}>
                        <MdApartment />
                        Apartments
                      </Button>
                    </Link>
                    <Link to="/users">
                      <Button variant="outline" colorScheme="black" href={"#"}>
                        <FiUsers />
                        Users
                      </Button>
                    </Link>
                  </>
                )}
                <Link to="/payments">
                  <Button variant="outline" colorScheme="black" href={"#"}>
                    <MdOutlinePayments />
                    Payments
                  </Button>
                </Link>
                <Link to="/messages">
                  <Button variant="outline" colorScheme="black" href={"#"}>
                    <TiMessages />
                    Messages
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" colorScheme="black" mr={0} href={"#"}>
                    <FiUser />
                    {user.name.split(" ")[0]}
                  </Button>
                </Link>
                <Button colorScheme="red" variant="ghost" onClick={logout}>
                  <MdLogout style={{ fontSize: "1.5rem" }} />
                </Button>
              </Stack>
            </Flex>
          )}
        </Flex>
      </Box>
    </>
  );
}
export default Navbar;
