import React from "react";
import { Card, Row, Col } from "antd";

import NextUI from "../../components/NextUI";
import TotalTrafficChart from "../../components/TotalTrafficChart";

import "antd/dist/antd.dark.css";

export default class MM00 extends React.Component {
  render() {
    return (
      <>
        <div className="MM00 pages">
          <Card style={{ height: "100%" }}>
            <div className="content_wrap">
              <Row gutter={[20, 20]}>
                <Col span={24}>
                  <Card className="topology_wrap">
                    <div className="MM00_topology_wrap">
                      <NextUI />
                    </div>
                  </Card>
                </Col>

                <Col span={24}>
                  <Card className="traffic_chart_wrap">
                    <div className="MM00_traffic_chart">
                      <TotalTrafficChart />
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          </Card>
        </div>
      </>
    );
  }
}