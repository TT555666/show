import React from "react";
import { connect } from "react-redux";
import {  Tooltip } from "antd";
import Icon from '@ant-design/icons';

import { toggleSettingPanel } from "../../store/actions";
import "./index.less";
const Settings = (props) => {
  const { toggleSettingPanel } = props;
  return (
    <div className="settings-container">
      <Tooltip placement="bottom" title="系统设置">
        <Icon type="setting" onClick={toggleSettingPanel} />
      </Tooltip>
    </div>
  );
};

export default connect(null, { toggleSettingPanel })(Settings);
