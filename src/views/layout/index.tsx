import React from "react";
import { connect } from "react-redux";
import Content from "./Content";
import Header from "./Header";
import RightPanel from "./RightPanel";
import Sider from "./Sider";
import TagsView from "./TagsView";
import { Layout } from "antd";
import { PageLayout } from './interfaceType';
import { State } from '../../store/reducers/index';
const LayoutPage = (props:PageLayout) => {
  const { tagsView } = props;
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout>
        <Header />
        {tagsView ? <TagsView /> : null}
        <Content />
        <RightPanel />
      </Layout>
    </Layout>
  );
};
export default connect((state:State) => state.settings)(LayoutPage);
