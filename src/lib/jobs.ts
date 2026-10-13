import sourceJobs from '@/data/jobs.json';

export type Job = typeof sourceJobs[number];
export const jobs: Job[] = sourceJobs;
export const companies = [...new Set(jobs.map(job => job.company))].sort();
export const totalPositions = jobs.reduce((sum, job) => sum + (job.positions ?? 0), 0);
export const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export function sectorOf(job: Job): string {
  const text = normalize(`${job.company} ${job.title}`);
  if (/cirfa|cerfa|policier|securite/.test(text)) return 'Défense & sécurité';
  if (/aeronaut|mecanicien piste|composite/.test(text)) return 'Industrie & aéronautique';
  if (/hotel|ibis|cuisine|cusinier|cuisinier|serveur|sommelier|restauration|patisserie|chef de rang/.test(text)) return 'Hôtellerie & restauration';
  if (/association|domicile|vie|educat|puericulture|enfants|animation|animateur|soignant|ergother|infirm|social|creche/.test(text)) return 'Santé & services';
  if (/btp|cordiste|manœuvre|manoeuvre|canalis|coffreur|macon|couvreur|plaquiste|plombier|travaux|batiment/.test(text)) return 'BTP & construction';
  if (/chauffeur|livreur|commandes|logist|manutention/.test(text)) return 'Transport & logistique';
  if (/electri|electro|mecanici|maintenance|technicien|incendie/.test(text)) return 'Industrie & aéronautique';
  return 'Commerce & fonctions support';
}
export const sectors = [...new Set(jobs.map(sectorOf))].sort();
export function filterJobs(query = '', contract = '', sector = '', company = '') {
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  return jobs.filter(job => terms.every(term => normalize(`${job.title} ${job.company}`).includes(term))
    && (!contract || job.contract === contract)
    && (!sector || sectorOf(job) === sector)
    && (!company || job.company === company));
}
export function companyLabel(company: string) {
  return company.toLowerCase().replace(/(^|\s)\S/g, letter => letter.toUpperCase());
}