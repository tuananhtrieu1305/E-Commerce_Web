import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  InputNumber,
  Image,
  Upload,
  Divider,
  Space,
  message,
} from "antd";
import { useState, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { getSeller } from "../../../services/SellerAPI";
import { getCategoryOnly } from "../../../services/CategoryAPI";

const FormCreateOneProduct = (props) => {
  let index = 0;
  const { refreshTable, setOpenModalCreateProduct, messageApi } = props;
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [form] = Form.useForm();

  const [itemsSeller, setItemsSeller] = useState([]);
  const [sellerName, setSellerName] = useState("");
  const sellerInputRef = useRef(null);

  const [itemsCate, setItemsCate] = useState([]);
  const [cateName, setCateName] = useState("");
  const cateInputRef = useRef(null);

  useEffect(() => {
    const handleGetSellerName = async () => {
      const res = await getSeller();
      setItemsSeller(res.map((item) => item.seller_name));
    };
    handleGetSellerName();
  }, []);

  useEffect(() => {
    const handleGetCateName = async () => {
      const res = await getCategoryOnly();
      setItemsCate(res.map((item) => item.cate_name));
    };
    handleGetCateName();
  }, []);

  const onSellerNameChange = (event) => {
    setSellerName(event.target.value);
  };

  const onCateNameChange = (event) => {
    setCateName(event.target.value);
  };

  const addItemSeller = (e) => {
    e.preventDefault();
    setItemsSeller([...itemsSeller, sellerName || `New item ${index++}`]);
    setSellerName("");
    setTimeout(() => {
      sellerInputRef.current?.focus();
    }, 0);
  };

  const addItemCate = (e) => {
    e.preventDefault();
    setItemsCate([...itemsCate, cateName || `New item ${index++}`]);
    setCateName("");
    setTimeout(() => {
      cateInputRef.current?.focus();
    }, 0);
  };

  const formatter = (value) => {
    const [start, end] = `${value}`.split(".") || [];
    const v = `${start}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${end ? `${v}.${end}` : `${v}`}`;
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onFinish = async (values) => {
    const base64Promises = fileList
      .filter((file) => file.originFileObj)
      .map((file) => getBase64(file.originFileObj));

    const imagesBase64 = await Promise.all(base64Promises);

    const payload = {
      ...values,
      ...(imagesBase64.length > 0 && { images: imagesBase64 }),
    };
    console.log(payload);

    // if (res?.id) {
    //   form.resetFields();
    //   setOpenModalCreateProduct(false);
    //   messageApi.open({
    //     type: "success",
    //     content: "Product Created!",
    //     duration: 2,
    //   });
    //   setTimeout(() => {
    //     refreshTable();
    //   }, 1000);
    // } else {
    //   messageApi.open({
    //     type: "error",
    //     content: "Product Created Failed!",
    //   });
    // }
  };

  return (
    <>
      <Form
        layout="vertical"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Row gutter={15}>
          <Col span={12}>
            <Form.Item
              label="Seller Name"
              name="seller_name"
              rules={[{ required: true }]}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Select a seller"
                popupRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: "8px 0" }} />
                    <Space style={{ padding: "0 8px 4px" }}>
                      <Input
                        placeholder="New seller name"
                        ref={sellerInputRef}
                        value={sellerName}
                        onChange={onSellerNameChange}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={addItemSeller}
                      >
                        Add seller
                      </Button>
                    </Space>
                  </>
                )}
                options={itemsSeller.map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Category Name"
              name="cate_name"
              rules={[{ required: true }]}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Select category"
                popupRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: "8px 0" }} />
                    <Space style={{ padding: "0 8px 4px" }}>
                      <Input
                        placeholder="New category"
                        ref={cateInputRef}
                        value={cateName}
                        onChange={onCateNameChange}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={addItemCate}
                      >
                        Add Category
                      </Button>
                    </Space>
                  </>
                )}
                options={itemsCate.map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                { required: true, message: "Please input product's title!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Product Info"
              name="product_info"
              rules={[{ required: true }]}
            >
              <Input.TextArea
                rows={3}
                placeholder="Enter product's description..."
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Price" name="price" rules={[{ required: true }]}>
              <InputNumber
                defaultValue={0}
                suffix="₫"
                style={{ width: "100%" }}
                formatter={formatter}
                parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Stock" name="stock" rules={[{ required: true }]}>
              <InputNumber
                defaultValue={0}
                style={{ width: "100%" }}
                formatter={formatter}
                parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Images"
              name="images"
              valuePropName="fileList"
              getValueFromEvent={(e) => e?.fileList}
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                onPreview={handlePreview}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label={null} className="float-end">
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default FormCreateOneProduct;
