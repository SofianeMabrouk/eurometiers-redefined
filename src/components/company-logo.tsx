import { useState } from 'react';
import logos from '@/data/company-logos.json';
import { companyLabel } from '@/lib/jobs';

const catalogue: Record<string, { url: string }> = logos;

export function CompanyLogo({ company, className = '' }: { company: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  const logo = catalogue[company];
  return <span className={`company-logo ${className}`}>
    {logo && !failed ? <img src={logo.url} alt={`Logo ${companyLabel(company)}`} loading="lazy" onError={() => setFailed(true)} /> : <span className="company-logo-fallback" aria-hidden="true">{company.split(/\s+/).slice(0, 2).map(word => word[0]).join('')}</span>}
  </span>;
}