import React, { useEffect, useState } from 'react';
import './SectionFood.less';
import { Col, Divider, Pagination, Radio, Row, Select, Space } from 'antd';
import api from '~/utils/HttpRequest';
import { API, GET_METHOD } from '~/configs/consts/api.const';
import { DEFAULT_PAGE_SIZE } from '~/configs/consts/app.const';
import SectionFoodItem from './SectionFoodItem';
import { IMAGES } from '~/assets/images';
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
    return dishes;
  }
  catch (error) {
    console.error('Error fetching dishes', error);
  }
  return
}

function SectionFood() {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [filterSort, setFilterSort] = useState(filterSortData[0]);
  const handleFilterSortChange = (value) => {
    setFilterSort(filterSortData[value]);
  };

  const [category, setCategory] = useState(categories[0]);
  const onChange = (e) => {
    setCategory(setCategory(categories[e.target.value]));
  };

  const [page, setPage] = useState(0);
  const [paginationC, setPaginationC] = useState(10);
  const [paginationNumber, setPaginationNumber] = useState(1);

  const handleApiGetDishesReq = async () => {
    setLoading(true);
    const dishes = await getAllDishes(page, DEFAULT_PAGE_SIZE, 'id', filterSort.id === 1 ? 'asc' : 'desc');
    if (!dishes || !dishes.content) return;
    setLoading(false);
    setDishes(dishes.content);
    setPaginationC(+(dishes?.totalPages)*10);
    setPaginationNumber(dishes?.pageable?.pageNumber)
  }
  useEffect(() => {
    handleApiGetDishesReq();
  }, [page]);

  const handlePageChange = (e) => {
    setPage(e - 1);
  };

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
          <Row className='foods-section'>
            {isLoading
              ? <div key={1}>loading</div>
              : (
                dishes && dishes?.map((dish, index) =>
                  <Col
                    key={index}
                    xs={{
                      flex: '60%',
                    }}
                    sm={{
                      flex: '50%',
                    }}
                    md={{
                      flex: '50%',
                    }}
                    lg={{
                      flex: '33.33%',
                    }}
                    xl={{
                      flex: '20%',
                    }}
                  >
                    <SectionFoodItem cateImg={dish?.image} name={dish?.name} desc={dish?.description} price={dish?.price} />
                  </Col>
                )
              )}
          </Row>

          {!isLoading && <Pagination align="center" defaultCurrent={paginationNumber+1} total={paginationC} responsive onChange={(e) => handlePageChange(e)} />}
        </div>
      </div>
    </section>
  );
}

export default SectionFood;