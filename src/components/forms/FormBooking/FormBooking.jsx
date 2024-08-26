import React from 'react';
import { Form, Input, Button, DatePicker, InputNumber, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './FormBooking.less';
import { createBooking } from '~/services/booking.service';

const FormBooking = ({ role }) => {
  const [form] = Form.useForm(); // Lấy instance của form
  const navigate = useNavigate();


  const handleUserBooking = async (data) => {
    try {
      await createBooking(data);
      message.success('Đặt hẹn thành công!'); // Hiển thị thông báo thành công
      form.resetFields(); // Reset form sau khi thành công
      navigate('/menu'); // Điều hướng đến trang menu
    } catch (error) {
      message.error('Có lỗi xảy ra. Vui lòng thử lại!'); // Hiển thị thông báo lỗi
    }
  };

  const onFinish = (values) => {
    const payload = {
      id: 0,
      customerName: values.customerName,
      customerAddress: values.customerAddress,
      bookingTime: values.bookingTime.toISOString(),
      phoneNumber: values.phoneNumber,
      seat: values.seat,
      status: 0,
      userId: 0
    };

    handleUserBooking(payload);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="form">
      <h3 className="form-title">Gửi thông tin đặt hẹn cho chúng tôi</h3>
      <div>Chúng tôi sẽ phản hồi sớm cho bạn</div>
      <Form
        form={form}
        name="booking"
        labelCol={{
          span: 0, // Ẩn toàn bộ label
        }}
        wrapperCol={{
          span: 24, // Điều chỉnh chiều rộng của input để chiếm toàn bộ không gian
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="customerName"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên khách hàng!',
            },
          ]}
        >
          <Input placeholder="Tên khách hàng" />
        </Form.Item>

        <Form.Item
          name="customerAddress"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập địa chỉ!',
            },
          ]}
        >
          <Input placeholder="Địa chỉ khách hàng" />
        </Form.Item>

        <Form.Item
          name="bookingTime"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn thời gian đặt chỗ!',
            },
          ]}
        >
          <DatePicker
            showTime
            placeholder="Chọn thời gian"
            format="YYYY-MM-DD HH:mm:ss"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập số điện thoại!',
            },
            {
              pattern: /^\+?\d{10,14}$/,
              message: 'Số điện thoại không hợp lệ!',
            },
          ]}
        >
          <Input placeholder="Số điện thoại" />
        </Form.Item>

        <Form.Item
          name="seat"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập số ghế!',
            },
          ]}
        >
          <InputNumber min={1} placeholder="Số ghế" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit" block>
            Gửi Đặt Hẹn
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormBooking;
