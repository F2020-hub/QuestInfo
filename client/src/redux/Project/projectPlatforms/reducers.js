import Cookies from "js-cookie";
import actions from "./actions";

const {
  PLATFORM_BEGIN,
  PLATFORM_SUCCESS,
  PLATFORM_ERR,

  GET_PLATFORM_BEGIN,
  GET_PLATFORM_SUCCESS,
  GET_PLATFORM_ERR,



} = actions;

const initState = {
  listProjectPlatforms:{data:{}},
  loading: false,
  error: null,
};


/**
 *Cookies.get('logedIn')
 * @todo impure state mutation/explaination
 */

const ProjectPlatformReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
         
        case PLATFORM_BEGIN:
          return{
            ...state,
            loading:false
          };
        case PLATFORM_SUCCESS:
          return{
            ...state,
            listProjectPlatforms:data,
            loading:false
          };
          case PLATFORM_ERR:
            return{
              ...state,
          error:err,
          loading:false
            };
          case GET_PLATFORM_BEGIN:
            return{
              ...state,
            loading:false
            };
          case GET_PLATFORM_SUCCESS:
            return{
              ...state,
              listProjectPlatforms:data,
              loading:false
            };
          case GET_PLATFORM_ERR:
            return{
              ...state,
          error:err,
          loading:false
            }
    default:
      return state;
  }
};
export default ProjectPlatformReducer;
