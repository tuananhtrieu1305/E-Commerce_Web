import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import { ProTable, TableDropdown } from "@ant-design/pro-components";
import { Button, Space, Tag } from "antd";
import { useRef } from "react";
import { FAKE_DATA } from "./TableData";

const waitTimePromise = async (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const waitTime = async (time = 100) => {
  await waitTimePromise(time);
};

const columns = [
  {
    title: "USERNAME",
    dataIndex: "username",
    copyable: true,
    ellipsis: true,
    // eslint-disable-next-line no-unused-vars
    render(dom, entity, index, action, schema) {
      return <a href="#">{entity.username}</a>;
    },
  },
  {
    title: "FULL NAME",
    dataIndex: "fullname",
    filters: true,
    onFilter: true,
    ellipsis: true,
  },
  {
    title: "EMAIL",
    dataIndex: "email",
    search: true,
    copyable: true,
  },
  {
    title: "CREATED AT",
    key: "showTime",
    dataIndex: "created_at",
    valueType: "date",
    sorter: true,
  },
  {
    title: "ACTION",
    hideInSearch: true,
    // eslint-disable-next-line no-unused-vars
    render(dom, entity, index, action, schema) {
      return (
        <>
          <EditTwoTone
            twoToneColor="#f57800"
            style={{
              cursor: "pointer",
              marginRight: 15,
              padding: "5px",
              fontSize: "18px",
            }}
            className="hover:translate-y-[-5px] hover:top-[5px] transition-all"
          />
          <DeleteTwoTone
            twoToneColor="#ff4d4f"
            className="hover:translate-y-[-5px] hover:top-[5px] transition-all"
            style={{ cursor: "pointer", padding: "5px", fontSize: "18px" }}
          />
        </>
      );
    },
  },
];

const UserTable = () => {
  const actionRef = useRef();
  return (
    <>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          console.log(sort, filter);
          await waitTime(2000);
          // const data = await (await fetch('https://proapi.azurewebsites.net/github/issues')).json()
          return {
            // data: data.data,
            data: FAKE_DATA,
            page: 1,
            success: true,
            // "total": 30
          };
        }}
        editable={{
          type: "multiple",
        }}
        columnsState={{
          persistenceKey: "pro-table-singe-demos",
          persistenceType: "localStorage",
          defaultValue: {
            option: { fixed: "right", disable: true },
          },
          onChange(value) {
            console.log("value: ", value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: "auto",
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          syncToUrl: (values, type) => {
            if (type === "get") {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="Table user"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              actionRef.current?.reload();
            }}
            type="primary"
          >
            Add new
          </Button>,
        ]}
      />
    </>
  );
};

export default UserTable;
