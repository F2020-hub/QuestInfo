import axios from 'axios';
import actions from './actions';
import baseURL_Admin from '../baseURL_Admin'
const { 
    getProjectBegin, getProjectSuccess,getProjectErr,
  } = actions;

  
const AddNewProject = (data) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    };
    const res = await axios.post(`${baseURL_Admin.baseURL}/addProject`,data,config)
    return res.data;
  } catch (err) {
    const er = err.response.data;
    return er;
  }
};


const GetProjectAdmin = () => async dispatch => {
  try {

    const res =  await axios.get(`${baseURL_Admin.baseURL}/project`,{
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    // console.log("api is workinbg project " , res)
    return res.data;
  } catch (err) {
    const er = err.response.data;
    return er;
 
  }
};

const getProjectsForAdmin = () => async dispatch => {
  try {

    const res =  await axios.get(`${baseURL_Admin.baseURL}/project`,{
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    // console.log("api is workinbg" , res)
    return res.data;
  } catch (err) {
    const er = err.response.data;
    return er;
  }
};

const getProjectsById = (id) => async dispatch => {
  try {

    const res =  await axios.get(`${baseURL_Admin.baseURL}/projectById/${id}`,{
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log("api is workinbg" , res)
    return res.data;
  } catch (err) {
    const er = err.response.data;
    return er;
  }
};

const UpdateStatusAdmin=(id , data)=> async dispatch =>{
  try{
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    };
     const res = await axios.put(`${baseURL_Admin.baseURL}/project/${id}` ,data , config)
     console.log(res,'UPDATE LEADS')
     return res
  }catch(err){
    const er = err.response.data;
    return er;
  }
};


export { AddNewProject,GetProjectAdmin , getProjectsForAdmin,getProjectsById,UpdateStatusAdmin };
