import React from 'react';
import {axisBottom} from 'd3-axis';
import {select} from 'd3-selection';

export default class XAxis extends React.Component{
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
    //Creating x-axis
    var xAxis = axisBottom()
                  .scale(this.props.scale)
                  .tickSizeInner(7)
                  .tickSizeOuter(0);

    //Inserting x-axis
    select(this.axisElement)
      .attr("transform", "translate(" + this.props.margin + ", " + this.props.height + ")")
      .call(xAxis);
  }

  /**Rendering Component*/
  render(){
    return(
      <g ref = {(el) => {this.axisElement = el}}/>
    );
  }
}
