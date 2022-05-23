import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { mapDispatchToProps } from "../../utils/decrators";
@connect(null, mapDispatchToProps)
export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleClick = () => {
    this.props.sendAction();
  };
  return() {
    <div>
      <Button onClick={this.handleClick}>测试</Button>
    </div>;
  }
}
