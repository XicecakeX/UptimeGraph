import React from 'react';
import S from './index.module.css';
import {select} from 'd3-selection';

export default class Bars extends React.Component{
  /**WillMount Function*/
  componentDidMount(){
    //Calling createBars function
    this.createBars();
  }

  /**DidUpdate Function*/
  componentDidUpdate(){
    //Calling createBars function
    this.createBars();
  }

  /**createBars Function*/
  createBars = () => {
    //Declaring fields
    var height = this.props.height;
    var scales = this.props.scales;

    //Inserting bars
    select(this.bars)
      .selectAll("rect")
      .data(this.props.data)
      .enter().append("rect")
      .attr("class", (d) => {
        //Checking status
        if(d.status === "Online"){
          //Returning online color
          return S.online;
        }else{
          //Returning offline color
          return S.offline;
        }
      })
      .attr("x", (d) => {return scales.xScale(d.key)})
      .attr("y", (d) => {return scales.yScale(d.status)})
      .attr("width", scales.xScale.bandwidth())
      .attr("height", (d) => {
        //Checking status
        if(d.status === "Online"){
          //Returning height
          return height - scales.yScale(d.status) - (height / 2);
        }else{
          //Returning height
          return height - scales.yScale(d.status);
        }
      });
  }

  /**Rendering Component*/
  render(){
    return(
      <g ref = {(el) => {this.bars = el}} transform = {`translate(${this.props.margin}, 0)`}/>
    );
  }
}
