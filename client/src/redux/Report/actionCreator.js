import axios from 'axios';
import baseURL_Admin from '../baseURL_Admin'
// const {
//     reportBgin, reportSuccess,reportErr,
//   } = actions;


// const ReportAdmin = (data) => async dispatch => {
//   try {
//     const config={
//       headers:{
//         'Content-Type': 'application/json',
//         'authorization': `Bearer ${localStorage.getItem('token')}`
//       }
//     }
//     const res =  await axios.get(`${baseURL_Admin.baseURL}/reports`,data,config)
//     console.log("api is workinbg" , res.data)
//     return res.data;
//   } catch (err) {
//     const er = err.response.data;
//     return er;
//   }
// };

const ReportAdmin = (data) => async dispatch => {
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    };
    console.log("api is workinbg" , config.headers)
    const res =  await axios.post(`${baseURL_Admin.baseURL}/reports`,data,config)
    console.log(res,'API is working for Report')
    return res.data;
  } catch (err) {
    const er = err.response;
    return er;
  }
};
// const ReportAdmin = (data) => async dispatch => {
//   try {
//     const res =  await axios.get(`${baseURL_Admin.baseURL}/reports`,data,{
//       headers: {
//         'authorization': `Bearer ${localStorage.getItem('token')}`
//       }
//     })
//     console.log(res,'Get Project Report Action')

//     return res.data;
//   } catch (err) {
//     const er = err.response.data;
//     return er;
//   }
// };

export { ReportAdmin };
