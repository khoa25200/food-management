import React from 'react';
import { Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './ForgotPassword.less';
import ButtonSubmit from '~/components/buttons/ButtonSubmit';
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
function ForgotPassword({ role }) {
  return (
    <div className='form'>
      <h3 className='form-title'>QUÊN MẬT KHẨU?</h3>
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
              message: 'Vui lòng nhập Email!',
            },
          ]}
          wrapperCol={{
            span: 24,
          }}
        >
          <Input prefix={<UserOutlined />} placeholder='Địa chỉ Email' />
        </Form.Item>


        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          <ButtonSubmit text='Đặt lại mật khẩu' />
          <div style={{
              textAlign: 'left'
            }}>
            <a href="">Quay lại Đăng nhập</a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ForgotPassword;