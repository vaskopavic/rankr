import { Nominations, Rankings, Results } from 'shared';

export default (
  rankings: Rankings,
  nominations: Nominations,
  votesPerUser: number,
): Results => {
  // 1. Each value of `rankings` key values is an array of a participants'
  // vote. Points for each array element corresponds to following formula:
  // r_n = ((votesPerUser - 0.5*n) / votesPerUser)^(n+1), where n corresponds
  // to array index of rankings.
  // Accumulate score per nominationId
  const scores: { [nominationId: string]: number } = {};

  Object.values(rankings).forEach((userRankings) => {
    userRankings.forEach((nominationId, n) => {
      const voteValue = Math.pow(
        (votesPerUser - 0.5 * n) / votesPerUser,
        n + 1,
      );

      scores[nominationId] = (scores[nominationId] ?? 0) + voteValue;
    });
  });

  // 2. Take nominationId to score mapping, and merge in nominationText
  // and nominationId into value
  const results = Object.entries(scores).map(([nominationId, score]) => ({
    nominationId,
    nominationText: nominations[nominationId].text,
    score,
  }));

  // 3. Sort values by score in descending order
  results.sort((res1, res2) => res2.score - res1.score);

  return results;
};
