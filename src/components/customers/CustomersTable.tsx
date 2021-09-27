import { Button, Popconfirm, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Customer } from "./types";

interface Props {
  onEdit: Function;
  onDelete: Function;
  loading: boolean;
  customers: Array<Customer>;
}

export default function CustomersTable({
  onEdit,
  onDelete,
  customers,
  loading,
}: Props) {
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Address Quantity",
      dataIndex: "addresses",
      key: "addresses",
      render: (record: any[]) => {
        return (
          <Tag color={"blue"} key={record.length}>
            {record.length}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Button
            onClick={() => {
              onEdit(record);
            }}
          >
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Are you sure to delete this customer?"
            onConfirm={() => {
              alert("Delete");
            }}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              onClick={() => {
                onDelete(record.id);
              }}
            >
              <DeleteOutlined type="danger" />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return <Table loading={loading} dataSource={customers} columns={columns} />;
}
