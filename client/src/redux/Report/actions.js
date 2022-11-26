const actions = {
  REPORT_BEGIN: 'REPORT_BEGIN',
  REPORT_SUCCESS: 'REPORT_SUCCESS',
  REPORT_ERR: 'REPORT_ERR',


  reportBgin: () => {
    return {
      type: actions.REPORT_BEGIN,
    };
  },
  reportSuccess: data => {
    return {
      type: actions.REPORT_SUCCESS,
      data,
    };
  },
  reportErr: err => {
    return {
      type: actions.REPORT_ERR,
      err,
    };
  },

};



export default actions;
