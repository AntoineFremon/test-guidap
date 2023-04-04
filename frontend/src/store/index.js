import { createStore, createLogger } from 'vuex';
import leisures from './modules/leisures';
import activities from './modules/activities';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
    modules: {
        leisures,
        activities
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});
