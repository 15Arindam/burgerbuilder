import { combineReducers} from 'redux';
import Ingds from './reducers/Ingds';
import Orders from './reducers/order';
import Auth from './reducers/auth';
import alerts from './reducers/alerts';

const rootReducer = combineReducers({
    Ingds,Orders,Auth,alerts
})

export default rootReducer;