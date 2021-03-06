import React from "react";
import axios from "axios";

import { Card, Row, Col, Tabs } from "antd";

// import NextUI from "../../components/NextUI";
// import Flow from "../../components/Flow";
import D3 from "../../components/D3";

import TotalTrafficChart from "../../components/TotalTrafficChart";
import TotalTrafficChart2 from "../../components/TotalTrafficChart2";

import "antd/dist/antd.dark.css";
const { TabPane } = Tabs;

export default class MM00 extends React.Component {
  state = {};

  componentDidMount = () => {
    this._getTrafficData();
    this._getTrafficData2();
  };

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
                      {/* <NextUI /> */}
                      {/* <Flow /> */}
                      <D3 />
                    </div>
                  </Card>
                </Col>

                <Col span={24}>
                  <Card className="traffic_chart_wrap">
                    <div className="MM00_traffic_chart">
                      <Tabs defaultActiveKey="1" type="card" size="small">
                        <TabPane tab="HCA1" key="1">
                          <TotalTrafficChart />
                        </TabPane>
                        <TabPane tab="HCA2" key="2">
                          <TotalTrafficChart2 />
                        </TabPane>
                      </Tabs>
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

  // TotalTrafficHAC1데이터 가져오기
  _getTrafficData = async () => {
    await axios.get("/api/getTotalTrafficHAC1Data").then((res) => {
      if (res.status === 200) {
        // console.log("TotalTrafficChart 데이터");
        this.setState({
          txTrafficData: res.data.txTrafficData,
          rxTrafficData: res.data.rxTrafficData,
        });
      }
    });
  };
  //Total TrafficHAC2데이터
  _getTrafficData2 = async () => {
    await axios.get("/api/getTotalTrafficHAC2Data").then((res) => {
      if (res.status === 200) {
        // console.log("TotalTrafficChart 데이터");
        this.setState({
          txTrafficData: res.data.txTrafficData,
          rxTrafficData: res.data.rxTrafficData,
        });
      }
    });
  };
}
