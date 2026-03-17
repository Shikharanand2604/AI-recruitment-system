export type ExperienceLevel = 'Fresher' | 'Mid-Level' | 'Senior'
export type ApplicationStatus = 'New' | 'Screening' | 'Interview' | 'Offer' | 'Hired' | 'Rejected'
export type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected'
export type HiringRisk = 'Low' | 'Medium' | 'High'
export type AIRecommendation = 'Approve' | 'Reject' | 'Review'

export interface JobOpening {
  id: string
  title: string
  department: string
  requiredExperience: number
  requiredSkills: string[]
  salaryMin: number
  salaryMax: number
  location: string
  status: 'Open' | 'Closed' | 'On Hold'
}

export interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  currentTitle: string
  yearsOfExperience: number
  skills: string[]
  currentSalary: number
  expectedSalary: number
  education: string
  linkedinUrl?: string
  source: 'Job Board' | 'Referral' | 'Direct' | 'Agency'
}

export interface CandidateApplication {
  id: string
  candidateId: string
  candidate: Candidate
  jobOpeningId: string
  jobOpening: JobOpening
  applicationDate: string
  status: ApplicationStatus
  aiScore: number
  experienceMatchScore: number
  skillMatchScore: number
  salaryAlignmentScore: number
  coverLetter?: string
  interviewNotes?: string
  offerAmount?: number
  approvalStatus?: ApprovalStatus
  aiInsights: {
    summary: string
    hiringRisk: HiringRisk
    recommendation: AIRecommendation
    strengths: string[]
    concerns: string[]
  }
}

export interface Notification {
  id: string
  type: 'high-priority' | 'approval-required' | 'approval-completed'
  title: string
  message: string
  timestamp: string
  read: boolean
  applicationId?: string
}

// Mock Job Openings
export const jobOpenings: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    requiredExperience: 5,
    requiredSkills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    salaryMin: 800000,
    salaryMax: 1500000,
    location: 'San Francisco, CA',
    status: 'Open',
  },
  {
    id: 'job-2',
    title: 'Product Manager',
    department: 'Product',
    requiredExperience: 4,
    requiredSkills: ['Product Strategy', 'Agile', 'Data Analysis', 'Roadmapping'],
    salaryMin: 700000,
    salaryMax: 1200000,
    location: 'New York, NY',
    status: 'Open',
  },
  {
    id: 'job-3',
    title: 'Data Scientist',
    department: 'Data',
    requiredExperience: 3,
    requiredSkills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
    salaryMin: 600000,
    salaryMax: 1100000,
    location: 'Remote',
    status: 'Open',
  },
  {
    id: 'job-4',
    title: 'UX Designer',
    department: 'Design',
    requiredExperience: 2,
    requiredSkills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    salaryMin: 500000,
    salaryMax: 900000,
    location: 'Austin, TX',
    status: 'Open',
  },
]

// Mock Candidates
export const candidates: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '+1 415-555-0101',
    currentTitle: 'Software Engineer',
    yearsOfExperience: 6,
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'GraphQL'],
    currentSalary: 950000,
    expectedSalary: 1200000,
    education: 'MS Computer Science, Stanford',
    linkedinUrl: 'https://linkedin.com/in/sarahchen',
    source: 'Direct',
  },
  {
    id: 'cand-2',
    name: 'Michael Rodriguez',
    email: 'michael.r@email.com',
    phone: '+1 212-555-0102',
    currentTitle: 'Associate Product Manager',
    yearsOfExperience: 4,
    skills: ['Product Strategy', 'Agile', 'Data Analysis', 'SQL'],
    currentSalary: 650000,
    expectedSalary: 850000,
    education: 'MBA, Wharton',
    linkedinUrl: 'https://linkedin.com/in/michaelrodriguez',
    source: 'Referral',
  },
  {
    id: 'cand-3',
    name: 'Emily Watson',
    email: 'emily.watson@email.com',
    phone: '+1 650-555-0103',
    currentTitle: 'Junior Data Analyst',
    yearsOfExperience: 2,
    skills: ['Python', 'SQL', 'Tableau', 'Statistics'],
    currentSalary: 400000,
    expectedSalary: 550000,
    education: 'BS Statistics, UC Berkeley',
    source: 'Job Board',
  },
  {
    id: 'cand-4',
    name: 'James Park',
    email: 'james.park@email.com',
    phone: '+1 512-555-0104',
    currentTitle: 'Senior UX Designer',
    yearsOfExperience: 7,
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Adobe XD'],
    currentSalary: 750000,
    expectedSalary: 900000,
    education: 'BFA Design, RISD',
    linkedinUrl: 'https://linkedin.com/in/jamespark',
    source: 'Agency',
  },
  {
    id: 'cand-5',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+1 408-555-0105',
    currentTitle: 'ML Engineer',
    yearsOfExperience: 5,
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'PyTorch', 'SQL'],
    currentSalary: 900000,
    expectedSalary: 1150000,
    education: 'PhD Machine Learning, MIT',
    linkedinUrl: 'https://linkedin.com/in/priyasharma',
    source: 'Direct',
  },
  {
    id: 'cand-6',
    name: 'David Kim',
    email: 'david.kim@email.com',
    phone: '+1 206-555-0106',
    currentTitle: 'Full Stack Developer',
    yearsOfExperience: 3,
    skills: ['React', 'Node.js', 'Python', 'PostgreSQL'],
    currentSalary: 550000,
    expectedSalary: 700000,
    education: 'BS Computer Science, UW',
    source: 'Job Board',
  },
]

