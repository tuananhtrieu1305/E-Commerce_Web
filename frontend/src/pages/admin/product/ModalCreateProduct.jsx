import { Tabs, Modal, message } from "antd";
import FormCreateOneProduct from "./FormCreateOneProduct";

const ModalCreateProduct = (props) => {
  const { openModalCreateProduct, refreshTable, setOpenModalCreateProduct } =
    props;
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <Modal
        title="Create Product(s)"
        closable={{ "aria-label": "Custom Close Button" }}
        open={openModalCreateProduct}
        width={800}
        footer={false}
        onCancel={() => setOpenModalCreateProduct(false)}
        destroyOnHidden={true}
      >
        <Tabs
          defaultActiveKey="1"
          centered
          items={Array.from({ length: 2 }).map((_, i) => {
            const id = String(i + 1);
            return id == "1"
              ? {
                  label: "Create One Product",
                  key: id,
                  children: (
                    <FormCreateOneProduct
                      refreshTable={refreshTable}
                      setOpenModalCreateProduct={setOpenModalCreateProduct}
                      messageApi={messageApi}
                    />
                  ),
                }
              : {
                  label: "Create List of Accounts",
                  key: id,
                  children: <></>,
                };
          })}
        />
      </Modal>
    </>
  );
};
export default ModalCreateProduct;
