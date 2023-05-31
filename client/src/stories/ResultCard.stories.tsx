import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ResultCard from '../components/ui/ResultCard';
import { RoundResult } from 'shared/poll-types';

export default {
  title: 'ResultCard',
  component: ResultCard,
} as ComponentMeta<typeof ResultCard>;

const Template: ComponentStory<typeof ResultCard> = (args) => (
  <div className="h-screen max-w-sm m-auto">
    <ResultCard {...args} />
  </div>
);

const result: RoundResult = {
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
};

export const ResultCardShort = Template.bind({});
ResultCardShort.args = {
  result,
};

const resultLong = {
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
};

export const ResultCardLong = Template.bind({});
ResultCardLong.args = {
  result: resultLong,
};
