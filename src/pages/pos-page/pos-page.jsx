import React from 'react';
import './pos-page.less';
import LayoutPOS from '~/layouts/LayoutPOS';
import SectionQuickPOSAction from '~/sections/SectionQuickPOSAction';
import SectionDisplayPOS from '~/sections/SectionDisplayPOS';
import SectionMainAction from '~/sections/SectionMainAction';
import SectionPOSOption from '~/sections/SectionPOSOption';
function POSPage({ role }) {
  return (
    <LayoutPOS quickActionsSection={<SectionQuickPOSAction />} displayWrapperSection={<SectionDisplayPOS />} mainActionsActions={<SectionMainAction />} optionSection={<SectionPOSOption />} />
  );
}

export default POSPage;