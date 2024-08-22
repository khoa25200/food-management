import React from 'react';
import { Form, Input, InputNumber, Switch, Select } from 'antd';
import './FormCreateDish.less';
import ButtonSubmit from '~/components/buttons/ButtonSubmit';

const { TextArea } = Input;

function FormCreateDish({ onFinish, onFinishFailed, categories }) {
  return (
    <Form
      name="createDish"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ status: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
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
        <TextArea placeholder='Mô tả món ăn' />
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
        label="Hình ảnh"
        name="image"
        rules={[{ required: true, message: 'Vui lòng nhập URL Hình ảnh!' }]}
      >
        <Input placeholder='URL Hình ảnh' />
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

      <Form.Item wrapperCol={{ span: 24 }}>
        <ButtonSubmit text='Tạo món' />
      </Form.Item>
    </Form>
  );
}

export default FormCreateDish;
