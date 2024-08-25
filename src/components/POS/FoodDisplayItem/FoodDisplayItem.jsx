import React, { useState, useEffect } from 'react';
import './FoodDisplayItem.less';
import { Button, Col, Input, message, notification, Popconfirm, Row } from 'antd';
import { DeleteFilled, EditOutlined, MinusCircleFilled, NotificationFilled, PlusCircleFilled, UserOutlined } from '@ant-design/icons';
import { convertVNDCurrency } from '~/utils/Helper';
import { deleteOrderDetail } from '~/services/pos.service';

function FoodDisplayItem({ index, dish, isDeleteApi, handleQuantityChange, handleNoteChange, handleDeleteDish, handleResetDish }) {
  const [dishQuantity, setDishQuantity] = useState(dish?.quantity || 1);
  const [note, setNote] = useState(dish?.note || '');
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    setDishQuantity(dish?.quantity || 1);
    setNote(dish?.note || '');
  }, [dish]);

  const handleQChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newQuantity = Number(value);
      setDishQuantity(newQuantity);
      handleQuantityChange(dish.dishId, newQuantity, note);
    }
  };

  const handleNoteChangeLocal = (e) => {
    const newNote = e.target.value;
    setNote(newNote);
    handleNoteChange(dish.dishId, newNote);
  };

  const handleDeleTeOrderDetailApi = async (id) => {
    await deleteOrderDetail(id);
  }

  const handleDelete = () => {
    if (isDeleteApi) {
      console.log('delete api:', dish.id);
      handleDeleTeOrderDetailApi(dish.id);
    } else {
      console.log('delete local')
    }
    handleDeleteDish(dish.dishId);
    message.info(`Đã xóa: ${dish?.dishName}`)
  };

  const incrementQuantity = () => {
    const newQuantity = dishQuantity + 1;
    setDishQuantity(newQuantity);
    handleQuantityChange(dish.dishId, newQuantity, note);
  };

  const decrementQuantity = () => {
    if (dishQuantity <= 1) {
      handleDelete();
      return;
    }
    const newQuantity = dishQuantity - 1;
    setDishQuantity(newQuantity);
    handleQuantityChange(dish.dishId, newQuantity, note);
  };

  const handleConfirm = () => {
    console.log('Note:', note, dish.dishId);
  };

  const handleResetField = () => {
    setDishQuantity(dish?.quantity || 1);
    setNote(dish?.note || '');
    handleResetDish(dish.dishId);
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
                        onChange={handleNoteChangeLocal}
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
      <Col span={2} style={{ textAlign: 'center' }}>
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
          />
        </Popconfirm>
      </Col>
      {/* <Col span={1} style={{ textAlign: 'center' }}>
        <Button
          icon={<RedoOutlined />}
          type='link'
          size='small'
          style={{ padding: 0 }}
          onClick={handleResetField}
        />
      </Col> */}
    </Row>
  );
}

export default FoodDisplayItem;
