import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {
  LiveProvider,
  LiveEditor,
} from 'react-live'
import LoadingOverlay from 'react-loading-overlay';

export default class RightView extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      code:'',
      loading: false
    }
  }


  updateMetrics = () => {
    this.setState({
      loading: true
    })
    axios.get('http://localhost:4000/metrics',{
      headers: {
        'Authorization':process.env.REACT_APP_SECRET
      }
    })
    .then(res=>{
        this.setState({
          code: res.data,
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
    clearInterval(this.interval)
  }

  componentDidMount(){
    this.updateMetrics()
    this.interval = setInterval(() => {
      this.updateMetrics()
    }, 30000);
  }

  render(){
      const { code, loading } = this.state
      return(
        <div>
          <LoadingOverlay
          active={loading}
          spinner
          >
            <LiveProvider code={code}>
              <LiveEditor />
            </LiveProvider>
          </LoadingOverlay>
        </div>
      )
  }
}