import Cookies from "js-cookie";
import actions from "./actions";

const {
  PROJECT_BEGIN,
  PROJECT_SUCCESS,
  PROJECT_ERR,

  GET_PROJECT_BEGIN,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_ERR,




} = actions;

const initState = {
  listProject:[],
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
    case PROJECT_BEGIN:
      return {
        ...state,
        loading: false,
      };
    case PROJECT_SUCCESS:
      return {
        ...state,
        listProject: data,
        loading: false,
      };
    case PROJECT_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    
      case GET_PROJECT_BEGIN:
        return{
          ...state,
          loading:false
        };
        case GET_PROJECT_SUCCESS:
          return{
            ...state,
            listProject:data,
            loading:false
          };
          case GET_PROJECT_ERR:
          
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
