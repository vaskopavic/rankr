import React from 'react';
import { useSnapshot } from 'valtio';
import { devtools } from 'valtio/utils';

import './index.css';
import Pages from './Pages';
import { state } from './state';
import Loader from './components/ui/Loader';

devtools(state, 'app state');
const App: React.FC = () => {
  const currentState = useSnapshot(state);

  return (
    <>
      <Loader isLoading={currentState.isLoading} color="orange" width={120} />
      <Pages />
    </>
  );
};

export default App;
