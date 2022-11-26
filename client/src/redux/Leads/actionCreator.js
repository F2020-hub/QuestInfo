import actions from './actions';
import axios from 'axios';
import baseURL_Admin from '../baseURL_Admin'
const{deleteleadSuccess} = actions;


const AddNewLead = (data) => async dispatch => {

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      };

      try{
        var res =  await axios.post(`${baseURL_Admin.baseURL}/addLead`,data,config)
        console.log(res,'this is action api')
          return res;
          }
    catch(err){
        const er = err.res.data;
        return er;
    }
}

const ImportLeads = (data,project_id,platform_id) => async dispatch => {

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      };
      try{
         var res = await axios.post(`${baseURL_Admin.baseURL}/importLeads/${project_id}/${platform_id}`,data,config)
         console.log(res,'API IS WORKING')
        return res.data;
      }
    catch(err){
        const er = err.response.data;
        return er;
    }
}

const getLeadsForAdmin = (page) => async dispatch => {
  try {
    // ?page=${page}
    const res =  await axios.get(`${baseURL_Admin.baseURL}/leads`,{
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(res,'this is the list pagination')
    return res.data;
  } catch (err) {
    const er = err.response.data;
    return er;
  }
};


const getLeadsById = (id) => async dispatch => {
  try {
    // ?page=${page}
    const res =  await axios.get(`${baseURL_Admin.baseURL}/leadById/${id}`,{
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(res,'Get Lead By Id Action')

    return res.data;
  } catch (err) {
    const er = err.response.data;
    return er;
  }
};


// leadById/:id

const UpdateLeadsAdmin=(id , data)=> async dispatch =>{
  try{
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    };
     const res = await axios.put(`${baseURL_Admin.baseURL}/editLeads/${id}` ,data , config)
     console.log(res,'UPDATE LEADS')
     return res
  }catch(err){
    const er = err.response.data;
    return er;
  }
};


const deleteLeadsAdmin=(id)=> async dispatch=>{
  const config={
    headers:{
      'authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }
  try{
    var res= await axios.delete(`${baseURL_Admin.baseURL}/deleteLead/${id}`,config)
    console.log(res,'deleted backend')
    return res;
  }  
    catch(err) {
    const er = err.response.data;
    return er
    };
  };

export { AddNewLead,getLeadsForAdmin,ImportLeads,UpdateLeadsAdmin,getLeadsById,deleteLeadsAdmin };
