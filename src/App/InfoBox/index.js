import React from 'react';
import S from './index.module.css';
import ClassNames from 'classnames';
import {timeFormat} from 'd3-time-format';
import CloseButton from './CloseButton';

export default class InfoBox extends React.Component{
  /**loadData Function*/
  loadData = () => {
    //Declaring fields
    let time = this.props.data.time;
    let status = "";
    let tf = {
      weekday: timeFormat("%a"),
      month: timeFormat("%b"),
      day: timeFormat("%e"),
      year: timeFormat("%Y"),
      time: timeFormat("%X")
    };

    //Checking status
    if(this.props.data.status === 1){
      //Setting status
      status = "Came online at:";
    }else{
      //Setting status
      status = "Went offline at:";
    }

    //Formatting time
    time = tf.weekday(time).toString() + ". "
            + tf.month(time).toString() + ". "
            + tf.day(time).toString() + ", "
            + tf.year(time).toString() + " "
            + tf.time(time).toString();

    //Returning data
    return(
      <div className = {S.item}>
        <div className = {S.title}> {status}</div>
        <div className = {S.label}> {time}</div>
      </div>
    );
  }

  /**Rendering Component*/
  render(){
    return(
      <div className = {ClassNames(S[this.props.visibility], S.popup)}>
        <div className = {S.content}>
          <div className = {S.data}>
            {this.loadData()}
            <div className = {S.buttons}>
              <CloseButton handleClick = {this.props.close}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
