import React, { Component } from "react";
import TopTool from "../../components/public/TopTool/TopTool";
import List from "../../components/List/List";
import { getRequest } from "../../api";
export default class PaperList extends Component {
  constructor(props) {
    super(props);
    this.init();
    this.state = {
      tableData: [],
    };
  }
  init() {
    this.loading = true;
    this.mainClasses = [
      "class1",
      "class2",
      "class3",
      "class4",
      "class5",
      "class6",
    ];
    this.subClasses = [
      "subclass1",
      "subclass2",
      "subclass3",
      "subclass4",
      "subclass5",
      "subclass6",
    ];
    this.maintype = "";
    this.subtype = "";
  }
  getData = () => {
    getRequest("/popup/listArea").then((res) => {
      this.loading = false;
      this.setState(() => ({
        tableData: res.data,
      }));
    });
  };
  handleSearch = () => {
    /**
     * 此处为查询代码
     */
  };
  handleSelectMainType = (value) => {
    this.maintype = value;
  };
  handleSelectSubType = (value) => {
    this.subtype = value;
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <div className="paperlist" style={{ height: "100%" }}>
        <TopTool
          selector1={this.mainClasses}
          selector2={this.subClasses}
          handleSelect1={this.handleSelectMainType}
          handleSelect2={this.handleSelectSubType}
          search={this.handleSearch}
        ></TopTool>
        <List loading={this.loading} data={this.state.tableData}></List>
      </div>
    );
  }
}
