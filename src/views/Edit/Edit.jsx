import React from "react";
import { connect } from "react-redux";
import { Button } from "antd";

function Edit(props) {
  const handleClick = () => {
    props.sendAction();
  };
  return (
    <div>
      <Button onClick={handleClick}>测试</Button>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    sendAction: () => {
      dispatch({
        type: "send_test",
      });
    },
  };
};
export default connect(null, mapDispatchToProps)(Edit);
