import React from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import { State } from "../../../store/reducers/index";
import Logo from "./Logo";
import Menu from './Menu'
const { Sider } = Layout;
const LayoutSider = function (props:any) {
  const { sidebarCollapsed, sidebarLogo } = props;
  return (
    <Sider
      collapsible
      collapsed={sidebarCollapsed}
      trigger={null}
      style={{ zIndex: 10 }}
    >
      {sidebarLogo ? <Logo /> : null}
      <Menu />
    </Sider>
  );
};

const mapStateToProps = (state: State) => {
  return {
    ...state.app,
    ...state.settings,
  };
};
export default connect(mapStateToProps)(LayoutSider);
