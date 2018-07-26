import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import {axisBottom, axisLeft} from 'd3-axis';
import {min, max} from 'd3-array';
import {scaleBand, scaleTime} from 'd3-scale';
import {select} from 'd3-selection';
import {timeFormat} from 'd3-time-format';
import S from './index.module.css';

export default class MountpointContainer extends React.Component{
  /**createGraph Function*/
  createGraph = () => {
    //Declaring fields
    let data = this.props.data;
    let outages = data.outages;
    let margin = 100;
    let width = this.props.width;
    let height = this.props.height;
    let time = timeFormat("%X");

    //Creating element
    const div = new ReactFauxDOM.createElement("div");

    //Creating x-scale
    let xScale = scaleTime().range([0, (width - margin)]);

    //Creating y-scale
    let yScale = scaleBand().range([(height - margin), 0]);

    //Creating x-axis
    let xAxis = axisBottom()
      .scale(xScale)
      .ticks(15)
      .tickFormat(time)
      .tickSizeInner(7)
      .tickSizeOuter(0);

    //Creating y-axis
    let yAxis = axisLeft()
      .scale(yScale)
      .tickSizeInner(7)
      .tickSizeOuter(0);

    //Creating SVG element
    let svg = select(div).append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(50, 50)");

    //Calculating minimum value
    let minTime = min(outages, (d) => {return Math.min(d.time)});

    //Calculating maximum value
    let maxTime = max(outages, (d) => {return Math.max(d.time)});

    //Setting domain of x-scale
    xScale.domain([minTime, maxTime]);

    //Setting domain of y-scale
    yScale.domain(["Offline", "Online"]);

    //Inserting x-axis
    svg.append("g")
      .attr("transform", `translate(0, ${(height - 100)})`)
      .call(xAxis)
      .attr("class", S.axisBottom);

    //Inserting y-axis
    svg.append("g").call(yAxis);

    //Inserting bars
    svg.selectAll("rect")
      .data(outages)
      .enter().append("rect")
      .attr("class", (d) => {
        //Checking status
        if(d.status === 1){
          //Returning green
          return S.online;
        }else{
          //Returning red
          return S.offline;
        }
      })
      .attr("x", (d) => {return xScale(d.time)})
      .attr("y", (d) => {
        //Checking status
        if(d.status === 1){
          //Returning online
          return yScale("Online");
        }else{
          //Returning offline
          return yScale("Offline");
        }
      })
      .attr("width", 10)
      .attr("height", ((height - margin) / 2))
      .on("click", (d) => {this.props.open(d)});

    //Converting to react
    return div.toReact()
  }

  /**Rendering Component*/
  render(){
    return this.createGraph();
  }
}
