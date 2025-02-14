import dva from 'dva';
import { createBrowserHistory as createHistory } from 'history';

import './index.css';

// 1. Initialize
const app = dva({
    history : createHistory()
});

// 2. Plugins
// app.use({});

// 3. Model
require('./models').default.map( key => app.model(key.default) )

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
