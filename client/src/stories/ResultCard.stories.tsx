import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ResultCard from '../components/ui/ResultCard';
import { Results } from 'shared/poll-types';

export default {
  title: 'ResultCard',
  component: ResultCard,
} as ComponentMeta<typeof ResultCard>;

const Template: ComponentStory<typeof ResultCard> = (args) => (
  <div className="h-screen max-w-sm m-auto">
    <ResultCard {...args} />
  </div>
);

const results: Results = [
  {
    nominationId: '1',
    score: 5.0,
    nominationText: 'Taco Bell',
  },
  {
    nominationId: '2',
    score: 2.56,
    nominationText: 'Del Taco',
  },
  {
    nominationId: '3',
    score: 2.4,
    nominationText: "Papa's Tacos",
  },
  {
    nominationId: '4',
    score: 1.55,
    nominationText: 'Los Taqueros Locos con Nombre Largo',
  },
  {
    nominationId: '5',
    score: 1.41,
    nominationText: 'El Vilsito',
  },
  {
    nominationId: '6',
    score: 1.11,
    nominationText: 'Tacos El Güero',
  },
  {
    nominationId: '7',
    score: 0.0,
    nominationText: 'Taqueria del Mercado',
  },
];

export const ResultCardLong = Template.bind({});
ResultCardLong.args = {
  results,
};
