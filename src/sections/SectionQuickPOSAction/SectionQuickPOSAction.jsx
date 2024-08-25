import React, { useState, useEffect } from 'react';
import { Button, Space, Modal, message, DatePicker, Table } from 'antd';
import { MobileOutlined, MailOutlined, BellOutlined, EnvironmentOutlined, HistoryOutlined } from '@ant-design/icons';
import './SectionQuickPOSAction.less';
import { getInvoicesByRange } from '~/services/invoice.service';

const { RangePicker } = DatePicker;

function SectionQuickPOSAction() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedRange, setSelectedRange] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    if (isModalVisible && invoices.length > 0) {
      setModalContent(
        <div>
          <RangePicker onChange={handleRangeChange} format="YYYY-MM-DD" disabledDate={disabledDate} />
          <Table dataSource={invoices} columns={columns} rowKey="id" style={{ marginTop: 16 }} />
        </div>
      );
    } else if (isModalVisible) {
      setModalContent(
        <div>
          <RangePicker onChange={handleRangeChange} format="YYYY-MM-DD" disabledDate={disabledDate} />
        </div>
      );
    }
  }, [isModalVisible, invoices]);

  const showModal = (content) => {
    if (content === 'Chọn khoảng thời gian để xem lịch sử') {
      setIsModalVisible(true);
      // Trigger data fetch when the modal is shown
    } else {
      setModalContent(content);
      setIsModalVisible(true);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDevelopmentClick = () => {
    message.info('Chức năng này đang được phát triển');
  };

  const handleGetInvoices = async (start, end) => {
    try {
      const invoices = await getInvoicesByRange(start, end);
      setInvoices(invoices);
    } catch (error) {
      message.error('Lỗi khi lấy dữ liệu hóa đơn');
    }
  };

  const handleRangeChange = (dates, dateStrings) => {
    setSelectedRange(dates);
    // Gọi API với khoảng thời gian đã chọn
    handleGetInvoices(dateStrings[0], dateStrings[1]);
  };

  const disabledDate = (current) => {
    // Không cho phép chọn ngày trong tương lai
    return current && current > new Date();
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Ngày',
      dataIndex: 'invoiceDate',
      key: 'invoiceDate',
    },
    {
      title: 'Tổng cộng',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (text) => <span>{text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>,
    },
  ];

  return (
    <div className="section-quick-pos-action">
      <Space split={<span className="separator" />}>
        <Button className='btn' type='link' icon={<MobileOutlined />} onClick={handleDevelopmentClick} />
        <Button className='btn' type='link' icon={<MailOutlined />} onClick={handleDevelopmentClick} />
        <Button className='btn' type='link' icon={<BellOutlined />} onClick={handleDevelopmentClick} />
        <Button className='btn' type='link' icon={<EnvironmentOutlined />} onClick={handleDevelopmentClick} />
        <Button className='btn' type='link' icon={<HistoryOutlined />} onClick={() => showModal('Chọn khoảng thời gian để xem lịch sử')} />
      </Space>
      <Modal title="Thông tin" open={isModalVisible} onCancel={handleCancel} footer={null}>
        {modalContent}
        <Button onClick={handleCancel} style={{ marginTop: 16 }}>Cancel</Button>
      </Modal>
    </div>
  );
}

export default SectionQuickPOSAction;
