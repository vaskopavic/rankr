import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NominationForm from '../components/NominationForm';
import { Nominations } from 'shared/poll-types';

export default {
  title: 'NominationForm',
  component: NominationForm,
  argTypes: {
    onClose: { action: 'closing' },
    onSubmitNomination: { action: 'submitting nomination' },
    onRemoveNomination: { action: 'removing nomination' },
  },
  args: {
    userId: '1',
    isAdmin: false,
  },
} as ComponentMeta<typeof NominationForm>;

const nominations: Nominations = {
  item1: {
    userId: '1',
    text: 'Nominanationaroo 1',
  },
  item2: {
    userId: '2',
    text: 'Nominanationaroo 2',
  },
  item3: {
    userId: '3',
    text: 'Nominanationaroo 3',
  },
};

const Template: ComponentStory<typeof NominationForm> = (args) => (
  <div className="relative h-screen max-w-sm m-auto">
    <NominationForm {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Nomination Formaroo!',
  isOpen: true,
  nominations,
};
