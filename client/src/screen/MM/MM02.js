import React from "react";
import { Breadcrumb, Card, Table, Modal } from "antd";

import TrafficChart from "../../components/TrafficChart";
import TotalTrafficChart from "../../components/TotalTrafficChart";

export default class MM01 extends React.Component {
  constructor(props) {
    super(props);

    this.reference = React.createRef();

    this.state = {
      title: "트래픽",

      // 트래픽 테이블 데이터
      trafficHistoryList: [],

      // 트래픽 Modal open
      isTrafficDetail: false,

      // 트래픽 Modal 데이터
      modealDevice: "",
      modalInterface: "",
      modalError: "",
      modalCapacity: "",
    };
  }

  componentDidMount() {
    this._getTrafficeHistoryList();
  }

  render() {
    const {
      title,

      // 트래픽 테이블 데이터
      trafficHistoryList,

      // 트래픽 Modal open
      isTrafficDetail,

      // 트래픽 Modal 데이터
      modealDevice,
      modalInterface,
      modalError,
      modalCapacity,
    } = this.state;

    const trafficColumns = [
      { title: "디바이스", dataIndex: "gxpci_ethernet", align: "center" },
      { title: "인터페이스", dataIndex: "interfaces", align: "center" },
      {
        title: "Rx | Tx",
        dataIndex: "",
        align: "center",
        render() {
          return {
            children: <TrafficChart />,
          };
        },
      },
      { title: "Tx 에러", dataIndex: "tx_err", align: "center" },
      { title: "Rx 에러", dataIndex: "rx_err", align: "center" },
      { title: "CAPACITY", dataIndex: "capacity", align: "center" },
    ];

    return (
      <>
        {/* {console.log(trafficHistoryList, "트래픽 테이블 정보 확인")} */}
        <div className="MM01 pages">
          <Breadcrumb className="bread_crumb">
            <Breadcrumb.Item>{title}</Breadcrumb.Item>
          </Breadcrumb>

          <Card>
            <div className="content_wrap">
              <Table
                className="table_wrap"
                size="small"
                columns={trafficColumns}
                dataSource={trafficHistoryList}
                rowKey="idx"
                onRow={(data) => ({
                  onClick: () => {
                    this._trafficModalHandler(data);
                  },
                })}
              />
            </div>
          </Card>
        </div>

        <Modal
          title="트래픽 상세 정보"
          visible={isTrafficDetail}
          okText="확인"
          cancelText="닫기"
          onOk={() => this._modalHandler()}
          onCancel={() => this._modalHandler()}
        >
          <div>
            <div className="MM02_modal_table_wrap">
              <table className="MM02_modal_table">
                <caption>트래픽 상세 정보</caption>
                <tbody>
                  <tr>
                    <th>디바이스</th>
                    <td>{modealDevice}</td>
                  </tr>
                  <tr>
                    <th>인터페이스</th>
                    <td>{modalInterface}</td>
                  </tr>
                  <tr>
                    <th>에러</th>
                    <td>{modalError}</td>
                  </tr>
                  <tr>
                    <th>Capacity</th>
                    <td>{modalCapacity}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="MM02_modal_chart_wrap">
              <TotalTrafficChart />
            </div>
          </div>
        </Modal>
      </>
    );
  }

  //   트래픽 데이터 가져옴
  _getTrafficeHistoryList = async () => {
    await fetch("/api/getRawData")
      .then((res) => res.json())
      .then((data) =>
        // console.log(data, "트래픽 데이터 확인")
        this.setState({
          trafficHistoryList: data.rawDatas,
        })
      );
  };

  // 트래픽 행 클릭 > Modal
  _trafficModalHandler = (data) => {
    // console.log(data, "트래픽 행 클릭 데이터");

    this.setState({
      isTrafficDetail: !this.state.isTrafficDetail,

      modealDevice: data.gxpci_ethernet,
      modalInterface: data.interfaces,
      modalError: data.udp_cs_err,
      modalCapacity: data.event_type,
    });
  };

  // 트래픽 Modal 확인, 닫기 클릭
  _modalHandler = () => {
    this.setState({
      isTrafficDetail: !this.state.isTrafficDetail,
    });
  };
}
