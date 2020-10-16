import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import moment from 'moment'
import LoadingOverlay from 'react-loading-overlay';


export default class RightView extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      time:'',
      clock: 0,
      loading: false
    }
  }

  formatClock = (epoch) =>{
    return moment().hour(0).minute(0).second(epoch).format('HH : mm : ss');
  }
  updateClock = () => {
    this.clockInterval = setInterval(() => {
      this.setState({
        clock: this.state.clock + 1
      })
    }, 1000);
  }

  updateTime = () => {
    this.setState({
      loading: true
    })
    axios.get('http://localhost:4000/time',{
      headers: {
        'Authorization':process.env.REACT_APP_SECRET
      }
    })
    .then(res=>{
        this.setState({
          time: res.data.epoch,
          clock:  Math.floor(new Date().valueOf()/1000) - res.data.epoch,
          loading: false
        })
        
    })
    .catch(err=>{
      console.log(err)
      this.setState({
        loading: false
      })
    })
  }

  componentWillUnmount(){
    clearInterval(this.timeInterval)
    clearInterval(this.clockInterval)
  }

  componentDidMount(){
    console.log(new Date()/1000)
    this.updateTime()
    this.updateClock()
    this.timeInterval = setInterval(() => {
      this.updateTime()
    }, 30000);
  }

  render(){
      const { time, clock, loading } = this.state
      return(
        <div>
          <LoadingOverlay
          active={loading}
          spinner
          >
            <Card body>
              <div>
                Latest Fetch Server Epoch: {time}
              </div>
              <div>
                Local Clock Difference: {this.formatClock(clock)}
              </div>
            </Card>
          </LoadingOverlay>
        </div>
      )
  }
}