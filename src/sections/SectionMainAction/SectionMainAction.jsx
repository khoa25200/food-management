import React, { useEffect } from 'react';
import { Button, Checkbox, message } from 'antd';
import { SwapOutlined, PrinterOutlined, ShoppingCartOutlined, ScissorOutlined } from '@ant-design/icons';
import './SectionMainAction.less';
import { useRecoilState } from 'recoil';
import { selectedTableState } from '~/states/pos.state';
import { convertVNDCurrency } from '~/utils/Helper';
import { paymentOrder, tempCalculator } from '~/services/pos.service';
import { reloadPage } from '~/utils/reload';

const SectionMainAction = () => {
  const [selectedTable] = useRecoilState(selectedTableState);

  // Calculate total price from orderDetailRequests
  const calculateTotalAmount = () => {
    const { data } = selectedTable;
    return data?.orderDetailRequests?.reduce((total, item) =>
      total + item.pricePerItem * item.quantity,
      0
    );
  };

  // Prepare the body data for API requests
  const prepareRequestBody = () => {
    const { data, id } = selectedTable;
    return {
      orderId: data.orderId || 0,
      totalPrice: data.totalPrice || calculateTotalAmount() || 0,
      tableId: id,
      userId: data.userId || 2,
      orderDetailRequests: data.orderDetailRequests.map(item => ({
        id: item.id,
        dishId: item.dishId,
        dishName: item.dishName,
        quantity: item.quantity,
        image: item.image,
        pricePerItem: item.pricePerItem,
        note: item.note,
      })),
    };
  };


  // Extracting details from selectedTable
  const { data } = selectedTable;
  const customerName = data?.userId || 'Khách hàng'; // Placeholder if no userId
  const customerPhone = 'xxxxxxx'; // Placeholder if no phone number
  const debt = '0'; // Placeholder if no debt
  const totalAmount = convertVNDCurrency(calculateTotalAmount());

  // Handlers for buttons
  const handleChangeTable = () => {
    message.info('Đang chuyển bàn...');
  };

  const handleSplitTable = () => {
    message.info('Đang tách bàn...');
  };

  const handleTempCalculator = async (req) => {
    await tempCalculator(req);
    // reloadPage();
  }
  const handlePayment = async (req) => {
    await paymentOrder(req);
    // reloadPage();
  }

  const handlePrintCookingOrder = () => {
    message.info('Báo chế biến: Đang xử lý...');
  };

  const handleTemporaryCheckout = async () => {
    const requestBody = prepareRequestBody();
    message.info('Tạm tính đã hoàn tất');
    console.log('Temporary checkout:', requestBody);
    handleTempCalculator(requestBody);
    // reloadPage();
  };

  const handleCheckout = async () => {
    const requestBody = prepareRequestBody();
    message.info('Thanh toán đã hoàn tất');
    console.log('Checkout:', { requestBody });
    handlePayment(requestBody);
  };

  // Key event handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'F9':
          handlePrintCookingOrder();
          break;
        case 'F3':
          handleTemporaryCheckout();
          break;
        case 'F4':
          handleCheckout();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Determine if data exists
  const hasData = data && Object.keys(data).length > 0 && data.orderDetailRequests?.length > 0;

  return (
    <div className="section-main-action">
      {hasData ? (
        <>
          <div className="section-main-action__header">
            <div className="customer-info">
              <span className="customer-info__name"></span>
              <span className="customer-info__phone"></span>
              <span className="customer-info__debt"></span>
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
        </>
      ) : (
        <div className="section-main-action__no-data">
          <span>Không có dữ liệu để hiển thị. Vui lòng chọn bàn hoặc đơn hàng.</span>
          <div className="section-main-action__buttons">
            <Button icon={<SwapOutlined />} className="action-btn" disabled>
              Chuyển bàn
            </Button>
            <Button icon={<ScissorOutlined />} className="action-btn" disabled>
              Tách bàn
            </Button>
            <Button icon={<PrinterOutlined />} className="action-btn" disabled>
              Báo chế biến [F9]
            </Button>
            <Button icon={<ShoppingCartOutlined />} className="action-btn action-btn--yellow" disabled>
              Tạm tính [F3]
            </Button>
            <Button type="primary" danger icon={<ShoppingCartOutlined />} className="action-btn action-btn--red" disabled>
              Thanh toán [F4]
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionMainAction;
