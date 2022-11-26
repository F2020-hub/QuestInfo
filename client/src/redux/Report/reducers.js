import Cookies from "js-cookie";
import actions from "./actions";

const {
  REPORT_BEGIN,
  REPORT_SUCCESS,
  REPORT_ERR,

} = actions;

const initState = {
  listLeads:[],
  loading: false,
  error: null,
};

const ReportReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case REPORT_BEGIN:
      return {
        ...state,
        loading: false,
      };
    case REPORT_SUCCESS:
      return {
        ...state,
        listLeads: data,
        loading: false,
      };
    case REPORT_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export default ReportReducer;
