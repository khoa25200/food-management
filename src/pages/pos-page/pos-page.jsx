import React, { useEffect, useState } from 'react';
import './pos-page.less';
import LayoutPOS from '~/layouts/LayoutPOS';
import SectionQuickPOSAction from '~/sections/SectionQuickPOSAction';
import SectionDisplayPOS from '~/sections/SectionDisplayPOS';
import SectionMainAction from '~/sections/SectionMainAction';
import SectionPOSOption from '~/sections/SectionPOSOption';
import { getAllDishes } from '~/services/dish-api.service';
import { Spin } from 'antd';
import { getAllTables } from '~/services/pos.service';
function POSPage({ role }) {
  const [dishes, setDishes] = useState([]);
  const [tables, setTables] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleGetAllDishes = async () => {
    setIsLoading(true);
    const dishes = await getAllDishes(0, 50); //handle after
    setDishes(dishes.content);
    setIsLoading(false);
  }
  const handleGetAllTables = async () => {
    setIsLoading(true);
    const tables = await getAllTables();
    setTables(tables);
    setIsLoading(false);
  }
  useEffect(() => {
    handleGetAllDishes();
    handleGetAllTables();
  }, []);

  return (
    <>{isLoading ? <Spin fullscreen /> : <LayoutPOS quickActionsSection={<SectionQuickPOSAction />} displayWrapperSection={<SectionDisplayPOS />} mainActionsActions={<SectionMainAction />} optionSection={<SectionPOSOption dishes={dishes} tables={tables} />} />}</>
  );
}

export default POSPage;