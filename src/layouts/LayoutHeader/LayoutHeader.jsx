import React, { useState, useCallback } from 'react';
import './LayoutHeader.less';
import { Button, Input, Layout, Card, Row, Col } from 'antd';
import { ROLE } from '~/configs/consts/role.const';
import { MacCommandFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { ROUTE } from '~/configs/consts/route.const';
import { searchDish } from '~/services/dish-api.service';

const { Header } = Layout;
const { Search } = Input;
const { Meta } = Card;

function LayoutHeader({ role }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [foodData, setFoodData] = useState([]);

  const handleGoToPage = () => {
    navigate(`/admin/${ROUTE.FOOD_MANAGEMENT}`);
  };

  const gotoMenu = () => {
    navigate(`/${ROUTE.MENU}`);
  };

  const gotoBooking = () => {
    navigate(`/${ROUTE.USER_BOOKING}`);
  };

  const handleSearch = useCallback(
    debounce(async (keyword) => {
      if (keyword.trim() === '') {
        setFoodData([]);
        return;
      }
      try {
        const dishes = await searchDish(keyword);
        setFoodData(dishes);
      } catch (error) {
        console.error('Search error:', error);
        setFoodData([]);
      }
    }, 500),
    []
  );

  const onSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    handleSearch(value);
  };

  const FoodItem = ({ food }) => (
    <Card
      hoverable
      className="food-item-card"
      cover={<img alt={food.name} src={food.image} className="food-image" />}
    >
      <Meta
        title={food.name}
        description={<p className="food-description">{food.description}</p>}
      />
      <div className="food-footer">
        <span className="food-price">{food.price.toLocaleString()} VND</span>
        <Button type="primary"  onClick={gotoBooking}>Order</Button>
      </div>
    </Card>
  );

  return (
    <Header className='header'>
      <div className='container'>
        <h1 onClick={gotoMenu} className='title'>Food Management</h1>
        <div className='actions'>
          <Search
            placeholder="Search..."
            value={searchTerm}
            onChange={onSearchChange}
            className='search-bar'
          />
          {role === ROLE.ADMIN && (
            <Button
              onClick={handleGoToPage}
              className='management-btn'
              icon={<MacCommandFilled />}
            >
              Vào trang quản lý
            </Button>
          )}
        </div>
      </div>
      <Row gutter={[16, 16]} className="food-list">
        {foodData.map(food => (
          <Col key={food.id} xs={24} sm={12} md={8} lg={6}>
            <FoodItem food={food}/>
          </Col>
        ))}
      </Row>
    </Header>
  );
}

export default LayoutHeader;
