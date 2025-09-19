import { DeleteTwoTone } from "@ant-design/icons";
import { message, Popconfirm } from "antd";
import { deleteAccount } from "../../../services/Api";

const PopDeleteAccount = (props) => {
  const { accountDataDetail, refreshTable } = props;
  const [messageApi, contextHolder] = message.useMessage();

  const confirm = async () => {
    console.log(accountDataDetail);
    const res = await deleteAccount(accountDataDetail.id);
    console.log(res);

    if (res?.status === 200) {
      messageApi.open({
        type: "success",
        content: "Account Deleted!",
        duration: 2,
      });
      setTimeout(() => {
        refreshTable();
      }, 1000);
    } else if (res?.status === 500) {
      messageApi.open({
        type: "error",
        content: "Internal Server Error!",
      });
    }
  };
  const cancel = () => {
    messageApi.open({
      type: "info",
      content: "Delete cancelled!",
    });
  };

  return (
    <>
      {contextHolder}
      <Popconfirm
        title={`Delete ${accountDataDetail?.username}`}
        description="Are you sure to delete this user?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <DeleteTwoTone
          twoToneColor="#ff4d4f"
          className="hover:translate-y-[-5px] hover:top-[5px] transition-all"
          style={{ cursor: "pointer", padding: "5px", fontSize: "18px" }}
        />
      </Popconfirm>
    </>
  );
};
export default PopDeleteAccount;
