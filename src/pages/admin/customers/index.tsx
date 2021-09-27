import { useEffect, useState } from "react";
import Head from "next/head";

import { Breadcrumb, Button, Card, Col, Layout, notification, Row } from "antd";

import CustomerFormModal from "../../../components/customers/CustomersFormModal";
import CustomersTable from "../../../components/customers/CustomersTable";
import { Customer } from "../../../components/customers/types";
import { getCustomers } from "../../../services/customers";

export default function Index() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [customers, setCustomers] = useState([]);

  const [tableIsLoading, setTableIsLoading] = useState<boolean>(false);

  const onEdit = (customer: Customer) => {
    setCustomer(customer);
    setIsModalVisible(true);
  };

  const onDelete = () => {
    //TODO: Delete a customer
  };

  useEffect(() => {
    setTableIsLoading(true);
    getCustomers()
      .then((data) => {
        setCustomers(data);
      })
      .catch(() => {
        notification.error({
          message: "Error while getting the customers",
        });
      })
      .finally(() => {
        setTableIsLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Clientify | Customers</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Clientify</Breadcrumb.Item>
        <Breadcrumb.Item>Customers</Breadcrumb.Item>
      </Breadcrumb>
      <Layout>
        <Row>
          <Col span={24}>
            <Card
              title="List of customers"
              extra={
                <Button
                  onClick={() => {
                    setIsModalVisible(true);
                  }}
                  type="primary"
                >
                  New Customer
                </Button>
              }
            >
              <CustomersTable
                customers={customers}
                loading={tableIsLoading}
                onEdit={onEdit}
                onDelete={onDelete}
              />
              <CustomerFormModal
                customer={customer}
                isModalVisible={isModalVisible}
                handleOk={(values: any) => {
                  console.log(values);
                }}
                handleCancel={() => {
                  setIsModalVisible(false);
                  setCustomer(null);
                }}
              />
            </Card>
          </Col>
        </Row>
      </Layout>
    </>
  );
}
