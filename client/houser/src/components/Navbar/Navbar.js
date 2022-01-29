import { Button, Menu, Space } from "antd";
import {
  RocketOutlined,
  UserOutlined,
  AppstoreOutlined,
  MessageOutlined,
  DollarOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
function Navbar() {
  const { isAdmin, logout } = useAuth();

  return (
    <>
      <Menu mode="horizontal">
        <Space className={styles.menu} direction="horizontal">
          <Space className={styles.menuLeft}>
            <Menu.Item key="hero">
              <Button size="large" type="text" icon={<RocketOutlined />}>
                Houser{isAdmin ? " - Admin" : null}
              </Button>
            </Menu.Item>
          </Space>
          <Space className={styles.menuRight}>
            {isAdmin ? (
              <>
                <Menu.Item key="Apartments">
                  <Link to="/apartments">
                    <Button size="large" icon={<AppstoreOutlined />}>
                      Apartments{" "}
                    </Button>{" "}
                  </Link>
                </Menu.Item>
                <Menu.Item key="Users">
                  <Link to="/users">
                    <Button size="large" icon={<UserOutlined />}>
                      Users{" "}
                    </Button>{" "}
                  </Link>
                </Menu.Item>
              </>
            ) : null}
            <Menu.Item key="Payments">
              <Link to="/payments">
                <Button size="large" icon={<DollarOutlined />}>
                  Payments{" "}
                </Button>{" "}
              </Link>
            </Menu.Item>
            <Menu.Item key="Messages">
              <Link to="/messages">
                <Button size="large" icon={<MessageOutlined />}>
                  Messages{" "}
                </Button>{" "}
              </Link>
            </Menu.Item>
            <Menu.Item key="Profile">
              <Link to="/profile">
                <Button size="large" icon={<ProfileOutlined />}>
                  Profile{" "}
                </Button>{" "}
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Button
                size="large"
                danger
                onClick={logout}
                icon={<LogoutOutlined />}
              >
                Logout
              </Button>
            </Menu.Item>
          </Space>
        </Space>
      </Menu>
    </>
  );
}
export default Navbar;
