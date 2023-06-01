import React, { useState } from 'react';

import { Poll } from 'shared/poll-types';
import { makeRequest } from '../api';
import { AppPage, actions } from '../state';

const Join: React.FC = () => {
  const [pollId, setPollId] = useState('');
  const [username, setUsername] = useState('');
  const [apiError, setApiError] = useState('');

  const areFieldsValid = (): boolean => {
    if (pollId.length < 6 || pollId.length > 6) {
      return false;
    }

    if (username.length < 1 || username.length > 25) {
      return false;
    }

    return true;
  };

  const handleJoinPoll = async () => {
    actions.startLoading();
    setApiError('');

    const { data, error } = await makeRequest<{
      poll: Poll;
      accessToken: string;
    }>('/polls/join', {
      method: 'POST',
      body: JSON.stringify({
        pollId,
        username,
      }),
    });

    if (error && error.statusCode === 400) {
      setApiError('Please make sure to include a poll topic!');
    } else if (error && !error.statusCode) {
      setApiError('Something went wrong. Please try again later.');
    } else {
      actions.initializePoll(data.poll);
      actions.setPollAccessToken(data.accessToken);
      actions.setPage(AppPage.WaitingRoom);
    }

    actions.stopLoading();
  };

  return (
    <div className="flex flex-col items-stretch justify-around w-full h-full max-w-sm mx-auto">
      <div className="mb-12">
        <div className="my-4">
          <h3 className="text-center">Enter Poll Code</h3>
          <div className="w-full text-center">
            <input
              maxLength={6}
              onChange={(e) => setPollId(e.target.value.toUpperCase())}
              className="w-full box info"
              autoCapitalize="characters"
              style={{ textTransform: 'uppercase' }}
            />
          </div>
        </div>
        <div className="my-4">
          <h3 className="text-center">Enter Username</h3>
          <div className="w-full text-center">
            <input
              maxLength={25}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full box info"
            />
          </div>
        </div>
        {apiError && (
          <p className="mt-8 font-light text-center text-red-600">{apiError}</p>
        )}
      </div>
      <div className="flex flex-col items-center justify-center my-12">
        <button
          disabled={!areFieldsValid()}
          className="w-32 my-2 box btn-orange"
          onClick={handleJoinPoll}
        >
          Join
        </button>
        <button
          className="w-32 my-2 box btn-purple"
          onClick={() => actions.startOver()}
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default Join;
