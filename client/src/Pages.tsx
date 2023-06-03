import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useSnapshot } from 'valtio';

import Welcome from './pages/Welcome';
import Create from './pages/Create';
import Join from './pages/Join';
import { WaitingRoom } from './pages/WaitingRoom';
import { Voting } from './pages/Voting';
import { Results } from './pages/Results';
import { AppPage, actions, state } from './state';

const routeConfig = {
  [AppPage.Welcome]: Welcome,
  [AppPage.Create]: Create,
  [AppPage.Join]: Join,
  [AppPage.WaitingRoom]: WaitingRoom,
  [AppPage.Voting]: Voting,
  [AppPage.Results]: Results,
};

const Pages: React.FC = () => {
  const currentState = useSnapshot(state);

  useEffect(() => {
    if (
      currentState.me?.id &&
      currentState.poll &&
      !currentState.poll?.hasStarted
    ) {
      actions.setPage(AppPage.WaitingRoom);
    }

    if (currentState.me?.id && currentState.poll?.hasStarted) {
      actions.setPage(AppPage.Voting);
    }
    if (currentState.me?.id && currentState.hasVoted) {
      actions.setPage(AppPage.Results);
    }
  }, [
    currentState.me?.id,
    currentState.poll?.hasStarted,
    currentState.hasVoted,
  ]);

  return (
    <>
      {Object.entries(routeConfig).map(([page, Component]) => (
        <CSSTransition
          key={page}
          in={page === currentState.currentPage}
          timeout={300}
          classNames="page"
          unmountOnExit
        >
          <div className="max-w-screen-sm px-4 py-8 mx-auto overflow-y-auto page mobile-height">
            <Component />
          </div>
        </CSSTransition>
      ))}
    </>
  );
};

export default Pages;
