import React from 'react';
import { Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './FormRegister.less';
import ButtonSubmit from '~/components/buttons/ButtonSubmit';
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
function FormRegister({ role }) {
  return (
    <div className='form'>
      <h3 className='form-title'>ĐĂNG KÝ PHẦN MỀM</h3>
      <Form
        name="basic"
        labelCol={{
          span: 16,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          className='full-width'
          name="username"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập Tên đăng ký/SĐT!',
            },
          ]}
          wrapperCol={{
            span: 24,
          }}
        >
          <Input prefix={<UserOutlined />} placeholder='Tên đăng ký/SĐT' />
        </Form.Item>


        <Form.Item
          className='full-width'
          name="email"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập Email!',
            },
          ]}
          wrapperCol={{
            span: 24,
          }}
        >
          <Input prefix={<UserOutlined />} placeholder='Email' />
        </Form.Item>


        <Form.Item
          className='full-width'
          name="password"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập Mật khẩu',
            },
          ]}
          wrapperCol={{
            span: 24,
          }}
        >
          <Input.Password placeholder="Mật khẩu" prefix={<LockOutlined />} />
        </Form.Item>


        <Form.Item
          className='full-width'
          name="password"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập lại Mật khẩu',
            },
          ]}
          wrapperCol={{
            span: 24,
          }}
        >
          <Input.Password placeholder="Xác nhận mật khẩu" prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          <ButtonSubmit text='Đăng ký' />
          <div style={{
              textAlign: 'left'
            }}>
            <span>Bạn đã có tài khoản? <a href="#">Đăng nhập</a></span>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}



export default FormRegister;