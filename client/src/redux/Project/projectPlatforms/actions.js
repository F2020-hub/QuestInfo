

const actions = {



  PLATFORM_BEGIN:'PLATFORM_BEGIN',
  PLATFORM_SUCCESS:'PLATFORM_SUCCESS',
  PLATFORM_ERR:'PLATFORM_ERR',

  GET_PLATFORM_BEGIN:'GET_PLATFORM_BEGIN',
  GET_PLATFORM_SUCCESS:'GET_PLATFORM_SUCCESS',
  GET_PLATFORM_ERR:'GET_PLATFORM_ERR',


  platformBegin:()=>{
    return{
      type:actions.PLATFORM_BEGIN
    }
  },
  platformSuccess:(data)=>{
    return{
      type:actions.PLATFORM_SUCCESS,
      data:data,
    }
  },
  platformErr:(err)=>{
    return{
      type:actions.PLATFORM_ERR,
      err
    }
  },

  getplatformBegin:()=>{
    return{
      type:actions.GET_PLATFORM_BEGIN,
    }
  },

  getplatformSuccess:(data)=>{
    return{
      type:actions.GET_PLATFORM_SUCCESS,
      data:data,
    }
  },
  getplatformErr:(err)=>{
    return{
      type:actions.GET_PLATFORM_ERR,
      err
    }
  }






};



export default actions;
