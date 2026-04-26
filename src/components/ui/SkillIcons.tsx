'use client'

type P = { className?: string }
const b = { fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, strokeWidth: 1.5 }

const AWS       = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><path d="M14 36 Q10 36 10 30 Q10 22 18 22 Q20 12 30 12 Q38 8 44 16 Q52 14 54 22 Q60 24 58 34 Q56 40 48 40 L16 40"/><path d="M20 50 L16 46 M20 50 L24 46 M44 50 L40 46 M44 50 L48 46"/></svg>
const Azure     = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><path d="M14 52 L28 12 L40 34 L54 52 Z"/><path d="M28 12 L44 52"/><path d="M22 36 L48 36"/></svg>
const Terraform = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><path d="M32 6 L56 20 L56 44 L32 58 L8 44 L8 20 Z"/><path d="M20 22 L44 22 M32 22 L32 46"/></svg>
const CFN       = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><path d="M10 22 Q32 14 54 22 L54 36 Q32 44 10 36 Z"/><path d="M10 22 L10 36 M54 22 L54 36"/><path d="M10 16 Q32 8 54 16"/><path d="M10 42 Q32 50 54 42"/></svg>
const Docker    = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><rect x="10" y="26" width="8" height="8" rx="1"/><rect x="20" y="26" width="8" height="8" rx="1"/><rect x="30" y="26" width="8" height="8" rx="1"/><rect x="20" y="16" width="8" height="8" rx="1"/><rect x="30" y="16" width="8" height="8" rx="1"/><path d="M54 28 C54 22 46 20 42 24 M8 36 C10 50 52 50 56 34"/></svg>
const K8s       = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><circle cx="32" cy="32" r="22"/><circle cx="32" cy="32" r="4"/><line x1="32" y1="28" x2="32" y2="10"/><line x1="35" y1="29" x2="50" y2="20"/><line x1="35" y1="34" x2="50" y2="44"/><line x1="32" y1="36" x2="32" y2="54"/><line x1="29" y1="34" x2="14" y2="44"/><line x1="29" y1="29" x2="14" y2="20"/></svg>
const ECS       = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><rect x="10" y="14" width="44" height="36" rx="3"/><path d="M22 32 L32 22 L42 32 M32 22 L32 48"/><circle cx="18" cy="20" r="2"/><circle cx="46" cy="44" r="2"/></svg>
const ECR       = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><rect x="12" y="10" width="40" height="44" rx="3"/><path d="M20 22 L44 22 M20 30 L44 30 M20 38 L34 38"/><path d="M38 42 L44 48 M44 42 L38 48"/></svg>
const Bitbucket = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><path d="M10 12 L20 52 L32 40 L44 52 L54 12 Z"/><path d="M22 32 L42 32"/></svg>
const Jenkins   = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><circle cx="32" cy="24" r="14"/><path d="M18 38 C18 54 46 54 46 38"/><circle cx="27" cy="24" r="2" fill="currentColor" strokeWidth={0}/><circle cx="37" cy="24" r="2" fill="currentColor" strokeWidth={0}/><path d="M28 30 Q32 34 36 30"/><path d="M26 18 Q32 14 38 18"/></svg>
const Git       = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><circle cx="20" cy="20" r="6"/><circle cx="44" cy="20" r="6"/><circle cx="20" cy="50" r="6"/><path d="M20 26 L20 44 M26 20 L38 20 M20 26 Q20 38 38 26"/></svg>
const SVNIcon   = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><circle cx="32" cy="50" r="6"/><circle cx="14" cy="20" r="6"/><circle cx="50" cy="20" r="6"/><path d="M32 44 L32 32 M32 32 L18 26 M32 32 L46 26"/></svg>
const Python    = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><path d="M32 8 C20 8 16 14 16 22 L16 30 L32 30 L32 34 L16 34 L16 42 C16 50 20 56 32 56 C44 56 48 50 48 42 L48 34 L32 34"/><path d="M32 30 L48 30 L48 22 C48 14 44 8 32 8"/><circle cx="24" cy="22" r="2" fill="currentColor" strokeWidth={0}/><circle cx="40" cy="42" r="2" fill="currentColor" strokeWidth={0}/></svg>
const Bash      = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><rect x="8" y="10" width="48" height="44" rx="4"/><path d="M18 26 L26 32 L18 38"/><path d="M30 38 L46 38"/></svg>
const PSIcon    = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><rect x="8" y="10" width="48" height="44" rx="4"/><path d="M16 24 L24 30 L16 36"/><path d="M16 44 L48 44"/><path d="M28 36 L40 36"/></svg>
const Ansible   = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><circle cx="32" cy="32" r="24"/><path d="M22 50 L32 14 L46 44 M26 40 L44 44"/></svg>
const CWatch    = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><ellipse cx="32" cy="32" rx="22" ry="14"/><circle cx="32" cy="32" r="7"/><path d="M32 26 L32 32 L38 36"/></svg>
const Grafana   = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><path d="M32 6 L56 20 L56 44 L32 58 L8 44 L8 20 Z"/><path d="M22 34 L28 34 L28 28 L34 28 L34 38 L40 38 L40 30 L46 30"/></svg>
const ELK       = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><path d="M16 14 L16 50 M16 14 L38 14 M16 32 L34 32 M16 50 L38 50"/></svg>
const Loggly    = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><ellipse cx="32" cy="32" rx="20" ry="10"/><ellipse cx="32" cy="32" rx="20" ry="10" transform="rotate(60 32 32)"/><ellipse cx="32" cy="32" rx="20" ry="10" transform="rotate(120 32 32)"/><circle cx="32" cy="32" r="4"/></svg>
const NRelic    = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><path d="M32 6 L56 20 L56 44 L32 58 L8 44 L8 20 Z"/><path d="M22 44 L22 20 L44 44 L44 20"/></svg>
const PD        = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><circle cx="32" cy="32" r="24"/><path d="M24 20 L24 34 Q24 44 32 44 Q40 44 40 34 Q40 26 32 26 L24 26 M24 46 L24 50"/></svg>
const WAFIcon   = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><path d="M32 8 L54 18 L54 36 Q54 50 32 58 Q10 50 10 36 L10 18 Z"/><path d="M22 32 L29 39 L42 26"/></svg>
const KMS       = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><circle cx="24" cy="26" r="12"/><path d="M32 32 L52 52 M44 44 L50 38 M48 50 L54 44"/></svg>
const IAMIcon   = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><circle cx="32" cy="20" r="12"/><path d="M10 56 C10 42 54 42 54 56"/></svg>
const SOC3      = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><path d="M32 8 L54 18 L54 36 Q54 50 32 58 Q10 50 10 36 L10 18 Z"/><circle cx="32" cy="20" r="5"/><path d="M22 36 L29 43 L42 30"/></svg>
const S3Icon    = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><ellipse cx="32" cy="18" rx="20" ry="8"/><path d="M12 18 L12 46 M52 18 L52 46"/><ellipse cx="32" cy="46" rx="20" ry="8"/><path d="M12 32 Q32 40 52 32"/></svg>
const DynDB     = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><ellipse cx="32" cy="14" rx="18" ry="6"/><ellipse cx="32" cy="32" rx="18" ry="6"/><ellipse cx="32" cy="50" rx="18" ry="6"/><line x1="14" y1="14" x2="14" y2="50"/><line x1="50" y1="14" x2="50" y2="50"/></svg>
const Mongo     = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><path d="M32 8 C32 8 50 22 50 38 C50 50 42 58 32 60 C22 58 14 50 14 38 C14 22 32 8 32 8 Z"/><line x1="32" y1="18" x2="32" y2="58"/></svg>
const MySQLIcon = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><ellipse cx="32" cy="16" rx="18" ry="6"/><ellipse cx="32" cy="48" rx="18" ry="6"/><line x1="14" y1="16" x2="14" y2="48"/><line x1="50" y1="16" x2="50" y2="48"/><path d="M14 32 Q32 40 50 32"/><path d="M42 36 L50 28 L50 44"/></svg>

