import React, { Component } from "react";
import { getData } from "../modules/performanceData";


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
    let dataIndex;

    if (this.state.performanceData != null) {
      dataIndex = (
        <div>
          {this.state.performanceData.map((item) => {
            return (
            <div key={item.id}>
              <p>Result: {item.data.message}</p>
              <p>Gender: {item.data.gender}</p>
              <p>Age: {item.data.age}</p>
              <p>Distance: {item.data.distance}</p>
                 </div>)
                 
                 })}
        </div>
      );
    }

    return <div>{dataIndex}</div>;
  }
}

export default DisplayPerformanceData;

