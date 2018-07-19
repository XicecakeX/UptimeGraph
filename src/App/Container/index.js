import React from 'react';
import {scaleBand} from 'd3-scale';
import XAxis from './XAxis';
import YAxis from './YAxis';
import Bars from './Bars';

export default class Container extends React.Component{
  /**Rendering Component*/
  render(){
    //Declaring fields
    var data = this.props.data;
    var width = this.props.width - this.props.margin;
    var height = this.props.height - this.props.margin;

    //Creating x-scale
    var xScale = scaleBand()
                    .domain(data.map((d) => {return d.key}))
                    .range([0, width])
                    .padding(0.4);

    //Creating y-scale
    var yScale = scaleBand()
                    .domain(["Offline", "Online"])
                    .range([height, 0]);

    return(
      <svg width = {this.props.width}
        height = {this.props.height}
        transform = {`translate(${100}, ${100})`}>
        <XAxis scale = {xScale} height = {height} margin = {this.props.margin}/>
        <YAxis scale = {yScale} margin = {this.props.margin}/>
        <Bars scales = {{xScale: xScale, yScale: yScale}}
          height = {height}
          data = {data}
          margin = {this.props.margin}/>
      </svg>
    );
  }
}
