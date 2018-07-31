import React from 'react';
import S from './index.module.css';
import MountpointContainer from './MountpointContainer';
import InfoBox from './InfoBox';
import Data from './data.js';

export default class App extends React.Component{
  /**Default Constructor*/
  constructor(){
    super();
    this.state = {
      boxData: {
        status: 0,
        time: ""
      },
      data: Data,
      display: "hidden"
    };
  }

  /**DidMount Function*/
  componentDidMount(){
    //Declaring fields
    let data = this.state.data;
    let newData = [
      {
        name: "Mountpoint 1",
        outages: []
      },
      {
        name: "Mountpoint 2",
        outages: []
      }
    ];

    //Iterating through data array
    for(let i = 0; i < data.length; i++){
      //Iterating through outages array
      for(let j = 0; j < data[i].outages.length; j++){
        //Calculating date
        data[i].outages[j].time = new Date(data[i].outages[j].time * 1000);

        //Checking for next outage
        if(j === (data[i].outages.length - 1)){
          //Adding outage
          newData[i].outages.push({
            time: data[i].outages[j].time,
            status: data[i].outages[j].status,
            next: data[i].outages[j].time,
            last: true
          });
        }else{
          //Adding outage
          newData[i].outages.push({
            time: data[i].outages[j].time,
            status: data[i].outages[j].status,
            next: new Date(data[i].outages[j + 1].time * 1000),
            last: false
          });
        }
      }
    }

    //Setting state
    this.setState({data: newData});
  }

  /**Rendering Component*/
  render(){
    return(
      <div className = {S.container}>
        <MountpointContainer data = {this.state.data[0]}
          width = {800}
          height = {400}
          graph = "graph1"
          open = {(d) => {this.setState({boxData: d, display: "display"})}}/>
        <MountpointContainer data = {this.state.data[1]}
          width = {800}
          height = {400}
          graph = "graph2"
          open = {(d) => {this.setState({boxData: d, display: "display"})}}/>
        <InfoBox data = {this.state.boxData}
          close = {() => {this.setState({display: "hidden"})}}
          visibility = {this.state.display}/>
      </div>
    );
  }
}
