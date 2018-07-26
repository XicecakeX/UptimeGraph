import React from 'react';
import S from './index.module.css';

export default class CloseButton extends React.Component{
  /**Rendering Component*/
  render(){
    return(
      <input type = "button"
        value = "Close"
        className = {S.button}
        id = "btnClose"
        onClick = {this.props.handleClick}/>
    );
  }
}
