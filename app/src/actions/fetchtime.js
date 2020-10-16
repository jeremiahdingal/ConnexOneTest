import axios from 'axios';

export function getEpoch(){
    axios.get('http://localhost:5000/time')
    .then(res=>{
        console.log(res)
    })
}