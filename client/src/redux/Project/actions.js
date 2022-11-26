

const actions = {

  PROJECT_BEGIN: 'PROJECT_BEGIN',
  PROJECT_SUCCESS: 'PROJECT_SUCCESS',
  PROJECT_ERR: 'PROJECT_ERR',

  GET_PROJECT_BEGIN:"GET_PROJECT_BEGIN",
  GET_PROJECT_SUCCESS:"GET_PROJECT_SUCCESS",
  GET_PROJECT_ERR:"GET_PROJECT_ERR",


  projectBegin: () => {
    return {
      type: actions.PROJECT_BEGIN,
    };
  },
  projectSuccess: data => {
    return {
      type: actions.PROJECT_SUCCESS,
      data,
    };
  },
  projectErr: err => {
    return {
      type: actions.PROJECT_ERR,
      err,
    };
  },


  getProjectBegin:()=>{
    return{
      type:actions.GET_PROJECT_BEGIN
    };
  },
  getProjectSuccess:(data)=>{
    return{
      type:actions.GET_PROJECT_SUCCESS,
      data:data,
    };
  },
  getProjectErr:err=>{
    return{
      type:actions.GET_PROJECT_ERR,
      err
    }
  },


};



export default actions;
