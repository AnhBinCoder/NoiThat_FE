import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Select,
  Table,
  Upload,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../../../utils/upload";
import { ToastContainer, toast } from "react-toastify";

export const ManageCategory = () => {
  const [options, setOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form] = useForm();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Category 1",
          value: "Category 1",
          children: [
            {
              text: "Yellow",
              value: "Yellow",
            },
            {
              text: "Pink",
              value: "Pink",
            },
          ],
        },
        {
          text: "Category 2",
          value: "Category 2",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.includes(value),
      width: "30%",
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // setIsModalOpen(false);
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  //   const fetchCategories = async () => {
  //     const response = await api.get("/categories");
  //     console.log(response.data);
  //     setOptions(
  //       response.data.map((item) => {
  //         return {
  //           label: item.name,
  //           value: item.id,
  //         };
  //       })
  //     );
  //   };

  const fetchCategories = async () => {
    const response = await api.get("/categories");
    console.log(response.data);
    setCategories(response.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancelImage = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChangeImage = ({ fileList: newFileList }) => {
    console.log(newFileList);
    setFileList(newFileList);
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const onSubmit = async (values) => {
    console.log(values);

    const response = await api.post("categories", {
      name: values.name,
    });
    console.log(response);
    toast.success("Successfully create new category!");
    form.resetFields();
    handleCancel();
    fetchCategories();
  };

  return (
    <div>
      <Button onClick={showModal} type="primary">
        Add
      </Button>
      <Table columns={columns} dataSource={categories} onChange={onChange} />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          onFinish={onSubmit}
          labelCol={{
            span: 24,
          }}
          form={form}
        >
          <Form.Item
            label="Category's Name"
            name={"name"}
            rules={[
              {
                required: true,
                message: "Please input category's name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancelImage}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};
