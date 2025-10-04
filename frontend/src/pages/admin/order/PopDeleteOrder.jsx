import { DeleteTwoTone } from "@ant-design/icons";
import { message, Popconfirm } from "antd";
import { deleteOrder } from "../../../services/OrderAPI";

const PopDeleteOrder = (props) => {
  const { orderDataDetail, refreshTable } = props;
  const [messageApi, contextHolder] = message.useMessage();

  const confirm = async () => {
    console.log(orderDataDetail);
    const res = await deleteOrder(orderDataDetail.id);
    console.log(res);

    if (res?.status === 200) {
      messageApi.open({
        type: "success",
        content: "Order Deleted!",
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
        title={`Delete ${orderDataDetail?.customer_name}'s Order`}
        description="Are you sure to delete this order?"
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
export default PopDeleteOrder;
