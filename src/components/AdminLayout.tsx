import { ReactElement } from "react";

import Img from "next/image";
import Link from "next/link";

import styled from "styled-components";
import { Layout, Menu, Modal } from "antd";
import {
  PieChartOutlined,
  TeamOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;
const confirm = Modal.confirm;

const LogoContainer = styled.div`
  margin-top: 5px;
`;

const LogoText = styled.span`
  color: white;
  font-size: 25px;
  font-weight: bold;
  margin-left: 10px;
`;

interface Props {
  children: ReactElement;
}

export default function AdminLayout({ children }: Props): ReactElement {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", paddingLeft: 15 }}>
        <LogoContainer>
          <Img
            alt="Image of a customer"
            width={50}
            height={50}
            src="/customer.png"
          />
        </LogoContainer>
        <LogoText>Clientify</LogoText>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link href="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<TeamOutlined />}>
              <Link href="/admin/customers">Customers</Link>
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                confirm({
                  content: "Are you sure?",
                  icon: <ExclamationCircleOutlined />,
                  onOk() {
                    console.log("OK");
                  },
                  onCancel() {
                    console.log("Cancel");
                  },
                });
              }}
              danger
              key="3"
              icon={<LogoutOutlined />}
            >
              Log Out
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
