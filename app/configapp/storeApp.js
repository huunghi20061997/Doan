import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducerApp";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";



const loggerMiddleware = createLogger();
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
