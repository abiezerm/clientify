import { Button, Modal, Form, Input, FormInstance } from "antd";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Props {
  onNewAddress: any;
}

export default function NewAddressFormModal({ onNewAddress }: Props) {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const formRef = useRef<FormInstance | null>(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    formRef.current?.resetFields();
  };

  const onFinish = (values: any) => {
    onNewAddress({ ...values, key: uuidv4() });
    handleOk();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    formRef.current?.resetFields();
  }, [isModalVisible]);

  return (
    <>
      <Button
        style={{ marginTop: 15, marginBottom: 10 }}
        size="small"
        type="primary"
        onClick={showModal}
      >
        New Address
      </Button>
      <Modal
        title="New Address"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          ref={formRef}
          name="addressForm"
          initialValues={{}}
          labelCol={{ span: 4 }}
          labelAlign="left"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please input your city!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Zip"
            name="zip"
            rules={[{ required: true, message: "Please input your zip!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please input your country!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
