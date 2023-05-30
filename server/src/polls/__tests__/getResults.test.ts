import { Nominations, Rankings } from 'shared/poll-types';
import getResults from '../getResults';

describe('getResults', () => {
  it('computes and sorts results', () => {
    const nominations: Nominations = {
      '01': {
        userId: 'user1',
        text: 'nomination1',
      },
      '02': {
        userId: 'user2',
        text: 'nomination2',
      },
      '03': {
        userId: 'user3',
        text: 'nomination3',
      },
      '04': {
        userId: 'user4',
        text: 'nomination4',
      },
    };

    const rankings: Rankings = {
      participant1: ['02', '01', '03'],
      participant2: ['04', '01', '02'],
      participant3: ['03', '02', '01'],
      participant4: ['02', '04', '01'],
    };

    // Vote 0 -> 1, Vote 1 -> 0.6944, Vote 2 -> 0.2963
    // 01. 0*1 + 2*0.6944 + 2*0.2964 = 1.981
    // 02. 2*1 + 1*0.6944 + 1*0.2964 = 2.991
    // 03. 1*1 + 0*0.6944 + 1*0.2964 = 1.296
    // 04. 1*1 + 1*0.6944 + 0*0.2964 = 1.694

    const results = getResults(rankings, nominations, 3);

    // doing it this way because we need .toBeCloseTo
    expect(results[0].nominationId).toBe('02');
    expect(results[0].nominationText).toBe('nomination2');
    expect(results[0].score).toBeCloseTo(2.991, 3);

    expect(results[1].nominationId).toBe('01');
    expect(results[1].nominationText).toBe('nomination1');
    expect(results[1].score).toBeCloseTo(1.981, 3);

    expect(results[2].nominationId).toBe('04');
    expect(results[2].nominationText).toBe('nomination4');
    expect(results[2].score).toBeCloseTo(1.694, 3);

    expect(results[3].nominationId).toBe('03');
    expect(results[3].nominationText).toBe('nomination3');
    expect(results[3].score).toBeCloseTo(1.296, 3);
  });
});
