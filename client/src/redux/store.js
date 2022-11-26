import { configureStore,applyMiddleware,compose } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducers';
import {deleteLeadsAdmin} from './Leads/actionCreator'

// (process.env.NODE_ENV === "development" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const reduxDevTool =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(thunk.withExtraArgument()))
    : compose(applyMiddleware(thunk.withExtraArgument()));

const store = configureStore({reducer:rootReducer}, reduxDevTool);
store.subscribe(()=> {console.log(store.getState())})
store.dispatch(deleteLeadsAdmin())

export default store;