// Mock Applications
export const applications: CandidateApplication[] = [
  {
    id: 'app-1',
    candidateId: 'cand-1',
    candidate: candidates[0],
    jobOpeningId: 'job-1',
    jobOpening: jobOpenings[0],
    applicationDate: '2024-03-15',
    status: 'Interview',
    aiScore: 92,
    experienceMatchScore: 95,
    skillMatchScore: 90,
    salaryAlignmentScore: 88,
    offerAmount: 1250000,
    approvalStatus: 'Pending',
    aiInsights: {
      summary: 'Exceptional candidate with strong technical background and leadership experience. 6 years of relevant experience exceeds requirements. Skill set aligns perfectly with role needs.',
      hiringRisk: 'Low',
      recommendation: 'Approve',
      strengths: [
        'Exceeds experience requirements',
        'Full skill match with additional GraphQL expertise',
        'Stanford MS provides strong educational foundation',
        'Currently employed, indicating market value',
      ],
      concerns: [
        'Salary expectation slightly above midpoint',
        'May be overqualified for some aspects',
      ],
    },
  },
  {
    id: 'app-2',
    candidateId: 'cand-2',
    candidate: candidates[1],
    jobOpeningId: 'job-2',
    jobOpening: jobOpenings[1],
    applicationDate: '2024-03-14',
    status: 'Screening',
    aiScore: 78,
    experienceMatchScore: 80,
    skillMatchScore: 75,
    salaryAlignmentScore: 82,
    aiInsights: {
      summary: 'Solid candidate with relevant PM experience. MBA from Wharton adds strategic value. Missing some advanced skills but shows strong learning trajectory.',
      hiringRisk: 'Medium',
      recommendation: 'Review',
      strengths: [
        'Meets experience requirements',
        'Strong educational background',
        'Good referral source',
        'Salary expectations within range',
      ],
      concerns: [
        'Missing Roadmapping experience',
        'Transitioning from associate to senior role',
      ],
    },
  },
  {
    id: 'app-3',
    candidateId: 'cand-3',
    candidate: candidates[2],
    jobOpeningId: 'job-3',
    jobOpening: jobOpenings[2],
    applicationDate: '2024-03-13',
    status: 'New',
    aiScore: 45,
    experienceMatchScore: 40,
    skillMatchScore: 50,
    salaryAlignmentScore: 60,
    aiInsights: {
      summary: 'Entry-level candidate applying for mid-level role. Shows potential but lacks required ML and deep learning experience. May be better suited for junior data analyst position.',
      hiringRisk: 'High',
      recommendation: 'Reject',
      strengths: [
        'Strong educational foundation',
        'Good basic skills in Python and SQL',
        'Salary expectations reasonable',
      ],
      concerns: [
        'Significantly under-experienced (2 vs 3 years required)',
        'Missing critical ML and TensorFlow skills',
        'No advanced data science experience',
      ],
    },
  },
  {
    id: 'app-4',
    candidateId: 'cand-4',
    candidate: candidates[3],
    jobOpeningId: 'job-4',
    jobOpening: jobOpenings[3],
    applicationDate: '2024-03-12',
    status: 'Offer',
    aiScore: 88,
    experienceMatchScore: 90,
    skillMatchScore: 95,
    salaryAlignmentScore: 85,
    offerAmount: 850000,
    approvalStatus: 'Approved',
    aiInsights: {
      summary: 'Highly qualified designer with extensive experience and full skill coverage. Overqualified for the role which may present retention concerns, but brings significant value.',
      hiringRisk: 'Low',
      recommendation: 'Approve',
      strengths: [
        'Exceeds experience requirements significantly',
        'Complete skill match plus additional tools',
        'RISD education highly valued',
        'Strong portfolio implied by seniority',
      ],
      concerns: [
        'May be overqualified - retention risk',
        'Agency sourced - potential fee',
      ],
    },
  },
  {
    id: 'app-5',
    candidateId: 'cand-5',
    candidate: candidates[4],
    jobOpeningId: 'job-3',
    jobOpening: jobOpenings[2],
    applicationDate: '2024-03-11',
    status: 'Interview',
    aiScore: 95,
    experienceMatchScore: 98,
    skillMatchScore: 95,
    salaryAlignmentScore: 90,
    offerAmount: 1100000,
    approvalStatus: 'Pending',
    aiInsights: {
      summary: 'Outstanding candidate with PhD and 5 years of ML experience. Expertise in both TensorFlow and PyTorch provides versatility. Strong research background complements practical skills.',
      hiringRisk: 'Low',
      recommendation: 'Approve',
      strengths: [
        'PhD from MIT in directly relevant field',
        'Exceeds all technical requirements',
        'Both TensorFlow and PyTorch experience',
        'Strong publication record assumed',
      ],
      concerns: [
        'High salary expectation',
        'May prefer research over applied work',
      ],
    },
  },
  {
    id: 'app-6',
    candidateId: 'cand-6',
    candidate: candidates[5],
    jobOpeningId: 'job-1',
    jobOpening: jobOpenings[0],
    applicationDate: '2024-03-10',
    status: 'Rejected',
    aiScore: 55,
    experienceMatchScore: 50,
    skillMatchScore: 60,
    salaryAlignmentScore: 70,
    aiInsights: {
      summary: 'Candidate shows promise but lacks the seniority required for this senior role. Missing AWS experience is a significant gap. Better suited for mid-level positions.',
      hiringRisk: 'High',
      recommendation: 'Reject',
      strengths: [
        'Good foundational skills',
        'Reasonable salary expectations',
        'Diverse technology exposure',
      ],
      concerns: [
        'Only 3 years experience vs 5 required',
        'Missing critical AWS skills',
        'No TypeScript listed',
      ],
    },
  },
]

