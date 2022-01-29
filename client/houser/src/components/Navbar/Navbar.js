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
      <Space className={styles.menu} direction="horizontal">
        <Space className={styles.menuLeft}>
          <Button size="large" type="text" icon={<RocketOutlined />}>
            Houser{isAdmin ? " - Admin" : null}
          </Button>
        </Space>
        <Space className={styles.menuRight}>
          <Menu mode="horizontal" disabledOverflow={false}>
            {isAdmin ? (
              <>
                <Menu.Item key="apartments">
                  <Link to="/apartments">
                    <Button
                      size="large"
                      type="text"
                      icon={<AppstoreOutlined />}
                    >
                      Apartments
                    </Button>
                  </Link>
                </Menu.Item>
                <Menu.Item key="users">
                  <Link to="/users">
                    <Button size="large" type="text" icon={<UserOutlined />}>
                      Users
                    </Button>
                  </Link>
                </Menu.Item>
              </>
            ) : null}
            <Menu.Item key="payments">
              <Link to="/payments">
                <Button size="large" type="text" icon={<DollarOutlined />}>
                  Payments
                </Button>
              </Link>
            </Menu.Item>
            <Menu.Item key="messages">
              <Link to="/messages">
                <Button size="large" type="text" icon={<MessageOutlined />}>
                  Messages
                </Button>
              </Link>
            </Menu.Item>
            <Menu.Item key="profile">
              <Link to="/profile">
                <Button size="large" type="text" icon={<ProfileOutlined />}>
                  Profile
                </Button>
              </Link>
            </Menu.Item>
            <Menu.Item key="logout">
              <Button
                size="large"
                type="text"
                danger
                onClick={logout}
                icon={<LogoutOutlined />}
              ></Button>
            </Menu.Item>
          </Menu>
        </Space>
      </Space>
    </>
  );
}
export default Navbar;
