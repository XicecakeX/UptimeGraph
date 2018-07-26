import React from 'react';
import S from './index.module.css';
import ClassNames from 'classnames';
import CloseButton from './CloseButton';

export default class InfoBox extends React.Component{
  /**loadData Function*/
  loadData = () => {
    //Declaring fields
    let status = "";
    let time = this.props.data.time.toString();

    //Checking status
    if(this.props.data.status === 1){
      //Setting status
      status = "Came online at:";
    }else{
      //Setting status
      status = "Went offline at:";
    }

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
    console.log(this.props.data.time);
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
