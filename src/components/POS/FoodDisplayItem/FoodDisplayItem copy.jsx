import React, { useState, useEffect } from 'react';
import './FoodDisplayItem.less';
import { Button, Col, Input, notification, Popconfirm, Row } from 'antd';
import { DeleteFilled, EditOutlined, MinusCircleFilled, NotificationFilled, PlusCircleFilled, RedoOutlined, UserOutlined } from '@ant-design/icons';
import { convertVNDCurrency } from '~/utils/Helper';

function FoodDisplayItem({ index, dish, isDisableRemove, handleQuantityChange }) {
  const [dishQuantity, setDishQuantity] = useState(dish?.quantity || 1);
  const [note, setNote] = useState(dish?.note || '');
  const [api, contextHolder] = notification.useNotification();

  // Sync local state with props
  useEffect(() => {
    setDishQuantity(dish?.quantity || 1);
    setNote(dish?.note || '');
  }, [dish]);

  const handleQChange = (e) => {
    const value = e.target.value;
    // Ensure the input is a number
    if (/^\d*$/.test(value)) {
      setDishQuantity(Number(value));
      handleQuantityChange(dish.dishId, Number(value));
    }
  };

  const incrementQuantity = () => {
    const newQuantity = dishQuantity + 1;
    setDishQuantity(newQuantity);
    handleQuantityChange(dish.dishId, newQuantity);
  };

  const decrementQuantity = () => {
    if (dishQuantity <= 1) {
      api.open({
        message: `Không thể giảm ${dish?.dishName} nữa`,
        description: 'Số lượng món ăn ít nhất bằng 1',
        showProgress: true
      });
      return;
    }
    const newQuantity = dishQuantity - 1;
    setDishQuantity(newQuantity);
    handleQuantityChange(dish.dishId, newQuantity);
  };

  const handleConfirm = () => {
    // Handle confirm logic here
    console.log('Note:', note, dish.dishId);
  };

  const handleDelete = () => {
    // Xử lý logic xóa tại đây
    console.log('Item has been deleted');
  };

  const handleResetField = () => {
    setDishQuantity(dish?.quantity || 1);
    setNote(dish?.note || '');
    api.open({
      message: `Đã khôi phục món ${dish?.dishName}`,
      showProgress: true
    });
  };

  return (
    <Row className={`display-section-item ${index % 2 !== 0 ? 'even-row' : ''}`}>
      {contextHolder}
      <Col span={1}>
        <Row>
          <NotificationFilled />
        </Row>
        <Row>
          <UserOutlined />
        </Row>
      </Col>

      <Col span={13}>
        <Row>
          <Col span={20}>
            <Row className='food-title'>
              {dish?.dishName}
            </Row>
            <Row>
              <Col>
                <Popconfirm
                  title={
                    <>
                      <div>Thêm ghi chú</div>
                      <Input.TextArea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={4}
                        placeholder="Nhập ghi chú của bạn..."
                      />
                    </>
                  }
                  onConfirm={handleConfirm}
                  prefixCls='popup-confirm'
                >
                  <Button
                    icon={<EditOutlined />}
                    type='link'
                    style={{ padding: 0, color: '#7e7e7e' }}
                  >
                    Ghi chú
                  </Button>
                </Popconfirm>
              </Col>
            </Row>
          </Col>
          <Col span={4} style={{ textAlign: 'center' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 40,
              height: 40,
              borderRadius: 2,
              overflow: 'hidden',
              textAlign: 'center',
            }}>
              <img src={dish?.image} alt="" height={40} style={{ borderRadius: 2 }} />
            </div>
          </Col>
        </Row>
      </Col>
      <Col span={4}>
        <Row className='quantity'>
          <Col span={5}>
            <Button className='btn-quantity' type="primary" shape="circle" icon={<MinusCircleFilled />} size='small' onClick={decrementQuantity} />
          </Col>
          <Col span={14} style={{ textAlign: 'center' }}>
            <Input
              size='small'
              style={{ width: 35, textAlign: 'center' }}
              value={dishQuantity}
              onChange={handleQChange}
            />
          </Col>
          <Col span={5}>
            <Button className='btn-quantity' type="primary" shape="circle" icon={<PlusCircleFilled />} size='small' onClick={incrementQuantity} />
          </Col>
        </Row>
      </Col>
      <Col span={2} style={{ textAlign: 'center' }}>{convertVNDCurrency(dish?.pricePerItem)}</Col>
      <Col span={2} style={{ textAlign: 'center', color: '#ac0e03', fontWeight: 'bold' }}>{convertVNDCurrency(dish?.pricePerItem * dishQuantity)}</Col>
      <Col span={1} style={{ textAlign: 'center' }}>
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa?"
          onConfirm={handleDelete}
          okText="Xóa"
          cancelText="Hủy"
          prefixCls='popup-confirm'
        >
          <Button
            icon={<DeleteFilled />}
            type='link'
            size='small'
            style={{ padding: 0 }}
            disabled={isDisableRemove}
          />
        </Popconfirm>
      </Col>
      <Col span={1} style={{ textAlign: 'center' }}>
        <Button
          icon={<RedoOutlined />}
          type='link'
          size='small'
          style={{ padding: 0 }}
          onClick={handleResetField}
          disabled={dishQuantity === dish?.quantity && note === dish?.note}
        />
      </Col>
    </Row>
  );
}

export default FoodDisplayItem;
