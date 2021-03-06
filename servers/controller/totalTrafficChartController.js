const postgres = require("../postgres");
const fs = require("fs");
const e = require("express");

function Unix_timestampConv(a) {
  return Math.floor(a / 1000);
}

//메인페이지(HCA1)
const getTotalTrafficHAC1Data = async (req, res) => {
  try {
    let HCA1trafficSql = `select * from metric_mpipe_data_history where gxpci_ethernet='gxpci0' and interfaces='gbe1' and log_dt between (current_timestamp - interval '1 day') and current_timestamp order by log_dt`;
    let traffic = await postgres(HCA1trafficSql);

    var txTrafficData = [];
    var rxTrafficData = [];
    if (traffic.length == 0) {
      fs.writeFile(
        "././client/src/components/TotalTrafficHCA1.json",
        JSON.stringify({
          begin_time: 1441051972,
          end_time: 1441138372,
          resource_uri: "",
          source: "BNL",
          target: "NEWY",
          traffic: {
            traffic_Rx: [[]],
            traffic_Tx: [[]],
          },
        }),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("success");
          }
        }
      );
    } else {
      for (let i = 0; i < traffic.length; i++) {
        var timeData = Unix_timestampConv(traffic[i].log_dt.getTime());
        var txData =
          Number(traffic[i].tx_bits) +
          Number(traffic[i].bcst_tx) +
          Number(traffic[i].mcst_tx);

        var rxData =
          Number(traffic[i].rx_bits) +
          Number(traffic[i].bcst_rx) +
          Number(traffic[i].mcst_rx);

        var data = [timeData, txData];
        var data2 = [timeData, rxData];

        txTrafficData.push(data);
        rxTrafficData.push(data2);

        console.log(txData, "txData");
      }
      fs.writeFile(
        "././client/src/components/TotalTrafficHCA1.json",
        JSON.stringify({
          begin_time: 1441051972,
          end_time: 1441138372,
          resource_uri: "",
          source: "BNL",
          target: "NEWY",
          traffic: {
            traffic_Rx: rxTrafficData,
            traffic_Tx: txTrafficData,
          },
        }),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("success");
          }
        }
      );
    }

    // console.log(txTrafficData, rxTrafficData);

    // console.log(jsonData.traffic.traffic_Rx[0], "jsonData");

    // for(let a= 0 ; a<jsonData.traffic.traffic_Rx.length; a++){
    //   jsonData.traffic.traffic_Rx[a]=rxTrafficData
    // }
    // console.log(rxTrafficData[0], "rxTrafficData");
    return res.json({ txTrafficData, rxTrafficData });
  } catch (error) {
    console.log(error);
  }
};

//메인페이지(HCA2)
const getTotalTrafficHAC2Data = async (req, res) => {
  try {
    let HCA1trafficSql = `select * from metric_mpipe_data_history where gxpci_ethernet='gxpci1' and interfaces='gbe1' and log_dt between (current_timestamp - interval '1 day') and current_timestamp order by log_dt`;
    let traffic = await postgres(HCA1trafficSql);

    var txTrafficData = [];
    var rxTrafficData = [];
    if (traffic.length == 0) {
      fs.writeFile(
        "././client/src/components/TotalTrafficHCA2.json",
        JSON.stringify({
          begin_time: 1441051972,
          end_time: 1441138372,
          resource_uri: "",
          source: "BNL",
          target: "NEWY",
          traffic: {
            traffic_Rx: [[]],
            traffic_Tx: [[]],
          },
        }),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("success");
          }
        }
      );
    } else {
      for (let i = 0; i < traffic.length; i++) {
        var timeData = Unix_timestampConv(traffic[i].log_dt.getTime());
        var txData =
          Number(traffic[i].tx_bits) +
          Number(traffic[i].bcst_tx) +
          Number(traffic[i].mcst_tx);

        var rxData =
          Number(traffic[i].rx_bits) +
          Number(traffic[i].bcst_rx) +
          Number(traffic[i].mcst_rx);

        var data = [timeData, txData];
        var data2 = [timeData, rxData];

        txTrafficData.push(data);
        rxTrafficData.push(data2);

        console.log(txData, "txData");
      }
      fs.writeFile(
        "././client/src/components/TotalTrafficHCA2.json",
        JSON.stringify({
          begin_time: 1441051972,
          end_time: 1441138372,
          resource_uri: "",
          source: "BNL",
          target: "NEWY",
          traffic: {
            traffic_Rx: rxTrafficData,
            traffic_Tx: txTrafficData,
          },
        }),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("success");
          }
        }
      );
    }

    // console.log(txTrafficData, rxTrafficData);

    // console.log(jsonData.traffic.traffic_Rx[0], "jsonData");

    // for(let a= 0 ; a<jsonData.traffic.traffic_Rx.length; a++){
    //   jsonData.traffic.traffic_Rx[a]=rxTrafficData
    // }
    // console.log(rxTrafficData[0], "rxTrafficData");
    return res.json({ txTrafficData, rxTrafficData });
  } catch (error) {
    console.log(error);
  }
};

