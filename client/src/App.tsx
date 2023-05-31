import React from 'react';
import { devtools } from 'valtio/utils';

import Pages from './Pages';
import { state } from './state';

import './index.css';
import Welcome from './pages/Welcome';

devtools(state, 'app state');
const App: React.FC = () => <Pages />;

export default App;
