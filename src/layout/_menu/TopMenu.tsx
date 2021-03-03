import React from 'react';
import { connect, Link, withRouter } from 'umi';
import { get } from 'lodash';
// @ts-ignore
import classNames from 'classnames';
import { IUserAccount } from '@/pages/user/userSearch/types';
import { Dropdown, Menu } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';

interface IProps {
  Account: IUserAccount;
}

const TopMenu = (props: IProps) => {
  const location = get(props, 'location.pathname', '');
  const acl = get(props, 'Account.acl', []);
  const userCompanyAccountId = get(props, 'Account.companyAccount', '');

  const guestMenu = [
    { path: '/pricing', name: 'Pricing' },
    { path: '/industries', name: 'Industries' },
    { path: '/support', name: 'Support' },
  ].map((el) => ({
    ...el,
    isActive: location.startsWith(el.path),
  }));

  const mainMenu = [
    { path: '/client', name: 'Clients', perm: 'client.get.own' },
    { path: '/order', name: 'Orders', perm: 'order.get.own' },
    { path: '/invoice', name: 'Invoices', perm: 'invoice.get.own' },
    { path: '/estimate', name: 'Estimates', perm: 'estimate.get.own' },
    { path: '/schedule', name: 'Schedule', perm: 'order.get.own' },
    { path: '/payment', name: 'Payments', perm: 'payment.get.own' },
  ].map((el) => ({
    ...el,
    isActive: location.startsWith(el.path),
    isVisible: acl.includes(el.perm),
  }));

  const secondaryMenu = [
    { path: '/address', name: 'Addresses', perm: 'address.get.own' },
    { path: '/vendor', name: 'Vendors', perm: 'vendor.get.own' },
    { path: '/product', name: 'Products', perm: 'product.get.own' },
    { path: '/purchaseOrder', name: 'Purchase Orders', perm: 'purchaseOrder.get.own' },
  ].map((el) => ({
    ...el,
    isActive: location.startsWith(el.path),
    isVisible: acl.includes(el.perm),
  }));

  const secondaryMenuComponent = (
    <Menu>
      {secondaryMenu.map(
        (el) =>
          el.isVisible && (
            <Menu.Item key={el.path}>
              <Link to={el.path}>{el.name}</Link>
            </Menu.Item>
          ),
      )}
    </Menu>
  );

  return (
    <div id="top-menu" role="menu" className="d-flex d-print-none">
      {userCompanyAccountId ? (
        <>
          {mainMenu.map(
            (el) =>
              el.isVisible && (
                <div className={classNames('item', { active: el.isActive })} key={el.path}>
                  <Link to={el.path}>{el.name}</Link>
                </div>
              ),
          )}

          <Dropdown overlay={secondaryMenuComponent}>
            <span className="item ant-dropdown-link pointer">
              <img src={dotsIcon} alt="" height="27" />
            </span>
          </Dropdown>
        </>
      ) : (
        guestMenu.map((el) => (
          <div className={classNames('item', { active: el.isActive })} key={el.path}>
            <Link to={el.path}>{el.name}</Link>
          </div>
        ))
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

export default withRouter(connect(mapStateToProps)(TopMenu));