//트래픽페이지
const getTrafficChartData = async (req, res) => {
  try {
    // console.log(req.body.params.inputData);

    let gxpci_ethernet = req.body.params.inputData.gxpci_ethernet;
    let interfaces = req.body.params.inputData.interfaces;
    console.log(gxpci_ethernet, interfaces, "input");

    // let trafficSql = `select * from metric_mpipe_data_history where gxpci_ethernet='gxpci0' and interfaces = 'gbe1' and log_dt between (current_timestamp - interval '1 months') and current_timestamp order by log_dt`;
    let trafficSql = `select * from metric_mpipe_data_history where gxpci_ethernet='${gxpci_ethernet}' and interfaces = '${interfaces}' and log_dt between (current_timestamp - interval '1 months') and current_timestamp order by log_dt`;
    let traffic = await postgres(trafficSql);
    console.log(traffic[0], "traffic");
    var txTrafficData = [];
    var rxTrafficData = [];

    if (traffic.length == 0) {
      // console.log(jsonData.traffic.traffic_Rx[0], "jsonData");

      fs.writeFile(
        "././client/src/components/TrafficChartData.json",
        JSON.stringify({
          begin_time: 1441051972,
          end_time: 1441138372,
          resource_uri: "",
          source: "BNL",
          target: "NEWY",
          traffic: {
            traffic_Rx: [[]],
            traffic_Tx: [[]],
          },
        }),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("success");
          }
        }
      );
      // let endInsert = 200;
      // return res.json({ endInsert });
    } else {
      for (let i = 0; i < traffic.length; i++) {
        var timeData = Unix_timestampConv(traffic[i].log_dt.getTime());
        var txData =
          Number(traffic[i].tx_bits) +
          Number(traffic[i].bcst_tx) +
          Number(traffic[i].mcst_tx);

        var rxData =
          Number(traffic[i].rx_bits) +
          Number(traffic[i].bcst_rx) +
          Number(traffic[i].mcst_rx);

        var data = [timeData, txData];
        var data2 = [timeData, rxData];

        txTrafficData.push(data);
        rxTrafficData.push(data2);

        // console.log(jsonData.traffic.traffic_Rx[0], "jsonData");

        // let endInsert = 200;
        // return res.json({ endInsert });
        // console.log(txData, "txData");
      }
      fs.writeFile(
        "././client/src/components/TrafficChartData.json",
        JSON.stringify({
          begin_time: 1441051972,
          end_time: 1441138372,
          resource_uri: "",
          source: "BNL",
          target: "NEWY",
          traffic: {
            traffic_Rx: rxTrafficData,
            traffic_Tx: txTrafficData,
          },
        }),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("success");
          }
        }
      );
    }

    if (txTrafficData.length == 0) {
      // console.log(txTrafficData, rxTrafficData, "??");
      // console.log(txTrafficData, "txTrafficData");
      console.log("없다");
    } else {
      console.log("있다");
    }
    console.log(txTrafficData[0], "txTraffic");
    console.log(rxTrafficData[0], "rxTraffic");

    return res.json({ txTrafficData, rxTrafficData });
  } catch (error) {
    console.log(error);
  }
};

const totalTrafficChartController = {
  getTotalTrafficHAC1Data,
  getTotalTrafficHAC2Data,
  getTrafficChartData,
};

module.exports = totalTrafficChartController;
