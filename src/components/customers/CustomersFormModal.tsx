import { Col, Modal, Row } from "antd";
import { ReactElement, useEffect, useMemo } from "react";
import { Customer } from "./types";

// Component props
interface Props {
  isModalVisible: boolean;
  handleOk: any;
  handleCancel: any;
  customer: Customer;
}

export default function CustomerFormModal({
  customer,
  handleOk,
  handleCancel,
  isModalVisible,
}: Props): ReactElement {
  useEffect(() => {
    //Validate if exist a customer
    if (customer) {
      //Load data into the form
    }
  }, [customer]);

  const modalTitle = useMemo(
    () => `${(customer && "Create") || "Edit"} Customer`,
    [customer]
  );

  return (
    <Modal
      title={modalTitle}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Row>
        <Col span={24}>Form</Col>
      </Row>
    </Modal>
  );
}
