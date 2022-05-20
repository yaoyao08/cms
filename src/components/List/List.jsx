import React from "react";
import { Skeleton, Card, Table } from "antd";
const { Column } = Table;
export default function List(props) {
  return (
    <Skeleton loading={props.loading}>
      <Card
        bordered={false}
        style={{ height: "80%", width: "85%", margin: "1rem auto" }}
      >
        <Table dataSource={props.data} scroll={{ x: 2000, y: 500 }}>
          <Column title="案件ID" dataIndex="REC_ID"></Column>
          <Column title="大类名称" dataIndex="MAIN_TYPE_NAME"></Column>
          <Column title="小类名称" dataIndex="SUB_TYPE_NAME"></Column>
          <Column title="事件描述" dataIndex="EVENT_DESC"></Column>
          <Column title="所属区域" dataIndex="DISTRICT_NAME"></Column>
        </Table>
      </Card>
    </Skeleton>
  );
}