const DefaultIcon = ({ className }: P) => <svg viewBox="0 0 64 64" {...b} stroke="currentColor" className={className}><circle cx="32" cy="32" r="24"/><circle cx="32" cy="32" r="10"/><line x1="32" y1="8" x2="32" y2="22"/><line x1="32" y1="42" x2="32" y2="56"/><line x1="8" y1="32" x2="22" y2="32"/><line x1="42" y1="32" x2="56" y2="32"/></svg>

export type IconComponent = ({ className }: P) => React.ReactElement

export const SKILL_ICONS: Record<string, IconComponent> = {
  'AWS': AWS,
  'Azure': Azure,
  'Terraform': Terraform,
  'CloudFormation': CFN,
  'Docker': Docker,
  'Kubernetes': K8s,
  'ECS Fargate': ECS,
  'ECR': ECR,
  'Bitbucket Pipelines': Bitbucket,
  'Jenkins': Jenkins,
  'Git': Git,
  'SVN': SVNIcon,
  'Python': Python,
  'Bash': Bash,
  'PowerShell': PSIcon,
  'Ansible': Ansible,
  'CloudWatch': CWatch,
  'Grafana': Grafana,
  'ELK Stack': ELK,
  'Loggly': Loggly,
  'New Relic': NRelic,
  'PagerDuty': PD,
  'WAF': WAFIcon,
  'KMS': KMS,
  'IAM': IAMIcon,
  'SOC 3': SOC3,
  'S3': S3Icon,
  'DynamoDB': DynDB,
  'MongoDB': Mongo,
  'MySQL': MySQLIcon,
}

export const getIcon = (name: string): IconComponent => SKILL_ICONS[name] ?? DefaultIcon
