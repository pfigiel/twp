import common from "features/common/reducers";
import { combineReducers, createStore as createReduxStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { StateType } from "typesafe-actions";

const rootReducer = combineReducers({
    common,
});

const createStore = () => createReduxStore(rootReducer, composeWithDevTools({ trace: true })());

export type RootState = StateType<typeof rootReducer>;
export default createStore;
