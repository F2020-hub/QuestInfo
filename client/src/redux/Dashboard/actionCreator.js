


import axios from 'axios';
import baseURL_Admin from '../baseURL_Admin'



  const GetProjectFormDashboard  = (project_id,platform_id) => async dispatch => {
    try {
  
      const res =  await axios.get(`${baseURL_Admin.baseURL}/leadsPerProject/${project_id}/${platform_id}`,{
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log("api is workinbg Dashboard " , res.data)
      return res.data;
    } catch (err) {
    const er = err.response.data;
      return er;
   
    }
  };



  export { GetProjectFormDashboard}