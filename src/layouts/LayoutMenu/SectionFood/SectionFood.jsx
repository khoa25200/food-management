import React, { useCallback, useEffect, useState } from 'react';
import './SectionFood.less';
import { Col, Divider, Pagination, Radio, Row, Select, Space } from 'antd';
import { DEFAULT_PAGE_SIZE } from '~/configs/consts/app.const';
import SectionFoodItem from './SectionFoodItem';
import { getAllDishes } from '~/services/dish-api.service';
import { ArrowDownOutlined, ArrowUpOutlined, UserOutlined } from '@ant-design/icons';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { categoryState } from '~/states/category.state';
import SectionFoodMenuSkeleton from './Skeleton/SectionFoodMenuSkeleton';
const filterSortData = [
  {
    id: 0,
    name: 'Sắp xếp giá từ thấp đến cao',
    icon: <ArrowUpOutlined />
  },
  {
    id: 1,
    name: 'Sắp xếp giá từ cao đến thấp',
    icon: <ArrowDownOutlined />
  },
  {
    id: 2,
    name: 'Sắp xếp theo tên A-Z',
    icon: <UserOutlined />
  },
  {
    id: 3,
    name: 'Sắp xếp theo tên Z-A',
    icon: <UserOutlined />
  },
];

const handleFilterDataSelect = (id) => {
  switch (id) {
    case 0:
      return { sort: 'price', order: 'asc' };
    case 1:
      return { sort: 'price', order: 'desc' };
    case 2:
      return { sort: 'name', order: 'asc' };
    case 3:
      return { sort: 'name', order: 'desc' };
    default:
      return { sort: 'id', order: 'asc' };
  }
}


function SectionFood({ categories }) {
  const cateState = useRecoilState(categoryState);

  const [dishes, setDishes] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [filterSort, setFilterSort] = useState(0);
  const handleFilterSortChange = (value) => {
    setFilterSort(value);
  };

  const [category, setCategory] = useState(categories[0]?.id);
  const onChange = (e) => {
    setCategory(categories[e.target.value - 1].id);
  };

  useEffect(() => {
    if (cateState && cateState.length > 0) {
      setCategory(cateState[0]);
    }
  }, [cateState]);

  const [page, setPage] = useState(0);
  const [paginationC, setPaginationC] = useState(10);
  const [paginationNumber, setPaginationNumber] = useState(1);

  const handleApiGetDishesReq = async () => {
    setLoading(true);
    const sortParams = handleFilterDataSelect(filterSort);
    const dishes = await getAllDishes(page, DEFAULT_PAGE_SIZE, sortParams.sort, sortParams.order);

    if (!dishes || !dishes.content) return;
    setLoading(false);
    setDishes(dishes.content);
    setPaginationC(+(dishes?.totalPages) * 10);
    setPaginationNumber(dishes?.pageable?.pageNumber)
  }


  useEffect(() => {
    handleApiGetDishesReq();
  }, [page, category, filterSort]);

  const handlePageChange = (e) => {
    setPage(e - 1);
  };

  return (
    <div className='outer-food-section'>
      <section>
        <div className='food-section'>
          <div className='filter-sidebar'>
            <div className='sticky'>
              <div>
                <Select
                  prefixCls='sort'
                  defaultValue={0}
                  style={{
                    minWidth: `100%`
                  }}
                  onChange={handleFilterSortChange}
                  options={filterSortData.map((opt) => ({
                    label: <>{opt.icon} {opt.name}</>,
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
            </div>
          </div>
          <div className='display-food'>
            <Row className='foods-section'>
              {isLoading
                ? <SectionFoodMenuSkeleton />
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

            {!isLoading && <Pagination align="center" defaultCurrent={paginationNumber + 1} total={paginationC} responsive onChange={(e) => handlePageChange(e)} />}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SectionFood;