import actions from './actions';
import axios from 'axios';
import baseURL_Admin from '../../baseURL_Admin'
const { 
    platformBegin, platformSuccess,platformErr,
  } = actions;


const PlatformsAdded=(data)=>{
  return async dispatch=>{
    try{
      dispatch(platformBegin());
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`

        }
    };
    try{
     var res = await axios.post(`${baseURL_Admin.baseURL}/addPlatform`,data,config)
     if(res.data && res.data.success == true){
         dispatch(platformSuccess(data))
     }
     return res.data;
    
    
    }
    catch(err){
      const er = err.response.data;

      return er;
    }
  }
  catch(err){
    dispatch(platformErr(err))
  }
};
};



const getPlatfromForAdmin = () => async dispatch => {
  try {

    const res =  await axios.get(`${baseURL_Admin.baseURL}/platform`,{
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    // console.log("api is workinbg" , res)
    return res.data;
  } catch (err) {
    return err;
  }
};





export { PlatformsAdded,getPlatfromForAdmin };
