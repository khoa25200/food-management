import React, { useEffect, useState } from 'react';
import './SectionFood.less';
import { Divider, Pagination, Radio, Select, Space } from 'antd';
import api from '~/utils/HttpRequest';
import { API, GET_METHOD } from '~/configs/consts/api.const';
const filterSortData = [
  {
    id: 0,
    name: 'Sắp xếp giảm dần',
  },
  {
    id: 1,
    name: 'Sắp xếp tăng dần',
  },
];

const categories = [
  {
    id: 1,
    name: 'Thức ��n chính',
  },
  {
    id: 2,
    name: 'Thức ��n nền',
  },
  {
    id: 3,
    name: 'Thức ��n nh��',
  }
]

const getAllDishes = async (page, size, sortBy = 'id', sortDirection = 'asc') => {
  try {
    const dishes = await api({
      url: `${API.GET_ALL_DISHES}`,
      params: {
        page,
        size,
        sortBy,
        sortDirection
      },
      method: GET_METHOD,
    })
    console.log(dishes?.data)
  }
  catch (error) {
    console.error('Error fetching dishes', error);
  }
  return
}

function SectionFood() {
  const [dishes, setDishes] = useState({})


  const [filterSort, setFilterSort] = useState(filterSortData[0]);
  const handleFilterSortChange = (value) => {
    setFilterSort(filterSortData[value]);
  };

  const [category, setCategory] = useState(categories[0]);
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setCategory(setCategory(categories[e.target.value]));
  };

  const [page, setPage] = useState(1);

  const handleDisplayDishes = async () => {
    const page = 1;
    const size = 10;
    const dishes = await getAllDishes(page, size, 'id', filterSort.id === 1 ? 'asc' : 'desc');
    setDishes(dishes);
  }

  useEffect(() => handleDisplayDishes, [filterSort, page, category]);

  return (
    <section>
      <div className='food-section'>
        <div className='filter-sidebar'>
          <Select
            prefixCls='sort'
            defaultValue={filterSort.id}
            style={{
              minWidth: `100%`
            }}
            onChange={handleFilterSortChange}
            options={filterSortData.map((opt) => ({
              label: opt.name,
              value: opt.id,
            }))}
          />
          <Divider />
          <div className="catorory-filter">
            <div className="cate-header">Danh mục</div>
            <Radio.Group onChange={onChange} value={category}>
              <Space direction="vertical">
                {categories?.map((value) => <Radio key={value.id} value={value.id}>{value.name}</Radio>)}
              </Space>
            </Radio.Group>
          </div>
        </div>
        <div className='display-food'>
          <div className='foods-section'>
            {/* Render food items here */}
            <div className='food-item'>
              <div className='food-info'>
                <h3>Thức ��n mì đùi</h3>
                <p>Giá: 25,000đ</p>
              </div>
            </div>
            {/* Repeat this component for each food item */}
          </div>

          <Pagination align="center" defaultCurrent={1} total={50} responsive onChange={(e) => setPage(e)} />
        </div>
      </div>
    </section>
  );
}

export default SectionFood;