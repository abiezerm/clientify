import {
  Col,
  Row,
  Form,
  Modal,
  Input,
  FormInstance,
  Table,
  Popconfirm,
  Button,
} from "antd";
import { ReactElement, useEffect, useMemo, useRef, useState } from "react";

import { DeleteOutlined } from "@ant-design/icons";
import { Customer } from "./types";
import NewAddressFormModal from "./NewAddressFormModal";

// Component props
interface Props {
  isModalVisible: boolean;
  handleOk: any;
  handleCancel: any;
  customer: Customer | null;
}

export default function CustomerFormModal({
  customer,
  handleOk,
  handleCancel,
  isModalVisible,
}: Props): ReactElement {
  const [addresses, setAddresses] = useState<any[]>([]);

  const formRef = useRef<FormInstance | null>(null);

  const modalTitle = useMemo(
    () => `${!customer ? "Create" : "Edit"} Customer`,
    [customer]
  );

  const onFinish = (values: any) => {
    handleOk({ ...values, addresses });
  };

  const onNewAddress = (newAddress: any) => {
    setAddresses([...addresses, newAddress]);
  };

  const onRemoveAddress = (address: any) => {
    const newAddresses = addresses.filter((item) => item.key != address.key);
    setAddresses(newAddresses);
  };

  useEffect(() => {
    if (customer) {
      formRef.current?.setFieldsValue({
        firstName: customer.firstName,
        lastName: customer.lastName,
      });

      setAddresses(customer.addresses);
    } else {
      formRef.current?.resetFields();
    }
  }, [customer]);

  const addressesTableColumns = [
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Zip",
      dataIndex: "zip",
      key: "zip",
    },
    {
      title: "Action",
      key: "actions",
      render: (record: any) => {
        return (
          <Popconfirm
            title="Are you sure to delete this address?"
            onConfirm={() => {
              onRemoveAddress(record);
            }}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <Button size="small" danger onClick={() => {}}>
              <DeleteOutlined type="danger" />
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <Modal
      title={modalTitle}
      visible={isModalVisible}
      onOk={() => {
        formRef.current?.submit();
      }}
      width={700}
      okText="Save"
      onCancel={() => {
        handleCancel();
        formRef.current?.resetFields();
      }}
    >
      <Row>
        <Col span={24}>
          <Form
            ref={formRef}
            name="customersForm"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 24 }}
            onFinish={onFinish}
            autoComplete="on"
          >
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row>
        <NewAddressFormModal onNewAddress={onNewAddress} />
        <Col span={24}>
          <Table
            size={"small"}
            key="address"
            dataSource={addresses}
            columns={addressesTableColumns}
          />
        </Col>
      </Row>
    </Modal>
  );
}
