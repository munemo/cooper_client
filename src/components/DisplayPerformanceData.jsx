import React, { Component } from "react";
import { getData } from "../modules/performanceData";
import { Line } from "react-chartjs-2";


class DisplayPerformanceData extends Component {
  state = {
    performanceData: null,
  };

  componentDidMount() {
    this.getPerformanceData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.updateIndex !== prevProps.updateIndex) {
      this.getPerformanceData();
    }
  }

  async getPerformanceData() {
    let result = await getData();
    this.setState({ performanceData: result.data.entries }, () => {
      this.props.indexUpdated();
    });
  }

  render() {
    let graph;
    let distances=[];
    let labels = [];
    
    if (this.state.performanceData != null) {    
      this.state.performanceData.forEach(entry => {
        distances.push(entry.data.distance)
        labels.push(entry.data.message);
      })

      const data = {
        datasets: [{
          data: distances,
          label: 'Saved Distances',
        }],
        labels: labels 

      }

      graph = (
        <>
          <Line
          data={data}
          
          />
        </>
      )
}

    return <div>{graph}</div>;
  }
}

export default DisplayPerformanceData;

