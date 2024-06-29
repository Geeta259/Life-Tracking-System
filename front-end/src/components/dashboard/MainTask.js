import React from 'react';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex'}}>
      <Sidebar />
      <div style={{ position:'fixed',top:'10',left:'210px',height:'100vh',width:'85%',overflow:'auto', padding: '20px' }}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
