import { EditTwoTone, PlusOutlined } from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import { Button } from "antd";
import { useRef, useState } from "react";
import { getAccount } from "../../../services/AccountAPI";
import ModalViewDetailAccount from "./ModalViewDetailAccount";
import ModalUpdateAccount from "./ModalUpdateAccount";
import PopDeleteAccount from "./PopDeleteAccount";
import ModalCreateAccount from "./ModalCreateAccount";

const UserTable = () => {
  const actionRef = useRef();
  const [openAccountDetail, setOpenAccountDetail] = useState(false);
  const [accountDataDetail, setAccountDataDetail] = useState(null);
  const [openAccountUpdate, setOpenAccountUpdate] = useState(false);
  const [openAccountCreate, setOpenAccountCreate] = useState(false);

  const waitTimePromise = async (time = 20) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  const waitTime = async (time = 20) => {
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
        return (
          <a
            onClick={() => {
              setOpenAccountDetail(true);
              setAccountDataDetail(entity);
            }}
            href="#"
          >
            {entity.username}
          </a>
        );
      },
    },
    {
      title: "FULL NAME",
      dataIndex: ["profile", "fullname"],
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
      hideInSearch: true,
    },
    {
      title: "CREATED AT",
      dataIndex: "created_at",
      valueType: "dateRange",
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
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
              onClick={() => {
                setOpenAccountUpdate(true);
                setAccountDataDetail(entity);
              }}
            />
            <PopDeleteAccount
              accountDataDetail={entity}
              refreshTable={refreshTable}
            />
          </>
        );
      },
    },
  ];
  const refreshTable = () => {
    actionRef.current?.reload();
  };

  return (
    <>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered
        // eslint-disable-next-line no-unused-vars
        request={async (params, sort, filter) => {
          let query = "?role=USER";
          if (params?.email) {
            query += `&email=${params.email}`;
          }
          if (params?.username) {
            query += `&username=${params.username}`;
          }
          if (params?.profile?.fullname) {
            query += `&fullname=${params.profile.fullname}`;
          }
          if (params?.startTime) {
            query += `&startTime=${params.startTime}`;
          }
          if (params?.endTime) {
            query += `&endTime=${params.endTime}`;
          }

          const res = await getAccount(query);
          await waitTime(80);
          return {
            data: res.data,
            page: 1,
            success: true,
            // "total": 30
          };
        }}
        rowKey="id"
        pagination={{
          pageSize: 8,
          onChange: (page) => console.log(page),
        }}
        headerTitle="USER ACCOUNTS"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenAccountCreate(true);
            }}
            type="primary"
          >
            Create
          </Button>,
        ]}
      />

      <ModalViewDetailAccount
        openAccountDetail={openAccountDetail}
        accountDataDetail={accountDataDetail}
        setOpenAccountDetail={setOpenAccountDetail}
      />

      <ModalUpdateAccount
        openAccountUpdate={openAccountUpdate}
        setOpenAccountUpdate={setOpenAccountUpdate}
        accountDataDetail={accountDataDetail}
        setAccountDataDetail={setAccountDataDetail}
        refreshTable={refreshTable}
      />

      <ModalCreateAccount
        openAccountCreate={openAccountCreate}
        setOpenAccountCreate={setOpenAccountCreate}
        refreshTable={refreshTable}
        role={"USER"}
      />
    </>
  );
};

export default UserTable;
