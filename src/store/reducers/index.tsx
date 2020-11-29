import { combineReducers } from "redux";
import user from "./user";
import app from "./app";
import settings from "./settings";
import tagsView from "./tagsView";
import monitor from "./monitor";
export  interface State{
  user:Function,
  settings:Function,
  tagsView:Function,
  monitor:Function,
  app:Function
}
export default combineReducers({
  user,
  app,
  settings,
  tagsView,
  monitor
});