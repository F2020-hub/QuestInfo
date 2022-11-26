const actions = {
  LEAD_BEGIN: 'LEAD_BEGIN',
  LEAD_SUCCESS: 'LEAD_SUCCESS',
  LEAD_ERR: 'LEAD_ERR',

  DELETE_IMPORT_BEGIN:"DELETE_IMPORT_BEGIN",
  DELETE_IMPORT_SUCCESS:"DELETE_IMPORT_SUCCESS",
  DELETE_IMPORT_ERR:"DELETE_IMPORT_ERR",

  deleteleadBegin:()=>{
    return{
      type:actions.DELETE_IMPORT_BEGIN
    };
  },

  deleteleadSuccess:(data)=>{
    return{
      type:actions.DELETE_IMPORT_SUCCESS,
      data:data,
    };
  },
  deleteleadErr:err=>{
    return{
      type:actions.DELETE_IMPORT_ERR,
      err
    }
  }

};



export default actions;
