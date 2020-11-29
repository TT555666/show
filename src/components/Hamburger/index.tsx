import React from "react";
import { connect } from "react-redux";
import Icon from '@ant-design/icons';

import { toggleSiderBar } from "../../store/actions";
import "./index.less";
import { State } from '../../store/reducers/index';
const Hamburger = (props) => {
  const { sidebarCollapsed, toggleSiderBar } = props;
  return (
    <div className="hamburger-container">
      <Icon
        type={sidebarCollapsed ? "menu-unfold" : "menu-fold"}
        onClick={toggleSiderBar}
      />
    </div>
  );
};

export default connect((state:State) => state.app, { toggleSiderBar })(Hamburger);
