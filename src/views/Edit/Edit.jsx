import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { quickSort } from "../../question";
import { mapDispatchToProps } from "../../utils/decrators";
@connect(null, mapDispatchToProps)
export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  test1() {
    let arr = [1, 5, 1, 2, 9, 7, 4, 5, 3];
    quickSort(arr, 0, arr.length - 1);
    console.log(arr);
  }
  handleClick = () => {
    this.props.sendAction();
    this.test1();
  };
  render() {
    return (
      <div>
        <Button onClick={this.handleClick}>测试</Button>
      </div>
    );
  }
}
