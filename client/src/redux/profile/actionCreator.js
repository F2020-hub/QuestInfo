import actions from './actions';
// import initialState from '../../demoData/friends.json';
import baseURL_Admin from '../baseURL_Admin'
import axios from 'axios'



const updatedProfileAdmin =(data)=>{
  return async dispatch=>{
    const config={
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
       
      },
     
    }
    try{
      const res = await axios.put(`${baseURL_Admin.baseURL}/editProfile`,data,config)
      return res;
    }
    catch(err){
      const er = err.response.data;
      return er;
    }
  }
}

const getDataProfileAdmin = () => async dispatch => {
  try {

    const res =  await axios.get(`${baseURL_Admin.baseURL}/profile`,{
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    // console.log("api is workinbg profile" , res)
    return res.data;
  } catch (err) {
    const er = err.response.data;
    return err;
  }
};

  const changePasswordAdmin=(data)=> async dispatch=>{
      const config={
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
      try{
        var res= await axios.put(`${baseURL_Admin.baseURL}/changePassword`,data,config)
        return res.data;
      }
        catch(err) {
        const er = err.response.data;
        return er
        };
      };


export {  getDataProfileAdmin,updatedProfileAdmin,changePasswordAdmin };
