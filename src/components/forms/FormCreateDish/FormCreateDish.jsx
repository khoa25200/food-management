import React, { useState } from 'react';
import { Form, Input, InputNumber, Switch, Select, Row, Col, Typography, Button } from 'antd';
import './FormCreateDish.less';
import ButtonSubmit from '~/components/buttons/ButtonSubmit';
import ButtonUploadImage from '~/components/buttons/ButtonUploadImage';

const { TextArea } = Input;
const { Title } = Typography;

function FormCreateDish({ onFinishFailed, categories, onCloseModal, createDishApi }) {
  const [form] = Form.useForm();
  const [isUploading, setUploading] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await createDishApi(values);
      setLoading(false);
      form.resetFields();
      onCloseModal();
    } catch (error) {
      console.error('Error creating dish:', error);
    }
  };

  const updateImage = async (url) => {
    form.setFieldsValue({ image: url });
  }
  const uploading = async (status) => {
    setUploading(status);
  }

  return (
    <div className="form-container">
      <Title level={2} className="form-title">Tạo Món Ăn Mới</Title>
      <Form
        form={form}
        name="createDish"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ status: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        className="create-dish-form"
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="image">
              <label>Tải ảnh sản phẩm lên:</label>
              <ButtonUploadImage getResUrl={updateImage} uploading={uploading} />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              label="Tên món"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập Tên món!' }]}
            >
              <Input placeholder='Tên món' />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: 'Vui lòng nhập Mô tả!' }]}
            >
              <TextArea placeholder='Mô tả món ăn' rows={4} />
            </Form.Item>
            <Form.Item
              label="Giá"
              name="price"
              rules={[{ required: true, message: 'Vui lòng nhập Giá!' }]}
            >
              <InputNumber
                min={0}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/(,*)/g, '')}
                placeholder='Giá'
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item
              label="Trạng thái"
              name="status"
              valuePropName="checked"
            >
              <Switch checkedChildren="Đang bán" unCheckedChildren="Ngừng bán" />
            </Form.Item>
            <Form.Item
              label="Danh mục"
              name="categoryId"
              rules={[{ required: true, message: 'Vui lòng chọn Danh mục!' }]}
            >
              <Select placeholder='Chọn Danh mục'>
                {categories?.map(category => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'center' }}>
          <ButtonSubmit text='Tạo món' disable={isUploading || isLoading} />
        </Form.Item>
      </Form>
    </div>
  );
}

export default FormCreateDish;
