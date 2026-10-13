import { describe, expect, it } from 'vitest';
import { filterJobs, jobs } from '@/lib/jobs';

describe('Document-backed job search', () => {
  it('preserves the municipal police offer and its 100 CDI positions', () => {
    expect(jobs.find(job => job.title === 'Policier municipal')).toMatchObject({ company: 'VILLE DE MARSEILLE', positions: 100, contract: 'CDI' });
  });
  it('matches accented queries without requiring accents', () => {
    expect(filterJobs('mecanicien piste')).toEqual(expect.arrayContaining([expect.objectContaining({ company: 'ADEQUAT AERONAUTIQUE', positions: 15, contract: 'Intérim' })]));
  });
  it('combines company and contract filters', () => {
    const result = filterJobs('', 'CDD', '', 'VILLE DE MARSEILLE');
    expect(result).toHaveLength(3);
    expect(result.every(job => job.contract === 'CDD' && job.company === 'VILLE DE MARSEILLE')).toBe(true);
  });
  it('leaves unspecified contracts and counts unspecified', () => {
    expect(jobs.find(job => job.title === 'Pilote de chasse h/f')).toMatchObject({ positions: null, contract: 'Non précisé' });
  });
});