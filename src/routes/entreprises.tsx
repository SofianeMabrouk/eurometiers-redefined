import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';
import { SiteLayout, pageMeta } from '@/components/site';
import { companies, jobs, normalize, companyLabel } from '@/lib/jobs';

export const Route = createFileRoute('/entreprises')({ head: () => pageMeta('Les entreprises qui recrutent · Eurométiers 2026', 'Découvrez les entreprises présentes dans les offres Eurométiers 2026 et retrouvez les postes qu’elles proposent.'), component: Companies });
function Companies() {
  const [query, setQuery] = useState('');
  const filtered = companies.filter(company => normalize(company).includes(normalize(query)));
  return <SiteLayout><section className="page-intro"><div className="container"><span className="eyebrow">LES TALENTS RENCONTRENT LES ENTREPRISES</span><h1>Votre futur employeur est peut-être ici.</h1><p>Découvrez les {companies.length} noms présents dans le document d’offres 2026 et préparez vos échanges.</p><div className="hero-search"><Search /><input aria-label="Rechercher une entreprise" placeholder="Nom de l’entreprise…" value={query} onChange={event => setQuery(event.target.value)} /></div></div></section><section className="section container"><div className="results-heading"><strong>{filtered.length} entreprise{filtered.length > 1 ? 's' : ''}</strong><span>Document d’offres · Édition 2026</span></div><div className="companies-grid">{filtered.map(company => { const count = jobs.filter(job => job.company === company).length; return <article key={company} className="company-card"><span className="company-monogram">{company.split(/\s+/).slice(0, 2).map(word => word[0]).join('')}</span><h2>{companyLabel(company)}</h2><p>{count} opportunité{count > 1 ? 's' : ''} dans les offres du salon</p><Link className="text-link" to="/offres" search={{ entreprise: company }}>Découvrir les offres <ArrowUpRight size={15} /></Link></article>; })}</div>{!filtered.length && <div className="empty-state"><h2>Aucune entreprise trouvée</h2><p>Essayez un autre nom.</p></div>}</section></SiteLayout>;
}