import { Modal, Tabs, Divider } from "antd";
import OrderTab from "./OrderTab";
import ItemTab from "./ItemTab";

const ModalViewDetailOrder = (props) => {
  const { openModalViewDetail, orderDataDetail, setOpenModalViewDetail } =
    props;

  const handleOk = () => {
    setOpenModalViewDetail(false);
  };
  const handleCancel = () => {
    setOpenModalViewDetail(false);
  };

  return (
    <>
      <Modal
        width={1000}
        title={`${orderDataDetail?.customer_name}'s Order`}
        open={openModalViewDetail}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Divider className="bg-gray-300" />
        <OrderTab orderDataDetail={orderDataDetail} />
      </Modal>
    </>
  );
};

export default ModalViewDetailOrder;
