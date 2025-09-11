import {
  AppstoreOutlined,
  ExceptionOutlined,
  HeartTwoTone,
  TeamOutlined,
  UserOutlined,
  DollarCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Space, Avatar } from "antd";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Logo from "../../components/Logo";
import Logo_Icon from "../../assets/logoPage/Logo_Icon.png";

const { Content, Sider } = Layout;

const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const items = [
    {
      label: <Link to="/admin">Dashboard</Link>,
      key: "dashboard",
      icon: <AppstoreOutlined />,
    },
    {
      label: <span>Manage Accounts</span>,
      key: "account",
      icon: <UserOutlined />,
      children: [
        {
          label: <Link to="/admin/users">User Accounts</Link>,
          key: "user",
          icon: <TeamOutlined />,
        },
        {
          label: <Link to="/admin/admins">Admin Accounts</Link>,
          key: "admin",
          icon: <TeamOutlined />,
        },
      ],
    },
    {
      label: <Link to="/admin/products">Manage Products</Link>,
      key: "products",
      icon: <ExceptionOutlined />,
    },
    {
      label: <Link to="/admin/orders">Manage Orders</Link>,
      key: "orders",
      icon: <DollarCircleOutlined />,
    },
  ];

  const itemsDropdown = [
    {
      label: <Link to={"/"}>Homepage</Link>,
      key: "home",
    },
    {
      label: <label style={{ cursor: "pointer" }}>Log out</label>,
      key: "logout",
    },
  ];

  const urlAvatar = ``;

  return (
    <>
      <Layout style={{ minHeight: "100vh" }} className="layout-admin">
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            style={{
              height: 32,
              margin: 16,
              textAlign: "center",
            }}
          >
            {collapsed ? (
              <div className="pl-[7px]">
                <img srcSet={`${Logo_Icon} 2x`} alt="" />
              </div>
            ) : (
              <Logo />
            )}
          </div>
          <Menu
            defaultSelectedKeys={[activeMenu]}
            mode="inline"
            items={items}
            onClick={(e) => setActiveMenu(e.key)}
          />
        </Sider>
        <Layout>
          <div
            className="admin-header"
            style={{
              height: "50px",
              borderBottom: "1px solid #ebebeb",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 15px",
            }}
          >
            <span>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger p-2.5",
                  onClick: () => setCollapsed(!collapsed),
                }
              )}
            </span>
            <Dropdown menu={{ items: itemsDropdown }} trigger={["hover"]}>
              <Space style={{ cursor: "pointer" }}>
                <Avatar src={urlAvatar} />
                admin
              </Space>
            </Dropdown>
          </div>
          <Content style={{ padding: "15px" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminPage;
