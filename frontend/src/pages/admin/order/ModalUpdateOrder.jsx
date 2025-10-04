import {
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  theme,
  Transfer,
  Tree,
  InputNumber,
  Button,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { getCategoryWithProduct } from "../../../services/CategoryAPI";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { updateOrder } from "../../../services/OrderAPI";

const ModalUpdateOrder = (props) => {
  const {
    openModalUpdateOrder,
    setOpenModalUpdateOrder,
    orderDataDetail,
    setOrderDataDetail,
    refreshTable,
  } = props;

  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchTreeData = async () => {
      const res = await getCategoryWithProduct();

      const finalData = res.map((category) => ({
        key: `category-${category.category_name}`,
        title: category.category_name,
        children: category.products.map((product) => ({
          key: `product-${product.product_id}`,
          title: product.product_name,
          product_id: product.product_id,
          product_name: product.product_name,
          stock: product.stock,
          isLeaf: true,
        })),
      }));

      setTreeData(finalData);

      if (orderDataDetail?.order_items) {
        const orderedProductKeys = orderDataDetail.order_items.map(
          (item) => `product-${item.prod_id}`
        );
        setTargetKeys(orderedProductKeys);

        const initialQuantities = {};
        orderDataDetail.order_items.forEach((item) => {
          initialQuantities[`product-${item.prod_id}`] = item.item_quantity;
        });
        setQuantities(initialQuantities);
      }
    };

    if (openModalUpdateOrder) {
      fetchTreeData();
    }
  }, [openModalUpdateOrder, orderDataDetail]);

  useEffect(() => {
    if (orderDataDetail) {
      form.setFieldsValue({
        customer_id: orderDataDetail.customer_id,
        customer_name: orderDataDetail.customer_name,
        address: orderDataDetail.address,
        phone: orderDataDetail.phone,
        note: orderDataDetail.note,
      });

      if (orderDataDetail.order_items) {
        const orderedProductKeys = orderDataDetail.order_items.map(
          (item) => `product-${item.prod_id}`
        );
        setTargetKeys(orderedProductKeys);

        const initialQuantities = {};
        orderDataDetail.order_items.forEach((item) => {
          initialQuantities[`product-${item.prod_id}`] = item.item_quantity;
        });
        setQuantities(initialQuantities);
      }
    }
  }, [orderDataDetail]);

  const isChecked = (selectedKeys, eventKey) => selectedKeys.includes(eventKey);

  const generateTree = (treeNodes = [], checkedKeys = []) =>
    treeNodes.map(({ children, ...props }) => ({
      ...props,
      disabled: checkedKeys.includes(props.key),
      children: generateTree(children, checkedKeys),
    }));

  const handleQuantityChange = (key, value) => {
    setQuantities((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const increaseQuantity = (key, maxStock) => {
    setQuantities((prev) => ({
      ...prev,
      [key]: Math.min((prev[key] || 1) + 1, maxStock),
    }));
  };

  const decreaseQuantity = (key) => {
    setQuantities((prev) => ({
      ...prev,
      [key]: Math.max((prev[key] || 1) - 1, 1),
    }));
  };

  const TreeTransfer = ({ dataSource, targetKeys = [], ...restProps }) => {
    // eslint-disable-next-line no-unused-vars
    const { token } = theme.useToken();
    const transferDataSource = [];

    function flatten(list = []) {
      list.forEach((item) => {
        transferDataSource.push(item);
        flatten(item.children);
      });
    }

    flatten(dataSource);

    const renderTreeNodes = (nodes) =>
      nodes.map((node) => {
        const isParentNode = node.children && node.children.length > 0;

        return {
          ...node,
          checkable: !isParentNode,
          title: <span className="text-sm font-medium">{node.title}</span>,
          children: renderTreeNodes(node.children || []),
        };
      });

    const customTreeData = renderTreeNodes(dataSource);

    const findProductStock = (key) => {
      for (const category of dataSource) {
        for (const product of category.children || []) {
          if (product.key === key) {
            return product.stock;
          }
        }
      }
      return 1;
    };

    return (
      <Transfer
        {...restProps}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onSelectChange={(sourceSelectedKeys, targetSelectedKeys) => {
          setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
        }}
        dataSource={transferDataSource}
        className="tree-transfer"
        render={(item) => item.title}
        showSelectAll={false}
        listStyle={{
          width: "100%",
          height: 300,
        }}
      >
        {({ direction, onItemSelect }) => {
          if (direction === "left") {
            const checkedKeys = [...selectedKeys, ...targetKeys];
            return (
              <div className="p-3 h-[280px] overflow-auto bg-gray-50 rounded-lg">
                <Tree
                  blockNode
                  checkable
                  checkStrictly
                  defaultExpandAll
                  checkedKeys={checkedKeys}
                  treeData={generateTree(customTreeData, targetKeys)}
                  onCheck={(_, { node: { key, children } }) => {
                    if (!children || children.length === 0) {
                      onItemSelect(key, !isChecked(checkedKeys, key));
                    }
                  }}
                  onSelect={(_, { node: { key, children } }) => {
                    if (!children || children.length === 0) {
                      onItemSelect(key, !isChecked(checkedKeys, key));
                    }
                  }}
                  className="custom-tree [&_.ant-tree-node-content-wrapper]:flex [&_.ant-tree-node-content-wrapper]:items-center"
                />
              </div>
            );
          } else {
            return (
              <div className="p-3 h-[280px] overflow-auto bg-gray-50 rounded-lg">
                {targetKeys.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                    Chưa có sản phẩm nào được chọn
                  </div>
                ) : (
                  targetKeys.map((key) => {
                    const item = transferDataSource.find(
                      (data) => data.key === key
                    );
                    const stock = findProductStock(key);
                    const quantity = quantities[key] || 1;
                    const isSelected = selectedKeys.includes(key);

                    if (!item) return null;

                    return (
                      <div
                        key={key}
                        className="mb-3 border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div
                          className={`flex items-center px-4 py-3 cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-blue-50 border-l-4 border-l-blue-500"
                              : "bg-white hover:bg-gray-50"
                          }`}
                          onClick={() => {
                            onItemSelect(key, !isSelected);
                          }}
                        >
                          <div
                            className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center transition-colors ${
                              isSelected
                                ? "bg-blue-500 border-blue-500"
                                : "bg-white border-gray-300"
                            }`}
                          >
                            {isSelected && (
                              <span className="text-white text-xs font-bold">
                                ✓
                              </span>
                            )}
                          </div>
                          <span className="flex-1 font-medium text-gray-800">
                            {item.title}
                          </span>
                        </div>

                        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-100">
                          <span className="text-sm font-medium text-gray-700">
                            Quantity:
                          </span>
                          <Button
                            size="small"
                            type="primary"
                            icon={<MinusOutlined />}
                            onClick={(e) => {
                              e.stopPropagation();
                              decreaseQuantity(key);
                            }}
                            disabled={quantity <= 1}
                            className="flex items-center justify-center min-w-8 h-8"
                          />
                          <InputNumber
                            size="small"
                            min={1}
                            max={stock}
                            value={quantity}
                            onChange={(value) =>
                              handleQuantityChange(key, value)
                            }
                            className="w-20 h-8 text-center [&_.ant-input-number-input]:text-center"
                            controls={false}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <Button
                            size="small"
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={(e) => {
                              e.stopPropagation();
                              increaseQuantity(key, stock);
                            }}
                            disabled={quantity >= stock}
                            className="flex items-center justify-center min-w-8 h-8"
                          />
                          <span className="text-xs text-gray-500 ml-2 min-w-12">
                            / {stock}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            );
          }
        }}
      </Transfer>
    );
  };

  const onChange = (keys) => {
    setTargetKeys(keys);

    const newQuantities = { ...quantities };
    keys.forEach((key) => {
      if (!newQuantities[key]) {
        newQuantities[key] = 1;
      }
    });

    Object.keys(newQuantities).forEach((key) => {
      if (!keys.includes(key)) {
        delete newQuantities[key];
      }
    });

    setQuantities(newQuantities);
  };

  const onFinish = async (values) => {
    setIsSubmit(true);
    const payload = {
      customer_id: values.customer_id,
      address: values.address,
      phone: values.phone,
      note: values.note,
      order_items: targetKeys.map((key) => {
        const prod_id = parseInt(key.replace("product-", ""));
        return {
          prod_id: prod_id,
          quantity: quantities[key] || 1,
        };
      }),
    };
    const res = await updateOrder(orderDataDetail.id, payload);
    console.log(res);

    if (res?.status === 200) {
      messageApi.open({
        type: "success",
        content: "Order Updated!",
      });
      form.resetFields();
      setOrderDataDetail(null);
      setOpenModalUpdateOrder(false);
      refreshTable();
    } else if (res?.status === 500) {
      messageApi.open({
        type: "error",
        content: "Internal Server Error",
      });
    }
    setIsSubmit(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setOrderDataDetail(null);
    setTargetKeys([]);
    setTreeData([]);
    setQuantities({});
    setSelectedKeys([]);
    setOpenModalUpdateOrder(false);
  };

  return (
    <>
      {contextHolder}
      <Modal
        onOk={() => {
          form.submit();
        }}
        width={900}
        title={
          <div className="text-lg font-semibold text-gray-800">
            📦 {`${orderDataDetail?.customer_name}'s Order`}
          </div>
        }
        open={openModalUpdateOrder}
        onCancel={handleCancel}
        destroyOnHidden={true}
        okButtonProps={{
          loading: isSubmit,
          className: "bg-blue-600 hover:bg-blue-700",
        }}
        okText={"Update"}
        cancelText={"Cancel"}
        confirmLoading={isSubmit}
        maskClosable={false}
      >
        <Divider className="my-4 bg-gray-200" />
        <Form
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          form={form}
          className="space-y-4"
        >
          <Form.Item label="Customer ID" name="customer_id" className="hidden">
            <Input />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Customer Name"
                name="customer_name"
                className="mb-0"
              >
                <Input disabled={true} className="bg-gray-50" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Phone" name="phone" className="mb-0">
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Address" name="address" className="mb-0">
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Note" name="note" className="mb-0">
                <Input.TextArea rows={3} placeholder="Enter order notes..." />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label={
                  <span className="text-sm font-semibold text-gray-700">
                    🛍️ Order Items
                  </span>
                }
                name="order_items"
                className="mb-0"
              >
                <TreeTransfer
                  dataSource={treeData}
                  targetKeys={targetKeys}
                  onChange={onChange}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ModalUpdateOrder;
