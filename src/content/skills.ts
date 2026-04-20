export interface SkillGroup {
  name: string
  pills: string[]
}

export const skillGroups: SkillGroup[] = [
  { name: 'Cloud platforms', pills: ['AWS', 'Azure'] },
  { name: 'Infrastructure as Code', pills: ['Terraform', 'CloudFormation'] },
  { name: 'Containers & orchestration', pills: ['Docker', 'Kubernetes', 'ECS Fargate', 'ECR'] },
  { name: 'CI/CD & version control', pills: ['Bitbucket Pipelines', 'Jenkins', 'Git', 'SVN'] },
  { name: 'Scripting & automation', pills: ['Python', 'Bash', 'PowerShell', 'Ansible'] },
  { name: 'Observability', pills: ['CloudWatch', 'Grafana', 'ELK Stack', 'Loggly', 'New Relic', 'PagerDuty'] },
  { name: 'Security & compliance', pills: ['WAF', 'KMS', 'IAM', 'SOC 3'] },
  { name: 'Data & storage', pills: ['S3', 'DynamoDB', 'MongoDB', 'MySQL'] },
]

export const marqueeSkills = [
  'AWS', 'Terraform', 'Kubernetes', 'Docker', 'Python', 'Ansible',
  'Azure', 'Jenkins', 'Grafana', 'ELK', 'CloudFormation', 'PagerDuty',
]
