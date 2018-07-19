import React from 'react';
import {axisLeft} from 'd3-axis';
import {select} from 'd3-selection';

export default class YAxis extends React.Component{
  /**WillMount Function*/
  componentDidMount(){
    //Calling createAxis function
    this.createAxis();
  }

  /**DidUpdate Function*/
  componentDidUpdate(){
    //Calling createAxis function
    this.createAxis();
  }

  /**createAxis Function*/
  createAxis = () => {
    //Creating y-axis
    var yAxis = axisLeft()
                  .scale(this.props.scale)
                  .tickSizeInner(7)
                  .tickSizeOuter(0);

    //Inserting y-axis
    select(this.axisElement)
      .attr("transform", "translate(" + this.props.margin + ", 0)")
      .call(yAxis);
  }

  /**Rendering Component*/
  render(){
    return(
      <g ref = {(el) => {this.axisElement = el}}/>
    );
  }
}
