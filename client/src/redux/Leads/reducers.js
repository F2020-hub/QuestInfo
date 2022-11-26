import Cookies from "js-cookie";
import actions from "./actions";

const {
  DELETE_IMPORT_SUCCESS,
} = actions;

const initState = {
  listLeads:null,
  loading: false,
  error: null,
};

/**
 *Cookies.get('logedIn')
 * @todo impure state mutation/explaination
 */
const LeadReducer = (state = initState, action) => {
  const { type, data } = action;
  switch (type) {

    case DELETE_IMPORT_SUCCESS:
      return{
        ...state,
        listLeads:data,
        loading: false,
      };
    
    default:
      return state;
  }
};
export default LeadReducer;
