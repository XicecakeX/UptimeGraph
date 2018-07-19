import React from 'react';
import Container from './Container';
import Data from './data.js';

export default class App extends React.Component{
  /**Rendering Component*/
  render(){
    return(
      <Container data = {Data}
        width = {600}
        height = {350}
        margin = {200}/>
    );
  }
}
