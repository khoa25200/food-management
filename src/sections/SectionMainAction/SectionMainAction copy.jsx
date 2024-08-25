import React from 'react';
import { Button, Checkbox, message } from 'antd';
import { SwapOutlined, PrinterOutlined, ShoppingCartOutlined, ScissorOutlined } from '@ant-design/icons';
import './SectionMainAction.less';
import { useRecoilState } from 'recoil';
import { selectedTableState } from '~/states/pos.state';
import { convertVNDCurrency } from '~/utils/Helper';

const SectionMainAction = () => {
  const [selectedTable, setSelectedTable] = useRecoilState(selectedTableState);

  // Prepare the body data for API requests
  const prepareRequestBody = () => {
    const { data } = selectedTable;
    return {
      orderId: data.orderId,
      totalPrice: data.totalPrice,
      tableId: data.tableId,
      userId: data.userId,
      orderDetailRequests: data.orderDetailRequests.map(item => ({
        dishId: item.dishId,
        quantity: item.quantity,
        pricePerItem: item.pricePerItem,
        note: item.note,
      })),
    };
  };

  // Calculate total price from orderDetailRequests
  const calculateTotalAmount = () => {
    const { data } = selectedTable;
    return data?.orderDetailRequests?.reduce((total, item) =>
      total + item.pricePerItem * item.quantity,
      0
    );
  };

  // Handler for the 'Change Table' button
  const handleChangeTable = () => {
    message.info('Đang chuyển bàn...');
  };

  // Handler for the 'Split Table' button
  const handleSplitTable = () => {
    message.info('Đang tách bàn...');
  };

  // Handler for the 'Report Cooking' button
  const handlePrintCookingOrder = () => {
    message.info('Báo chế biến: Đang xử lý...');
  };

  // Handler for the 'Temporary Checkout' button
  const handleTemporaryCheckout = async () => {
    const requestBody = prepareRequestBody();
    message.info('Tạm tính đã hoàn tất');
    console.log('Temporary checkout:', { requestBody });
  };

  // Handler for the 'Checkout' button
  const handleCheckout = async () => {
    const requestBody = prepareRequestBody();
    message.info('Thanh toán đã hoàn tất');
    console.log('Checkout:', { requestBody });
  };

  // Extracting details from selectedTable
  const { data } = selectedTable;
  const customerName = data?.userId; // Replace with actual customer name if available
  const customerPhone = '0969236999'; // Replace with actual phone number if available
  const debt = '0'; // Replace with actual debt if available
  const totalAmount = convertVNDCurrency(calculateTotalAmount());

  return (
    <div className="section-main-action">
      <div className="section-main-action__header">
        <div className="customer-info">
          <span className="customer-info__name">{customerName}</span>
          <span className="customer-info__phone">{customerPhone}</span>
          <span className="customer-info__debt">Dư nợ: {debt}</span>
        </div>
        <div className="total-amount">
          <span className="total-amount__label">Tổng cộng</span>
          <span className="total-amount__value">{totalAmount}</span>
        </div>
        <div className="discount-section">
          <Checkbox className="discount-section__checkbox">Chiết khấu, VAT...</Checkbox>
        </div>
      </div>

      <div className="section-main-action__buttons">
        <Button icon={<SwapOutlined />} className="action-btn" onClick={handleChangeTable}>
          Chuyển bàn
        </Button>
        <Button icon={<ScissorOutlined />} className="action-btn" onClick={handleSplitTable}>
          Tách bàn
        </Button>
        <Button icon={<PrinterOutlined />} className="action-btn" onClick={handlePrintCookingOrder}>
          Báo chế biến [F9]
        </Button>
        <Button icon={<ShoppingCartOutlined />} className="action-btn action-btn--yellow" onClick={handleTemporaryCheckout}>
          Tạm tính [F3]
        </Button>
        <Button type="primary" danger icon={<ShoppingCartOutlined />} className="action-btn action-btn--red" onClick={handleCheckout}>
          Thanh toán [F4]
        </Button>
      </div>
    </div>
  );
};

export default SectionMainAction;
