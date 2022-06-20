import {combineReducers} from "redux";
import {tareas} from "./tarea.reducers";
const rootReducer = combineReducers({
    tareas,
});

export default rootReducer;