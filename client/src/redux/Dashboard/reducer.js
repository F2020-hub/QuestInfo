import Cookies from "js-cookie";
import actions from "./actions";

const {

    GET_DASHBOARD_PLATFORM_BEGIN,
    GET_DASHBOARD_PLATFORM_SUCCESS,
    GET_DASHBOARD_PLATFORM_ERR,




} = actions;

const initState = {
  PlatformDashboard:[],
  loading: false,
  error: null,
};


/**
 *Cookies.get('logedIn')
 * @todo impure state mutation/explaination
 */

const ProjectReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
   
      case GET_DASHBOARD_PLATFORM_BEGIN:
        return{
          ...state,
          loading:false
        };
        case GET_DASHBOARD_PLATFORM_SUCCESS:
          return{
            ...state,
            PlatformDashboard:data,
            loading:false
          };
          case GET_DASHBOARD_PLATFORM_ERR:
          
        return{
          ...state,
          error:err,
          loading:false
        };
    default:
      return state;
  }
};
export default ProjectReducer;
