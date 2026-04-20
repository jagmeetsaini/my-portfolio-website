export interface Job {
  role: string
  company: string
  start: string
  end: string | null
  type: string
  location: string
  lede: string
  bullets: string[]
  stack: string[]
}

export const experience: Job[] = [
  {
    role: 'Site Reliability Engineer',
    company: 'Enpass',
    start: 'Mar 2024',
    end: null,
    type: 'Full-time',
    location: 'Gurugram · Remote',
    lede: 'Managing cloud infrastructure, observability, incident response, security & compliance for a password-manager serving millions.',
    bullets: [
      'Re-architected backend into a secure multi-VPC topology — meaningful compliance bump.',
      'CloudFormation-everything, cutting infra provisioning time by ~60%.',
      'Migrated Elastic Beanstalk → ECS Fargate, 50% faster deploys.',
      'Shipped a multi-region DR plan with a 1-hour RTO.',
      'Led SOC 3 certification & 3rd-party pen-testing across all environments.',
      'Automated CloudWatch alarms with Lambda, WAF rules, Grafana dashboards & BetterStack pings — 99.99% uptime.',
    ],
    stack: ['AWS', 'ECS Fargate', 'CloudFormation', 'Lambda', 'WAF', 'Grafana', 'Bitbucket Pipelines'],
  },
  {
    role: 'Associate SRE',
    company: 'LeadSquared',
    start: 'Jun 2022',
    end: 'Mar 2024',
    type: 'Full-time',
    location: 'Bengaluru',
    lede: 'Automated the unsexy half of DevOps to enhance operational efficiency and data security across customer regions.',
    bullets: [
      'Automated infrastructure setup for new AWS regions — 35× faster deployments.',
      'Release automation that cut release downtime 40%.',
      'Built a secure customer data-retrieval system, 10× faster lookups.',
      'Automated routine DevOps tasks: +20% reliability, –15% incidents.',
    ],
    stack: ['Terraform', 'PowerShell', 'EC2', 'S3', 'KMS', 'DynamoDB', 'Jenkins'],
  },
  {
    role: 'SRE Intern',
    company: 'LeadSquared',
    start: 'May 2021',
    end: 'May 2022',
    type: 'Internship',
    location: 'Bengaluru',
    lede: 'Monitored production infrastructure and drove performance + cost-efficiency wins through observability.',
    bullets: [
      'Owned monitoring across CloudWatch, Grafana, ELK, New Relic, PagerDuty.',
      'Built dashboards & runbooks — response time improved ~25%.',
      'Cost optimization via CloudWatch metric analysis — 15% savings.',
    ],
    stack: ['CloudWatch', 'Grafana', 'ELK', 'New Relic', 'PagerDuty'],
  },
]
