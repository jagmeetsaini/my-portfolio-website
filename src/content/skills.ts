export interface SkillGroup {
  name: string
  pills: string[]
  /** Short label shown on the rack unit */
  slug?: string
  /** Description shown in the detail panel on hover */
  blurb?: string
}

export const skillGroups: SkillGroup[] = [
  { name: 'Cloud platforms', slug: 'cloud-platforms', blurb: 'Where it all runs. AWS daily, Azure where the customer lives.', pills: ['AWS', 'Azure'] },
  { name: 'Infrastructure as Code', slug: 'iac', blurb: 'If it isn’t in code, it doesn’t exist, and it will drift.', pills: ['Terraform', 'CloudFormation'] },
  { name: 'Containers & orchestration', slug: 'containers', blurb: 'Packaging and scheduling, minus the YAML archaeology.', pills: ['Docker', 'Kubernetes', 'ECS Fargate', 'ECR'] },
  { name: 'CI/CD & version control', slug: 'ci-cd', blurb: 'Getting changes to production safely and boringly.', pills: ['Bitbucket Pipelines', 'Jenkins', 'Git', 'SVN'] },
  { name: 'Scripting & automation', slug: 'automation', blurb: 'The glue. Do it twice and it becomes a script.', pills: ['Python', 'Bash', 'PowerShell', 'Ansible'] },
  { name: 'Observability', slug: 'observability', blurb: 'Answers before questions. Alerts that mean something.', pills: ['CloudWatch', 'Grafana', 'ELK Stack', 'Loggly', 'New Relic', 'PagerDuty'] },
  { name: 'Security & compliance', slug: 'security', blurb: 'Boring audits are good audits.', pills: ['WAF', 'KMS', 'IAM', 'SOC 3'] },
  { name: 'Data & storage', slug: 'data', blurb: 'State, handled carefully and encrypted at rest.', pills: ['S3', 'DynamoDB', 'MongoDB', 'MySQL'] },
]

export const marqueeSkills = [
  'AWS', 'Terraform', 'Kubernetes', 'Docker', 'Python', 'Ansible',
  'Azure', 'Jenkins', 'Grafana', 'ELK', 'CloudFormation', 'PagerDuty',
]
