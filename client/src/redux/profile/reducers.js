import actions from './actions';
// import toData from '../../demoData/friends.json';
// import posts from '../../demoData/post.json';

const initialState = {
  friends:{data:{}},
  loading: false,
  error: null,
};
// console.log(initialState,'initial State of PROFILE PAGE ')
const {

  CHANGE_PASSWORD_BEGIN,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERR,

  UPDATE_PROFILE_ADMIN_BEGIN,
  UPDATE_PROFILE_ADMIN_SUCCESS,
  UPDATE_PROFILE_ADMIN_ERR,

  GET_PROFILE_ADMIN_BEGIN,
  GET_PROFILE_ADMIN_SUCCESS,
  GET_PROFILE_ADMIN_ERR,
  // POST_DATA_BEGIN,
  // POST_DATA_SUCCESS,
  // POST_DATA_ERR,
} = actions;

const ProfileReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
   
    case CHANGE_PASSWORD_BEGIN:
      return{
        ...state,
        sLoading: true,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return{
        ...state,
        friends:data,
        sLoading: false,
      }
    case CHANGE_PASSWORD_ERR:
      return {
        ...state,
        error:err,
        sLoading: false,
      }
    case GET_PROFILE_ADMIN_BEGIN:
      return{
        ...state,
        sLoading:true
      };
    case GET_PROFILE_ADMIN_SUCCESS:
      // console.log(data,'inside the get profile reducer')
      return{
        ...state,
        friends:data,
        sLoading:false
      }
    case GET_PROFILE_ADMIN_ERR:
      return{
        ...state,
        error:err,
        sLoading:false
      }
      case UPDATE_PROFILE_ADMIN_BEGIN:
        return{
          ...state,
          sLoading:true,
        }
      case UPDATE_PROFILE_ADMIN_SUCCESS:
        // console.log(data,'this is the reducer of update file')
        return{
          ...state,
          friends:{data},
          sLoading:false,
        }
      case UPDATE_PROFILE_ADMIN_ERR:
        return{
          ...state,
          error:err,
          sLoading:false,
        }

    default:
      return state;
  }
};

// console.log(ProfileReducer,'Reducer data get profile')
export default ProfileReducer;
