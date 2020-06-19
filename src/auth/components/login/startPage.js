import React from 'react';
import { Redirect } from "react-router-dom";

function startPage() {
  if (!localStorage.getItem('token')) {
    return <Redirect to="/login" />
  }

  return <h2>Стартовая страница</h2>;
} 

export default startPage;
