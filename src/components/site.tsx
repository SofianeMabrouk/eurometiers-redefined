import { Link, useRouterState } from '@tanstack/react-router';
import { ArrowUpRight, ArrowRight, Menu, X, MapPin, CalendarDays, Clock3, Bookmark, Building2, Users, BriefcaseBusiness } from 'lucide-react';
import { createContext, useContext, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { type Job, companyLabel, sectorOf } from '@/lib/jobs';
import pdf from '@/assets/offres-2026.asset.json';
import { CompanyLogo } from '@/components/company-logo';

const SavedContext = createContext<{ saved: string[]; toggle: (id: string) => void }>({ saved: [], toggle: () => {} });
export function SavedJobsProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<string[]>([]);
  const toggle = (id: string) => setSaved(previous => previous.includes(id) ? previous.filter(item => item !== id) : [...previous, id]);
  return <SavedContext.Provider value={{ saved, toggle }}>{children}</SavedContext.Provider>;
}
export const useSavedJobs = () => useContext(SavedContext);

export function Brand() {
  return <span className="brand"><span className="brand-mark" aria-hidden="true"><span /><span /><span /></span><span>eurométiers<span className="brand-dot">.</span></span></span>;
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: state => state.location.pathname });
  const nav = [{ to: '/', label: 'Accueil' }, { to: '/offres', label: 'Les offres d’emploi' }, { to: '/entreprises', label: 'Les entreprises' }, { to: '/le-salon', label: 'Le salon' }] as const;
  return <>
    <div className="announcement"><span className="live-dot" /> ÉDITION 2026 <span className="announcement-divider">/</span><span>Mardi 13 octobre · Marseille</span><Link to="/le-salon">Toutes les infos <ArrowUpRight size={13} /></Link></div>
    <header className="site-header"><div className="container header-inner">
      <Link to="/" aria-label="Eurométiers, accueil"><Brand /></Link>
      <nav className="desktop-nav" aria-label="Navigation principale">{nav.map(item => <Link key={item.to} to={item.to} className={pathname === item.to ? 'nav-link active' : 'nav-link'}>{item.label}</Link>)}</nav>
      <Button asChild variant="outline" className="recruiter-button"><a href="mailto:la-cite@la-cite.com?subject=Eurométiers%202026%20-%20Espace%20entreprises">Je suis recruteur <ArrowUpRight /></a></Button>
      <Button variant="ghost" size="icon" className="mobile-menu-toggle" aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</Button>
    </div>{mobileOpen && <nav className="mobile-nav" aria-label="Navigation mobile">{nav.map(item => <Link to={item.to} key={item.to} onClick={() => setMobileOpen(false)}>{item.label}<ArrowUpRight size={16} /></Link>)}<a href="mailto:la-cite@la-cite.com">Contacter l’organisateur <ArrowUpRight size={16} /></a></nav>}</header>
    <main>{children}</main>
    <footer className="site-footer"><div className="container footer-main"><div><Link to="/"><Brand /></Link><p>Des rencontres. Des opportunités.<br />Un avenir à construire, ensemble.</p></div><div><h3>Votre prochain pas</h3><Link to="/offres">Trouver un emploi</Link><Link to="/entreprises">Rencontrer les entreprises</Link><Link to="/le-salon">Préparer ma visite</Link></div><div><h3>Restons en contact</h3><a href="mailto:la-cite@la-cite.com">la-cite@la-cite.com <ArrowUpRight size={14} /></a><a href="https://www.la-cite.com" target="_blank" rel="noreferrer">La Cité des Entrepreneurs <ArrowUpRight size={14} /></a><a href={pdf.url} target="_blank" rel="noreferrer">Les offres 2026 en PDF <ArrowUpRight size={14} /></a></div></div><div className="container footer-bottom"><span>© 2026 Eurométiers · La Cité des Entrepreneurs d’Euroméditerranée</span><span>Marseille, territoire d’opportunités.</span></div></footer>
  </>;
}

export function EventDetails({ compact = false }: { compact?: boolean }) {
  return <div className={compact ? 'event-details compact' : 'event-details'}><span><CalendarDays />Mardi 13 octobre 2026</span><span><Clock3 />9h30 – 16h00</span><span><MapPin />World Trade Center, Marseille</span></div>;
}

export function JobCard({ job }: { job: Job }) {
  const { saved, toggle } = useSavedJobs();
  const [open, setOpen] = useState(false);
  const isSaved = saved.includes(job.id);
  return <><article className="job-card"><div className="job-card-top"><span className={`contract-tag ${job.contract === 'CDI' ? 'contract-cdi' : job.contract === 'Intérim' ? 'contract-interim' : ''}`}>{job.contract}</span><Button variant="ghost" size="icon" aria-label={isSaved ? `Retirer ${job.title} des favoris` : `Ajouter ${job.title} aux favoris`} title={isSaved ? 'Retirer des favoris' : 'Ajouter aux favoris'} onClick={() => toggle(job.id)} className={isSaved ? 'bookmark-button is-saved' : 'bookmark-button'}><Bookmark /></Button></div><div className="job-company-identity"><CompanyLogo company={job.company} className="company-logo-job" /><p className="job-company">{companyLabel(job.company)}</p></div><h3><Button variant="link" onClick={() => setOpen(true)}>{job.title}</Button></h3><p className="job-sector"><BriefcaseBusiness size={14} />{sectorOf(job)}</p><div className="job-card-bottom"><span><Users size={14} />{job.positions ? `${job.positions} poste${job.positions > 1 ? 's' : ''}` : 'Nombre non précisé'}</span><Button variant="ghost" size="icon" aria-label={`Voir l’offre : ${job.title}`} onClick={() => setOpen(true)}><ArrowUpRight /></Button></div></article>
    <Dialog open={open} onOpenChange={setOpen}><DialogContent className="job-dialog"><DialogHeader><span className="eyebrow">OFFRE EUROMÉTIERS 2026</span><DialogTitle>{job.title}</DialogTitle><div className="job-dialog-company"><CompanyLogo company={job.company} /><DialogDescription>{companyLabel(job.company)}</DialogDescription></div></DialogHeader><div className="detail-grid"><div><BriefcaseBusiness /><span>Contrat<strong>{job.contract}</strong></span></div><div><Users /><span>Postes proposés<strong>{job.positions ?? 'Non précisé'}</strong></span></div><div><Building2 /><span>Secteur<strong>{sectorOf(job)}</strong></span></div></div><div className="job-detail-note"><h3>Rencontrez votre prochain employeur</h3><p>Cette offre figure dans la liste du salon du 13 octobre 2026. Préparez votre CV et échangez directement avec l’entreprise au World Trade Center Marseille Provence.</p><p>Le lieu du poste, la rémunération et les conditions sont à confirmer auprès du recruteur.</p></div><Button asChild><Link to="/le-salon">Préparer ma visite <ArrowRight /></Link></Button><a className="text-link" href={pdf.url} target="_blank" rel="noreferrer">Consulter le document d’origine <ArrowUpRight size={15} /></a></DialogContent></Dialog>
  </>;
}

export const pageMeta = (title: string, description: string) => ({ meta: [{ title }, { name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] });