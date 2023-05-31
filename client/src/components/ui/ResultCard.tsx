import React, { useState } from 'react';

import { RoundResult } from 'shared/poll-types';

type ResultCard = {
  result: DeepReadonly<RoundResult>;
};

const ResultCard: React.FC<ResultCard> = ({ result }) => {
  const [showPercent, setShowPercent] = useState(false);
  const totalVotes = result.totalVotes;

  return (
    <>
      <div className="grid grid-cols-3 gap-4 pb-2 pr-4 my-2 border-b-2 border-solid border-purple-70">
        <div className="col-span-2 font-semibold">Candidate</div>
        <div className="col-span-1 font-semibold text-right">
          <button
            onClick={() => setShowPercent(false)}
            className={showPercent ? '' : 'text-orange-700'}
          >
            Count
          </button>
          {' / '}
          <button
            onClick={() => setShowPercent(true)}
            className={showPercent ? 'text-orange-700' : ''}
          >
            %
          </button>
        </div>
      </div>
      <div className="pr-4 overflow-y-auto divide-y-2">
        {result.votes.map((candidate) => (
          <div
            key={candidate.nominationId}
            className="grid items-center grid-cols-3 gap-4 my-1"
          >
            <div className="col-span-2">{candidate.text}</div>
            <div className="col-span-1 text-right">
              {showPercent
                ? ((candidate.count / totalVotes) * 100).toFixed(2)
                : candidate.count}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ResultCard;
