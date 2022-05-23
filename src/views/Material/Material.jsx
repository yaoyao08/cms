import React, { Component } from "react";
import { connect } from "react-redux";
import TopTool from "../../components/public/TopTool/TopTool";
import { reciveDataFromState } from "../../utils/decrators";

@connect(reciveDataFromState)
export default class Material extends Component {
  render() {
    return (
      <div>
        <TopTool
          selector1={this.mainClasses}
          selector2={this.subClasses}
          handleSelect1={this.handleSelectMainType}
          handleSelect2={this.handleSelectSubType}
          search={this.handleSearch}
        ></TopTool>
        {/* <Button>测试</Button> */}
      </div>
    );
  }
}