// Mock Notifications
export const notifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'high-priority',
    title: 'High Priority Candidate',
    message: 'Sarah Chen scored 92 on AI assessment for Senior Software Engineer position.',
    timestamp: '2024-03-15T10:30:00Z',
    read: false,
    applicationId: 'app-1',
  },
  {
    id: 'notif-2',
    type: 'approval-required',
    title: 'Approval Required',
    message: 'Offer of $1,250,000 for Sarah Chen requires management approval (exceeds $1,000,000 threshold).',
    timestamp: '2024-03-15T11:00:00Z',
    read: false,
    applicationId: 'app-1',
  },
  {
    id: 'notif-3',
    type: 'high-priority',
    title: 'High Priority Candidate',
    message: 'Priya Sharma scored 95 on AI assessment for Data Scientist position.',
    timestamp: '2024-03-11T09:15:00Z',
    read: true,
    applicationId: 'app-5',
  },
  {
    id: 'notif-4',
    type: 'approval-completed',
    title: 'Approval Completed',
    message: 'Offer for James Park (UX Designer) has been approved by management.',
    timestamp: '2024-03-13T14:45:00Z',
    read: true,
    applicationId: 'app-4',
  },
  {
    id: 'notif-5',
    type: 'approval-required',
    title: 'Approval Required',
    message: 'Offer of $1,100,000 for Priya Sharma requires management approval.',
    timestamp: '2024-03-12T16:20:00Z',
    read: false,
    applicationId: 'app-5',
  },
]

// Helper functions
export function getAIScoreBadge(score: number): { label: string; variant: 'high' | 'medium' | 'low' } {
  if (score >= 85) return { label: 'High Priority', variant: 'high' }
  if (score >= 60) return { label: 'Medium', variant: 'medium' }
  return { label: 'Low', variant: 'low' }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function getExperienceLevel(years: number): ExperienceLevel {
  if (years <= 2) return 'Fresher'
  if (years <= 5) return 'Mid-Level'
  return 'Senior'
}

// Stats calculations
export function getDashboardStats() {
  const totalCandidates = candidates.length
  const activeApplications = applications.filter(
    (app) => !['Hired', 'Rejected'].includes(app.status)
  ).length
  const highPriorityCandidates = applications.filter((app) => app.aiScore >= 85).length
  const pendingApprovals = applications.filter(
    (app) => app.approvalStatus === 'Pending'
  ).length

  return {
    totalCandidates,
    activeApplications,
    highPriorityCandidates,
    pendingApprovals,
  }
}
