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

    //Calculating dates
    data[0].outages.forEach((d) => {d.time = new Date(d.time * 1000)});
    data[1].outages.forEach((d) => {d.time = new Date(d.time * 1000)});

    //Setting state
    this.setState({data: data});
  }

  /**Rendering Component*/
  render(){
    return(
      <div className = {S.container}>
        <MountpointContainer data = {this.state.data[0]}
          width = {800}
          height = {400}
          open = {(d) => {this.setState({boxData: d, display: "display"})}}/>
        <MountpointContainer data = {this.state.data[1]}
          width = {800}
          height = {400}
          open = {(d) => {this.setState({boxData: d, display: "display"})}}/>
        <InfoBox data = {this.state.boxData}
          close = {() => {this.setState({display: "hidden"})}}
          visibility = {this.state.display}/>
      </div>
    );
  }
}
