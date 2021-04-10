import React from 'react';
import Sidepanel from '@/pages/utils/sidepanel/Sidepanel';
import Navbar from '@/layout/Navbar';

interface IProps {
  children: any;
  location: {
    pathname: string;
  };
}

export default (props: IProps) => {
  return (
    <div className="container">
      <Navbar />
      <div>{props.children}</div>
      <Sidepanel />
    </div>
  );
};
