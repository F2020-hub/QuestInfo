

const actions = {

  
  GET_DASHBOARD_PLATFORM_BEGIN:"GET_DASHBOARD_PLATFORM_BEGIN",
    GET_DASHBOARD_PLATFORM_SUCCESS:"GET_DASHBOARD_PLATFORM_SUCCESS",
    GET_DASHBOARD_PLATFORM_ERR:"GET_DASHBOARD_PLATFORM_ERR",
  


    getProjectBegin:()=>{
      return{
        type:actions.GET_DASHBOARD_PLATFORM_BEGIN
      };
    },
    getProjectSuccess:(data)=>{
      return{
        type:actions.GET_DASHBOARD_PLATFORM_SUCCESS,
        data:data,
      };
    },
    getProjectErr:err=>{
      return{
        type:actions.GET_DASHBOARD_PLATFORM_ERR,
        err
      }
    },
  
  
  };
  
  
  
  export default actions;
  