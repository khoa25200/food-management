import React from 'react';
import './user-booking-page.less';
import LayoutAuth from '~/layouts/LayoutAuth';
import FormBooking from '~/components/forms/FormBooking/FormBooking';
function UserBookingPage({ role }) {
  return (
    <LayoutAuth role={role} content={<FormBooking role={role}/>} />
  );
}

export default UserBookingPage;