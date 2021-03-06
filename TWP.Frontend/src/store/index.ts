import common from "features/common/reducers";
import layout from "features/layout/reducers";
import songsApi from "features/songs/api";
import songs from "features/songs/reducers";
import UserAction from "features/user/actions";
import userApi from "features/user/api";
import user from "features/user/reducers";
import { applyMiddleware, combineReducers, createStore as createReduxStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { StateType } from "typesafe-actions";

export type Action = UserAction;

const rootReducer = combineReducers({
    common,
    layout,
    songs,
    user,
});

const api = { ...songsApi, ...userApi };

const createStore = () =>
    createReduxStore(rootReducer, composeWithDevTools({ trace: true })(applyMiddleware(thunk.withExtraArgument(api))));

export type RootState = StateType<typeof rootReducer>;
export default createStore;
