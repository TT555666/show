import React, { Component } from "react";
// import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import echarts from "../../../../lib/echarts";
import { debounce } from "../../../../utils";
import { State } from '../../../../store/reducers/index';
interface Props{
  sidebarCollapsed?:any
  chartData?:any
  styles:any
  width:any
  height:any
  className:any
  
  
  // sidebarCollapsed:any
  // sidebarCollapsed:any
}
class PieChart extends Component<Props> {
  // static propTypes = {
  //   width: PropTypes.string,
  //   height: PropTypes.string,
  //   className: PropTypes.string,
  //   styles: PropTypes.object,
  // };
  static defaultProps = {
    width: "100%",
    height: "300px",
    styles: {},
    className: "",
  };
  state = {
    chart: null,
  };
  el: any;

  componentDidMount() {
    debounce(this.initChart.bind(this), 300)();
    window.addEventListener("resize", () => this.resize());
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.sidebarCollapsed !== this.props.sidebarCollapsed) {
      this.resize();
    }
    if (nextProps.chartData !== this.props.chartData) {
      debounce(this.initChart.bind(this), 300)();
    }
  }

  componentWillUnmount() {
    this.dispose();
  }

  resize() {
    const chart = this.state.chart;
    if (chart) {
      debounce(chart.resize.bind(this), 300)();
    }
  }

  dispose() {
    if (!this.state.chart) {
      return;
    }
    window.removeEventListener("resize", () => this.resize()); // 移除窗口，变化时重置图表
    this.setState({ chart: null });
  }

  setOptions(arg) {
    const animationDuration = 3000;
    this.state.chart.setOption({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        left: "center",
        bottom: "10",
        data: ["Industries", "Technology", "Forex", "Gold", "Forecasts"],
      },
      calculable: true,
      series: [
        {
          name: "WEEKLY WRITE ARTICLES",
          type: "pie",
          roseType: "radius",
          radius: [15, 95],
          center: ["50%", "38%"],
          data: [
            { value: 320, name: "Industries" },
            { value: 240, name: "Technology" },
            { value: 149, name: "Forex" },
            { value: 100, name: "Gold" },
            { value: 59, name: "Forecasts" },
          ],
          animationEasing: "cubicInOut",
          animationDuration
        },
      ],
    });
  }

  initChart() {
    if (!this.el) return;
    this.setState({ chart: echarts.init(this.el, "macarons") }, () => {
      this.setOptions(this.props.chartData);
    });
  }

  render() {
    const { className, height, width, styles } = this.props;
    return (
      <div
        className={className}
        ref={(el) => (this.el = el)}
        style={{
          ...styles,
          height,
          width,
        }}
      />
    );
  }
}

export default connect((state:State) => state.app)(PieChart);
