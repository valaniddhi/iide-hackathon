import React, { Component } from 'react'
import {Button, Input, Typography} from 'antd'
import axios from 'axios'

export default class Home extends Component {
   constructor (props) {
      super(props);
      this.state = {
              lon: '',
              lat: '',
              error : null,
      }
    }
     componentDidMount() {
       if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(
             (position) => {
               this.setState({
                 lat: position.coords.latitude,
                 lon: position.coords.longitude,
                 error: null,
               });
               console.log(this.state.lat, this.state.lon)
             },
             (error) => this.setState(
               {error: error.message}
             )
           );
         }
     }
   //   handleClick = (dispatch , e) = >{
   //   }P

    onClickFind = () => {
      const {history}= this.props;
      const {lat,lon}= this.state;
      history.push(`/order/${lat}/${lon}`);
    }
 
   render() {
       return (
           <>
               <div className = "container">
                   <div className = "subcontainer">
                    <button onClick={this.onClickFind}>Find</button> 
                   </div>
               </div>
           </>
       )
   }
}