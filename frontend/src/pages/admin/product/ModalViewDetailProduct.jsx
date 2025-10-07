import { Modal, Divider } from "antd";
import ProductTab from "./ProductTab";

const ModalViewDetailProduct = (props) => {
  const { openModalViewDetail, productDataDetail, setOpenModalViewDetail } =
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
        title={`${productDataDetail?.title}'s Detail`}
        open={openModalViewDetail}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Divider className="bg-gray-300" />
        <ProductTab productDataDetail={productDataDetail} />
      </Modal>
    </>
  );
};
export default ModalViewDetailProduct;
