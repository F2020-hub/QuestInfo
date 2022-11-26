const actions = {
  // PROFILE_FRIENDS_BEGIN: 'PROFILE_FRIENDS_BEGIN',
  // PROFILE_FRIENDS_SUCCESS: 'PROFILE_FRIENDS_SUCCESS',
  // PROFILE_FRIENDS_ERR: 'PROFILE_FRIENDS_ERR',

  CHANGE_PASSWORD_BEGIN:"CHANGE_PASSWORD_BEGIN",
  CHANGE_PASSWORD_SUCCESS:"CHANGE_PASSWORD_SUCCESS",
  CHANGE_PASSWORD_ERR: "CHANGE_PASSWORD_ERR",

  UPDATE_PROFILE_ADMIN_BEGIN:"UPDATE_PROFILE_ADMIN_BEGIN",
  UPDATE_PROFILE_ADMIN_SUCCESS:"UPDATE_PROFILE_ADMIN_SUCCESS",
  UPDATE_PROFILE_ADMIN_ERR:"UPDATE_PROFILE_ADMIN_ERR",

  GET_PROFILE_ADMIN_BEGIN:"GET_PROFILE_ADMIN_BEGIN",
  GET_PROFILE_ADMIN_SUCCESS:"GET_PROFILE_ADMIN_SUCCESS",
  GET_PROFILE_ADMIN_ERR:"GET_PROFILE_ADMIN_ERR",

  // profileFriendsBegin: () => {
  //   return {
  //     type: actions.PROFILE_FRIENDS_BEGIN,
  //   };
  // },

  // profileFriendsSuccess: data => {
  //   return {
  //     type: actions.PROFILE_FRIENDS_SUCCESS,
  //     data
  //   };
  // },

  // profileFriendsErr: err => {
  //   return {
  //     type: actions.PROFILE_FRIENDS_ERR,
  //     err,
  //   };
  // },
  changePasswordBegin:()=>{
    return{
      type:actions.CHANGE_PASSWORD_BEGIN
    };
  },

  changePasswordSuccess:data=>{
    return{
      type:actions.CHANGE_PASSWORD_SUCCESS,
      data,
    };
  },

  changePasswordError:err=>{
    return{
      type:actions.CHANGE_PASSWORD_ERR,
      err,
    }
  },

  updateProfileAdminBegin:()=>{
    return{
      type:actions.UPDATE_PROFILE_ADMIN_BEGIN,
    };
  },

  updateProfileAdminSuccess:data=>{
    return{
      type:actions.UPDATE_PROFILE_ADMIN_SUCCESS,
      data,
    };
  },
  
  updateProfileAdminErr:err=>{
    return{
      type:actions.UPDATE_PROFILE_ADMIN_ERR,
      err,
    };
  },

  getProfileAdminBegin:()=>{
    return{
      type:actions.GET_PROFILE_ADMIN_BEGIN
    };
  },

  getProfileAdminSuccess:data=>{
    return{
      type:actions.GET_PROFILE_ADMIN_SUCCESS,
      data,
    };
  },

  getProfileAdminErr:err=>{
    return{
      type:actions.GET_PROFILE_ADMIN_ERR,
      err,
    };
  },
};

export default actions;
