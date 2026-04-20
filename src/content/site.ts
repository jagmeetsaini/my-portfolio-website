export const site = {
  name: 'Jagmeet Singh Saini',
  shortName: 'Jagmeet',
  initials: 'JSS',
  email: 'jagmeetsaini8@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jagmeet-singh-saini/',
  resumePath: '/resume.pdf',
  pitch: "I build cloud infrastructure that doesn't wake you up at 3 AM.",
  pitchLong:
    'Four years shipping observable, automated, SOC-compliant systems on AWS & Azure — turning on-call chaos into dashboards, runbooks, and quiet nights.',
  bio: [
    "I'm a <strong>Site Reliability Engineer</strong> currently building cloud infra at <strong>Enpass</strong>. Before that, I spent three years at <strong>LeadSquared</strong> automating the unsexy parts of DevOps — the 3 AM alerts, the fragile deploys, the \"it works on my region\" bugs.",
    'My favourite problems live at the intersection of <strong>infrastructure, automation and compliance</strong>. Think multi-region DR plans, SOC certifications, Terraform modules you can actually read, and observability stacks that answer the question before someone asks it.',
    "Outside work I take on cloud audits, IaC refactors, and CI/CD rescue missions. If your infra spooks you, <a href='#contact' style='text-decoration:underline;text-underline-offset:3px'>let's chat</a>.",
  ],
  facts: [
    { key: 'Role', value: 'SRE @ Enpass' },
    { key: 'Stack', value: 'AWS · Azure · K8s' },
    { key: 'Status', value: 'Open to work' },
    { key: 'Experience', value: '4 yrs production' },
  ],
  stats: [
    { num: '99.99%', lbl: 'Uptime maintained' },
    { num: '60%', lbl: 'Faster provisioning' },
    { num: '35×', lbl: 'Region setup speedup' },
    { num: '4 yrs', lbl: 'Production SRE' },
  ],
  roles: [
    { word: 'Cloud Engineer', color: 'oklch(62% 0.19 250)' },
    { word: 'Site Reliability Engineer', color: 'oklch(62% 0.19 150)' },
    { word: 'DevOps Engineer', color: 'oklch(65% 0.19 35)' },
    { word: 'Infrastructure Engineer', color: 'oklch(58% 0.22 300)' },
    { word: 'Platform Engineer', color: 'oklch(62% 0.20 10)' },
  ],
} as const
