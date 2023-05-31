import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ResultsList from '../components/ResultsList';
import { Results } from 'shared/poll-types';

export default {
  title: 'ResultsList',
  component: ResultsList,
} as ComponentMeta<typeof ResultsList>;

const Template: ComponentStory<typeof ResultsList> = (args) => (
  <div className="h-screen max-w-sm m-auto">
    <ResultsList {...args} />
  </div>
);

const results: Results = [
  {
    votes: [
      {
        nominationId: '1',
        count: 3,
        text: 'Taco Bell',
      },
      {
        nominationId: '2',
        count: 2,
        text: 'Del Taco',
      },
      {
        nominationId: '3',
        count: 1,
        text: "Papa's Tacos",
      },
      {
        nominationId: '4',
        count: 1,
        text: 'Los Taqueros Locos con Nomre Largo',
      },
    ],
    totalVotes: 7,
  },
  {
    votes: [
      {
        nominationId: '1',
        count: 3,
        text: 'Taco Bell',
      },
      {
        nominationId: '2',
        count: 2,
        text: 'Del Taco',
      },
      {
        nominationId: '4',
        count: 2,
        text: "Papa's Tacos",
      },
    ],
    totalVotes: 7,
  },
  {
    votes: [
      {
        nominationId: '4',
        count: 4,
        text: "Papa's Tacos",
      },
      {
        nominationId: '1',
        count: 3,
        text: 'Taco Bell',
      },
    ],
    totalVotes: 7,
  },
];

export const ResultsBasic = Template.bind({});
ResultsBasic.args = {
  results: results,
};

const resultsLong: Results = [
  {
    votes: [
      {
        nominationId: '1',
        count: 10,
        text: 'Taco Bell',
      },
      {
        nominationId: '2',
        count: 8,
        text: 'Del Taco',
      },
      {
        nominationId: '3',
        count: 5,
        text: "Papa's Tacos",
      },
      {
        nominationId: '4',
        count: 4,
        text: 'Los Taqueros Locos con Nomre Largo',
      },
      {
        nominationId: '5',
        count: 4,
        text: 'Chicky-Chicken-Filet',
      },
      {
        nominationId: '6',
        count: 3,
        text: 'Mad Clown Burger',
      },
      {
        nominationId: '7',
        count: 3,
        text: 'Thai Basil #0005',
      },
      {
        nominationId: '8',
        count: 2,
        text: 'Sichuan Spice',
      },
      {
        nominationId: '9',
        count: 0,
        text: 'Not Good Curry',
      },
      {
        nominationId: '10',
        count: 0,
        text: 'Not Good Soul Food',
      },
      {
        nominationId: '11',
        count: 0,
        text: 'Not Good Sushi',
      },
      {
        nominationId: '12',
        count: 0,
        text: 'Not Good Falafel',
      },
      {
        nominationId: '13',
        count: 0,
        text: 'Not Good Steakhouse',
      },
      {
        nominationId: '14',
        count: 0,
        text: 'Not Good Burgers',
      },
    ],
    totalVotes: 39,
  },
  {
    votes: [
      {
        nominationId: '1',
        count: 3,
        text: 'Taco Bell',
      },
      {
        nominationId: '2',
        count: 2,
        text: 'Del Taco',
      },
      {
        nominationId: '4',
        count: 2,
        text: "Papa's Tacos",
      },
    ],
    totalVotes: 7,
  },
];

export const ResultsLong = Template.bind({});
ResultsLong.args = {
  results: resultsLong,
};
