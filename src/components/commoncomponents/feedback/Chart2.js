import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';
import {View} from 'react-native';
import palette from './Color';
var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
       label: "My First dataset",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        //backgroundColor: palette.secondary,
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: "My Second dataset",
        fillColor: "rgba(75,192,192,0.4)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        backgroundColor: palette.primary.main,
        data: [28, 48, 40, 19, 86, 27, 85]
      }
    ]
  };

export default class LineDemo extends Component {
  render() {
    return (
      <View>
        <Line ref="chart" data={data} />
      </View>
    );
  }

  componentDidMount() {
    const { datasets } = this.refs.chart.chartInstance.data
    console.log(datasets[0].data);
  }
}