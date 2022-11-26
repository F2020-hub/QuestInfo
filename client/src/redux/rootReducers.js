import { combineReducers } from 'redux';

// import TrendsReducer from './culturewarrior/trends/reducers'
// import kanbanBoardReducer from './kanban/reducers';
import AuthReducer from './authentication/reducers'
import ProjectReducer from './Project/reducers'
import ProfileReducer from './profile/reducers';
import LeadReducer from './Leads/reducers';
import ReportReducer from './Report/reducers';
import ProjectPlatformReducer from './Project/projectPlatforms/reducers'

const rootReducers = combineReducers({

  // ChangeLayoutMode,
  PlatFormsProject:ProjectPlatformReducer,
  Reports:ReportReducer,
  Leads:LeadReducer,
  Projects:ProjectReducer,
  AdminProfiles:ProfileReducer,
  Auth:AuthReducer
});
export default rootReducers;
