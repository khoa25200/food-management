import React, { useCallback, useEffect, useState } from 'react';
import './SectionFood.less';
import { Button, Col, Divider, Flex, Pagination, Radio, Row, Select, Space } from 'antd';
import { DEFAULT_PAGE_SIZE } from '~/configs/consts/app.const';
import SectionFoodItem from './SectionFoodItem';
import { getAllDishes } from '~/services/dish-api.service';
import { ArrowDownOutlined, ArrowUpOutlined, FilterFilled, UserOutlined } from '@ant-design/icons';
import { useRecoilState, useSetRecoilState } from 'recoil';
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


function SectionFood({ categories, handleClickItem }) {
  const [cateState, setCateState] = useRecoilState(categoryState);

  const [dishes, setDishes] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [filterSort, setFilterSort] = useState(0);
  const handleFilterSortChange = (value) => {
    setFilterSort(value);
  };

  const onChange = (e) => {
    const id = categories[e.target.value - 1].id;
    setCateState(id);
  };

  const [page, setPage] = useState(0);
  const [paginationC, setPaginationC] = useState(10);
  const [paginationNumber, setPaginationNumber] = useState(1);

  const handleApiGetDishesReq = async () => {
    setLoading(true);
    const sortParams = handleFilterDataSelect(filterSort);
    const dishes = await getAllDishes(page, DEFAULT_PAGE_SIZE, sortParams.sort, sortParams.order, cateState);

    if (!dishes || !dishes.content) return;
    setLoading(false);
    setDishes(dishes.content);
    setPaginationC(+(dishes?.totalPages) * 10);
    setPaginationNumber(dishes?.pageable?.pageNumber)
  }


  useEffect(() => {
    handleApiGetDishesReq();
  }, [page, cateState, filterSort]);

  useEffect(() => {
    console.log('call api', cateState)
  }, [cateState]);

  const handlePageChange = (e) => {
    setPage(e - 1);
  };

  const handleRemoveFilter = () => {
    setCateState(null);
    setPage(0);
    setFilterSort(0);
  }

  return (
    <div className='outer-food-section' id='filter'>
      <section>
        <Flex className="responsive-filter" vertical>
          <Radio.Group onChange={onChange} value={cateState} className='radio'>
            {categories?.map((value) => <Radio.Button key={value.id} value={value.id}>{value.name}</Radio.Button>)}

          </Radio.Group>
          <Flex justify='space-between' align='center'>
            <Select
              prefixCls='sort'
              defaultValue={0}
              onChange={handleFilterSortChange}
              options={filterSortData.map((opt) => ({
                label: <>{opt.icon} {opt.name}</>,
                value: opt.id,
              }))}
              value={filterSort}
            />
            <Button type='dashed' icon={<FilterFilled />} onClick={handleRemoveFilter}>Xóa bộ lọc</Button>
          </Flex>
        </Flex>
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
                  value={filterSort}
                />
                <Divider />
                <div className="category-filter">
                  <div className="cate-header">Danh mục</div>
                  <Radio.Group onChange={onChange} value={cateState}>
                    <Space direction="vertical">
                      {categories?.map((value) => <Radio key={value.id} value={value.id}>{value.name}</Radio>)}
                    </Space>
                  </Radio.Group>
                </div>
                <Button type='dashed' icon={<FilterFilled />} onClick={handleRemoveFilter}>Xóa bộ lọc</Button>
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
                      <SectionFoodItem handleClickItem={handleClickItem} cateImg={dish?.image} name={dish?.name} desc={dish?.description} price={dish?.price} />
                    </Col>
                  )
                )}
            </Row>

            {!isLoading && <Pagination align="center" defaultCurrent={paginationNumber + 1} total={paginationC} responsive onChange={(e) => handlePageChange(e)} />}
          </div>
        </div>
      </section>
    </div >
  );
}

export default SectionFood;