'use client'

import React, { useState, useEffect } from 'react'

interface Course {
  id: string
  title: string
  duration: string
  mode: string
  syllabus: string[]
  projects: string[]
  description: string
  color: string
  tags: string[]
}

interface Review {
  name: string
  text: string
  initial: string
}

interface Placement {
  name: string
  role: string
  company: string
  initial: string
}

export default function STIPage() {
  const [activeCourse, setActiveCourse] = useState<string>('devops')
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', course: 'Cloud & DevOps' })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const courses: Record<string, Course> = {
    devops: {
      id: 'devops',
      title: 'Cloud DevOps',
      duration: '4 Months',
      mode: 'Classroom & Online',
      description: 'Design and manage cloud-native DevOps pipelines, automation, and scalable environments. Connect development and IT operations seamlessly.',
      syllabus: [
        'Linux Administration & Shell Scripting',
        'Cloud Computing & Architecture: AWS / Azure',
        'Containerization & Orchestration: Docker & Kubernetes',
        'Infrastructure as Code (IaC) with Terraform',
        'CI/CD Pipelines (Jenkins, GitHub Actions)',
        'Observability & Monitoring (Prometheus, Grafana, ELK Stack)',
      ],
      projects: ['Automated Blue-Green Deployments on AWS', 'Kubernetes Multi-Microservice Deployment', 'Highly Available Jenkins CI/CD Infrastructure'],
      color: '#fb7339',
      tags: ['CI/CD', 'Docker & K8s', 'Automation']
    },
    aiml: {
      id: 'aiml',
      title: 'Artificial Intelligence (AI)',
      duration: '6 Months',
      mode: 'Classroom & Online',
      description: 'Master Generative AI, Machine Learning, and intelligent system design. Learn to build intelligent agents, chatbots, and prediction engines.',
      syllabus: [
        'Python Programming & Advanced Data Analysis (Pandas, NumPy)',
        'Supervised & Unsupervised Machine Learning Algorithms',
        'Deep Learning with TensorFlow & PyTorch',
        'Natural Language Processing (NLP) & LLMs',
        'Computer Vision & Convolutional Neural Networks (CNNs)',
        'MLOps: Deploying AI Models to Production',
      ],
      projects: ['Predictive Medical Diagnostics Engine', 'Real-Time Object Detection Application', 'Custom RAG Chatbot for enterprise docs'],
      color: '#8b5cf6',
      tags: ['GenAI', 'LLMs', 'Prompt Eng']
    },
    cloud: {
      id: 'cloud',
      title: 'Cloud Computing',
      duration: '4 Months',
      mode: 'Classroom & Online',
      description: 'Master AWS, Azure, & GCP with modern architecture and deployments. Build secure, high-availability, and cost-optimized systems.',
      syllabus: [
        'Cloud Fundamentals & Core Concepts',
        'AWS Solutions Architect Associate Curriculum',
        'Azure Administration & Cloud Deployments',
        'Google Cloud Platform (GCP) Fundamentals',
        'Cloud Security, IAM, & Identity Management',
        'Cost Management & Cloud Architecture Design',
      ],
      projects: ['Secure Multi-Region Cloud Network Infrastructure', 'Serverless E-Commerce System Backend', 'Enterprise Network On-Premise to Cloud Migration'],
      color: '#3b82f6',
      tags: ['Multi-Cloud', 'Architecture', 'Security']
    },
    datascience: {
      id: 'datascience',
      title: 'Data Science',
      duration: '5 Months',
      mode: 'Classroom & Online',
      description: 'Unlock the power of data with statistics, ML workflows, and insights. Master data analysis, time-series forecasting, and big data processing.',
      syllabus: [
        'Statistics, Probability, & Quantitative Methods',
        'SQL for Data Engineering & Advanced Data Querying',
        'Data Visualization (PowerBI, Tableau, Seaborn, Matplotlib)',
        'Big Data Ecosystems (Apache Spark, Hadoop)',
        'Time Series Forecasting & Predictive Analysis',
        'Feature Engineering & Data Cleaning Pipelines',
      ],
      projects: ['Financial Fraud Detection Model', 'Interactive Executive Business Intelligence Dashboard', 'Customer Churn Analysis & Segmentation Engine'],
      color: '#06b6d4',
      tags: ['Python', 'Statistics', 'Visualization']
    },
    python: {
      id: 'python',
      title: 'Python',
      duration: '3 Months',
      mode: 'Classroom & Online',
      description: 'Python programming for application development and automation. Learn coding logic, databases, object-oriented concepts, and automation.',
      syllabus: [
        'Python Basics, Control Flow & Data Types',
        'Data Structures & Object-Oriented Programming (OOP)',
        'Web Scraping & Data Fetching (BeautifulSoup, Selenium)',
        'Backend Web Development with Flask & Django',
        'Database Integration (SQLite, PostgreSQL, MongoDB)',
        'Automation Scripting, System Commands, & Cron Jobs',
      ],
      projects: ['Automated Web Scraping Engine', 'Backend REST API Web Service', 'System Maintenance & Automated Administration Script'],
      color: '#10b981',
      tags: ['Scripting', 'Backend', 'Automation']
    },
    bash: {
      id: 'bash',
      title: 'Shell Scripting - Bash',
      duration: '2 Months',
      mode: 'Classroom & Online',
      description: 'Automate tasks and cloud operations using advanced Bash scripting. Master the Linux terminal, commands, automation scripts, and SRE tasks.',
      syllabus: [
        'Linux Terminal Commands & File Systems',
        'Bash Shell Basics: Variables, Conditions, & Loops',
        'Text Processing Utilities (grep, sed, awk)',
        'Linux Administration, Process Control & Cron Jobs',
        'Automated Backup, Cleanup & Health Monitoring Scripts',
        'Bash Script Integration inside CI/CD Build Pipelines',
      ],
      projects: ['Automated Server Performance Monitor', 'Multi-Server Database Backup & Compress Utility', 'CI/CD Pipeline Build & Deploy automation script'],
      color: '#f59e0b',
      tags: ['Linux', 'Scripting', 'DevOps']
    }
  }

  const reviews: Review[] = [
    { name: 'Sai Charan', initial: 'S', text: 'A great learning environment with a positive ambience. The staff is knowledgeable, supportive, and always ready to help. Looking forward to a productive learning journey.' },
    { name: 'Kirthi', initial: 'K', text: 'One of the best institutes in Tirupati offering real-world training. The learning approach is practical and the staff is very approachable.' },
    { name: 'Janardhan', initial: 'J', text: 'Highly recommended for anyone looking to upskill in DevOps. Strong practical focus, quality instruction, and industry-relevant content.' },
    { name: 'Karthik A', initial: 'K', text: 'A one-stop destination for Cloud DevOps, Python, and AI. Well-structured curriculum with hands-on learning and supportive instructors.' },
    { name: 'Venkatesh A', initial: 'V', text: 'Excellent hands-on learning with real-world projects. Individual attention and structured content helped me build strong practical skills.' },
    { name: 'Krishna Prasad', initial: 'K', text: 'Well-structured training with a perfect balance of theory and practice. Industry-aligned curriculum and valuable hands-on exposure.' },
    { name: 'Bunny Vissu', initial: 'B', text: 'Exceptional Cloud DevOps training with deep conceptual clarity. Strong mentorship, constant guidance, and a genuine learning-first culture.' },
    { name: 'Lakshmi Arunagiri', initial: 'L', text: 'Great learning experience in Cloud and DevOps. Dedicated mentors, structured curriculum, and continuous hands-on support.' },
    { name: 'Nadivinti Uday', initial: 'N', text: 'A well-designed DevOps program with strong hands-on practice. Supportive faculty and an encouraging learning environment.' },
    { name: 'Sri Vamsi', initial: 'S', text: 'Industry-ready DevOps training covering CI/CD, Docker, Kubernetes, Terraform, AWS, and more. Excellent mentorship and live projects.' },
    { name: 'Harish Jh', initial: 'H', text: 'A calm, focused learning environment with strong mentor support. Daily practice sessions and clear explanations helped me gain confidence.' }
  ]

  const placements: Placement[] = [
    { name: 'Narendra', initial: 'N', role: 'Lead Automation Engineer', company: 'Mphasis' },
    { name: 'Neeraja', initial: 'N', role: 'Intern', company: 'Anarock' },
    { name: 'Jaswanth', initial: 'J', role: 'Intern – Developer', company: 'Pay Assured' },
    { name: 'Ummar', initial: 'U', role: 'Lead Automation Engineer', company: 'Harbinger Group' },
    { name: 'Sweta', initial: 'S', role: 'Lead Automation Engineer', company: 'Capgemini' },
    { name: 'Pradeep', initial: 'P', role: 'Lead Automation Engineer', company: 'ACS' },
    { name: 'Hari Krishna', initial: 'H', role: 'Senior Engineer', company: 'HCL' },
    { name: 'Kartheek', initial: 'K', role: 'DevOps Engineer', company: 'Client: Reliance' },
    { name: 'Uma', initial: 'U', role: 'Senior Engineer', company: 'MNC' },
    { name: 'Srilekha', initial: 'S', role: 'Senior Engineer', company: 'MNC' },
    { name: 'Praveen Kumar', initial: 'P', role: 'Architect', company: 'Ex-EPAM' },
    { name: 'Amzath Khan', initial: 'A', role: 'System Engineer', company: 'Team Lease' },
    { name: 'Gayatri', initial: 'G', role: 'Intern', company: 'MNC' },
    { name: 'Vishnu', initial: 'V', role: 'Intern', company: 'MNC' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      alert('Please fill out Name and Phone Number')
      return
    }

    const waMessage = `Hi SSP STI, I would like to enquire about a course.%0A%0A*Name:* ${encodeURIComponent(
      formData.name
    )}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Email:* ${encodeURIComponent(
      formData.email || 'N/A'
    )}%0A*Course:* ${encodeURIComponent(formData.course)}`

    window.open(`https://wa.me/919035011859?text=${waMessage}`, '_blank')
    setIsSubmitted(true)
  }

  const faqs = [
    {
      q: 'Do you offer a placement guarantee?',
      a: 'Yes, we provide 100% Placement Support, including resume building sessions, intensive mock interviews with corporate tech leaders, and direct hiring drives with our 200+ partner companies.',
    },
    {
      q: 'Can I learn classroom and online classes simultaneously?',
      a: 'Yes, we offer hybrid learning modes where students can attend offline classroom sessions in our Tirupati campus and catch up with recorded video modules or live online classes.',
    },
    {
      q: 'Is there a minimum eligibility criteria for enrolling?',
      a: 'Our programs are open to both engineering graduates and non-CS students. We cover core programming concepts from the absolute basics, so coding experience is not required to enroll.',
    },
    {
      q: 'Do we work on real-world projects during training?',
      a: 'Absolutely. Every course incorporates at least 3 major capstone projects that mimic real industry scenarios. In addition, students work on live tasks under our Software Solutions (SS) division.',
    },
  ]

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: 'var(--font-inter)', color: '#1e293b' }}>
      {/* HEADER */}
      <header style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        zIndex: 100,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #f1f5f9',
        padding: '16px 24px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/images/SSP.png" alt="SSP Logo" style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 800, fontSize: '20px', color: '#0f172a', letterSpacing: '0.05em' }}>SSP STI</span>
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#fb7339', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '-3px' }}>Software Training Institute</span>
            </div>
          </a>
          <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <a href="/" style={{ fontSize: '14px', fontWeight: 600, color: '#475569' }}>Home</a>
            <a href="#visionaries" style={{ fontSize: '14px', fontWeight: 600, color: '#475569' }}>Mentors</a>
            <a href="#why-choose" style={{ fontSize: '14px', fontWeight: 600, color: '#475569' }}>Why Choose Us</a>
            <a href="#courses" style={{ fontSize: '14px', fontWeight: 600, color: '#475569' }}>Courses</a>
            <a href="#reviews" style={{ fontSize: '14px', fontWeight: 600, color: '#475569' }}>Reviews</a>
            <a href="#placements" style={{ fontSize: '14px', fontWeight: 600, color: '#475569' }}>Placements</a>
            <a href="#register" className="btn btn-orange" style={{
              borderRadius: '50px',
              padding: '8px 20px',
              fontSize: '13px',
              border: 'none',
              boxShadow: '0 4px 10px rgba(251, 115, 57, 0.25)'
            }}>Join Now</a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={{
        background: 'radial-gradient(circle at 90% 10%, #fffcf8 0%, #ffffff 60%, #fef3eb 100%)',
        padding: '80px 24px 100px 24px',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#fff5f0',
              border: '1px solid #ffe3d3',
              borderRadius: '20px',
              padding: '6px 16px',
              color: '#fb7339',
              fontSize: '13px',
              fontWeight: 700,
              marginBottom: '24px',
              letterSpacing: '0.05em'
            }}>
              🚀 TIRUPATI&apos;S PREMIER TECH INSTITUTE
            </div>
            <h1 style={{
              fontFamily: 'var(--font-mulish)',
              fontSize: 'clamp(36px, 4vw, 56px)',
              fontWeight: 800,
              color: '#0f172a',
              lineHeight: 1.1,
              marginBottom: '24px',
              letterSpacing: '-0.02em'
            }}>
              Launch Your Tech Career with <span style={{ color: '#fb7339' }}>Real Skills</span>
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#475569',
              lineHeight: 1.6,
              marginBottom: '36px',
              maxWidth: '540px'
            }}>
              Skills get you hired. SSP Tirupati builds core skills that make you a talent magnet. Get mentored by corporate tech professionals and secure jobs in premium MNCs.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#courses" className="btn btn-orange" style={{ padding: '14px 28px', borderRadius: '8px' }}>Explore Programs</a>
              <a href="#register" className="btn btn-border" style={{ padding: '14px 28px', borderRadius: '8px' }}>Talk to a Mentor</a>
            </div>
            
            {/* Quick Metrics */}
            <div style={{
              display: 'flex',
              gap: '40px',
              marginTop: '56px',
              borderTop: '1px solid #f1f5f9',
              paddingTop: '32px'
            }}>
              <div>
                <h4 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>100%</h4>
                <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Placement Support</span>
              </div>
              <div>
                <h4 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>200+</h4>
                <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Hiring Partners</span>
              </div>
              <div>
                <h4 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>15 LPA</h4>
                <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Highest Package Secured</span>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Styled Code Terminal Mockup */}
            <div style={{
              background: '#0f172a',
              borderRadius: '20px',
              padding: '24px',
              fontFamily: 'monospace',
              fontSize: '14px',
              color: '#38bdf8',
              boxShadow: '0 25px 50px -12px rgba(251, 115, 57, 0.15)',
              border: '1px solid #1e293b',
              position: 'relative'
            }}>
              {/* Window Controls */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid #1e293b', paddingBottom: '12px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                <span style={{ color: '#64748b', marginLeft: '12px', fontSize: '11px', fontFamily: 'var(--font-inter)' }}>ssp-skills.js</span>
              </div>
              <div style={{ lineHeight: 1.6 }}>
                <div><span style={{ color: '#f43f5e' }}>const</span> <span style={{ color: '#e0f2fe' }}>skills</span> = <span style={{ color: '#38bdf8' }}>ssp</span>.<span style={{ color: '#10b981' }}>learn</span>([<span style={{ color: '#fb7339' }}>&quot;Python&quot;</span>, <span style={{ color: '#fb7339' }}>&quot;DevOps&quot;</span>, <span style={{ color: '#fb7339' }}>&quot;Cloud&quot;</span>, <span style={{ color: '#fb7339' }}>&quot;AI&quot;</span>]);</div>
                <div style={{ marginTop: '8px' }}><span style={{ color: '#f43f5e' }}>if</span> (<span style={{ color: '#e0f2fe' }}>skills</span>.<span style={{ color: '#10b981' }}>isIndustryReady</span>()) &#123;</div>
                <div>&nbsp;&nbsp;<span style={{ color: '#e0f2fe' }}>career</span>.<span style={{ color: '#10b981' }}>unlock</span>(<span style={{ color: '#fb7339' }}>&quot;Opportunities&quot;</span>);</div>
                <div>&nbsp;&nbsp;<span style={{ color: '#e0f2fe' }}>mentor</span>.<span style={{ color: '#10b981' }}>support</span>();</div>
                <div>&#125;</div>
                <div style={{ marginTop: '8px' }}><span style={{ color: '#e0f2fe' }}>confidence</span>.<span style={{ color: '#10b981' }}>build</span>();</div>
                <div><span style={{ color: '#e0f2fe' }}>job</span>.<span style={{ color: '#10b981' }}>offer</span>(<span style={{ color: '#fb7339' }}>&quot;Success&quot;</span>);</div>
              </div>
            </div>

            <div style={{
              background: '#f8fafc',
              padding: '24px',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              fontSize: '14px',
              color: '#475569',
              lineHeight: 1.6
            }}>
              A visionary education platform born in Tirupati — empowering students with <strong>core skills</strong>, strong <strong>ethics</strong>, and <strong>confidence</strong> to break barriers, build meaningful careers, and attract real opportunities.
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP / VISIONARIES SECTION */}
      <section id="visionaries" style={{ padding: '80px 24px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ color: '#fb7339', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>VISIONARIES</span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#0f172a', marginTop: '12px' }}>Leadership Behind SSP</h2>
            <p style={{ color: '#475569', fontSize: '16px', marginTop: '8px' }}>Driven by experience. Focused on student success. Meet the mentors shaping the future of engineering.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {[
              { name: 'Sai Charan V P', role: 'CEO', quote: 'Our mission is to turn skills into confidence and confidence into careers. We are here to bridge the gap between academic learning and industry demands.' },
              { name: 'Manoj Kumar G', role: 'Director', quote: 'We don’t train students for exams — we prepare them for real industry challenges. Quality education is about empowerment, not just certification.' },
              { name: 'Praveen Kumar G', role: 'Founder', quote: 'SSP was built to create ethical, skilled engineers who are ready for the real world. Integrity and perseverance are at the core of everything we do.' }
            ].map((lead, idx) => (
              <div key={idx} style={{
                background: 'white',
                padding: '36px',
                borderRadius: '24px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
              }}>
                <div>
                  <span style={{ fontSize: '48px', color: '#fb7339', lineHeight: 1, display: 'block', marginBottom: '16px', fontFamily: 'Georgia' }}>“</span>
                  <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '24px' }}>{lead.quote}</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>{lead.name}</h4>
                  <span style={{ fontSize: '13px', color: '#fb7339', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{lead.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SSP / FEATURES SECTION */}
      <section id="why-choose" style={{ padding: '100px 24px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ color: '#fb7339', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SSP FEATURES</span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#0f172a', marginTop: '12px' }}>Everything you need to become industry-ready — and more.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '80px' }}>
            {[
              { title: 'Multi-Domain Skill', desc: 'Exposure to Cloud, DevOps, AI, Data, and Development.' },
              { title: 'Individual Tracking', desc: 'Personalized progress monitoring and mentor feedback.' },
              { title: 'Industry Mentorship', desc: 'Learn directly from experienced industry professionals.' },
              { title: 'Career-Focused', desc: 'Resume building, mock interviews, placement guidance.' },
              { title: 'Modern Curriculum', desc: 'Syllabus updated with current tech trends.' },
              { title: 'Dedicated Practice', desc: 'Structured hands-on labs and real-time projects.' },
              { title: 'Placement Assistance', desc: 'End-to-end support for landing your dream job.' },
              { title: 'Standalone Mindset', desc: 'Building independent problem-solving skills.' },
              { title: 'Ethical Education', desc: 'Strong professional ethics and core values.' },
              { title: 'Lifetime Support', desc: 'Continuous guidance whenever you need it.' }
            ].map((feat, idx) => (
              <div key={idx} style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '24px',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ fontSize: '20px', color: '#fb7339', fontWeight: 'bold', marginBottom: '8px' }}>✓</div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>{feat.title}</h4>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>{feat.desc}</p>
              </div>
            ))}
          </div>

          {/* Core Values Sub-Grid */}
          <div style={{
            background: 'linear-gradient(135deg, #fffbf7 0%, #fff5ee 100%)',
            border: '1px solid #ffe3d3',
            borderRadius: '24px',
            padding: '48px',
          }}>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '32px', textAlign: 'center' }}>Why Choose SSP Institute?</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px' }}>
              {[
                { title: 'Expert Instructors', desc: 'Learn from industry veterans with 10+ years of experience.' },
                { title: 'Live Projects', desc: 'Work on real-world problem statements, not just dummy apps.' },
                { title: 'Career Support', desc: 'Resume building, mock interviews, and direct placement referrals.' },
                { title: 'Flexible Learning', desc: 'Weekend and weekday batches available for students and pros.' }
              ].map((val, idx) => (
                <div key={idx} style={{ textAlign: 'center' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#fb7339', marginBottom: '8px' }}>{val.title}</h4>
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5 }}>{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM SECTION */}
      <section id="courses" style={{ padding: '100px 24px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ color: '#fb7339', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>OUR PROGRAMS</span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#0f172a', marginTop: '12px' }}>Our Top Rated Programs</h2>
            <p style={{ color: '#475569', fontSize: '16px', marginTop: '8px' }}>Industry-aligned curriculum designed to make you job-ready from day one.</p>
          </div>

          {/* Navigation Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '48px',
            flexWrap: 'wrap'
          }}>
            {Object.keys(courses).map((key) => (
              <button
                key={key}
                onClick={() => setActiveCourse(key)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '30px',
                  fontWeight: 700,
                  fontSize: '14px',
                  border: activeCourse === key ? `2px solid ${courses[key].color}` : '2px solid #e2e8f0',
                  backgroundColor: activeCourse === key ? '#ffffff' : 'transparent',
                  color: activeCourse === key ? courses[key].color : '#475569',
                  transition: 'all 0.3s ease'
                }}
              >
                {courses[key].title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '24px',
            padding: '48px',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px'
          }}>
            <div>
              <div style={{
                display: 'inline-block',
                backgroundColor: `${courses[activeCourse].color}1a`,
                color: courses[activeCourse].color,
                fontWeight: 700,
                fontSize: '12px',
                padding: '4px 12px',
                borderRadius: '20px',
                marginBottom: '16px'
              }}>
                {courses[activeCourse].duration} • {courses[activeCourse].mode}
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>{courses[activeCourse].title}</h3>
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.6, marginBottom: '32px' }}>{courses[activeCourse].description}</p>
              
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>Capstone Projects You Will Build:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {courses[activeCourse].projects.map((proj, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{
                      color: courses[activeCourse].color,
                      fontSize: '16px',
                      fontWeight: 800,
                      lineHeight: '1.2'
                    }}>✓</span>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>{proj}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderLeft: '1px solid #f1f5f9', paddingLeft: '48px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '24px' }}>Course Curriculum Modules:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {courses[activeCourse].syllabus.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '16px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: `${courses[activeCourse].color}12`,
                      color: courses[activeCourse].color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 700,
                      flexShrink: 0
                    }}>
                      0{idx + 1}
                    </div>
                    <div style={{ fontSize: '14px', color: '#475569', lineHeight: '1.5', paddingTop: '4px' }}>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STUDENT REVIEWS SECTION */}
      <section id="reviews" style={{ padding: '100px 24px', backgroundColor: '#ffffff', overflow: 'hidden', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ color: '#fb7339', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>STUDENT REVIEWS</span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#0f172a', marginTop: '12px' }}>Hear from our students who have transformed their careers.</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {reviews.map((rev, idx) => (
              <div key={idx} style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '20px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
              }}>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, marginBottom: '24px', fontStyle: 'italic' }}>
                  &quot;{rev.text}&quot;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#ffe3d3',
                    color: '#fb7339',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '16px'
                  }}>
                    {rev.initial}
                  </div>
                  <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '15px' }}>{rev.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES SECTION */}
      <section id="placements" style={{ padding: '100px 24px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ color: '#fb7339', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SUCCESS STORIES</span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#0f172a', marginTop: '12px' }}>Our students are making their mark at top companies worldwide.</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            marginBottom: '64px'
          }}>
            {placements.map((plc, idx) => (
              <div key={idx} style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: '#fb733910',
                  color: '#fb7339',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '20px',
                  flexShrink: 0
                }}>
                  {plc.initial}
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>{plc.name}</h4>
                  <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', fontWeight: 500 }}>{plc.role}</p>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#fb7339',
                    backgroundColor: '#fff5f0',
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}>{plc.company}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            borderRadius: '24px',
            padding: '48px',
            color: 'white',
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '40px',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '16px' }}>Want to download our detailed placement catalog?</h3>
              <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1.5 }}>See historical placement packages, student profiles, hiring patterns, and companies that recruit directly from SSP STI.</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <a
                href="https://wa.me/919035011859?text=Hi%20SSP%20STI,%20I%20would%20like%20to%20download%20the%20Placement%20Brochure"
                target="_blank"
                className="btn btn-orange"
                style={{ padding: '16px 32px', borderRadius: '8px', border: 'none' }}
              >
                Download Catalog
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* LEAD GENERATION FORM */}
      <section id="register" style={{ padding: '100px 24px', background: '#0f172a', color: 'white' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          <div>
            <span style={{ color: '#fb7339', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>APPLY TODAY</span>
            <h2 style={{ fontSize: '40px', fontWeight: 800, marginTop: '12px', marginBottom: '24px', lineHeight: 1.1 }}>Book a Free Placement Demo Class</h2>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
              Gain skills that turn potential into performance. ethics aligned. Meet our training heads and get answers to your tech queries.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ color: '#fb7339', fontSize: '18px', fontWeight: 'bold' }}>📍</span>
                <span style={{ fontSize: '14px', color: '#cbd5e1' }}>Annamaiah Circle, Beside DMART, Caratlane Building, AIR Bypass Road, Tirupati, Andhra Pradesh</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ color: '#fb7339', fontSize: '18px', fontWeight: 'bold' }}>📞</span>
                <span style={{ fontSize: '14px', color: '#cbd5e1' }}>+91-9035011859</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ color: '#fb7339', fontSize: '18px', fontWeight: 'bold' }}>✉</span>
                <span style={{ fontSize: '14px', color: '#cbd5e1' }}>persevcareers@gmail.com</span>
              </div>
            </div>
          </div>

          <div style={{ background: '#1e293b', padding: '40px', borderRadius: '24px', border: '1px solid #334155' }}>
            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
                <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>Thank You!</h3>
                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.5, marginBottom: '24px' }}>
                  We have prefilled your request. Redirecting you to WhatsApp to schedule your session details...
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  style={{
                    color: '#fb7339',
                    fontSize: '14px',
                    fontWeight: 700,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Submit another query
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="name" style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    style={{
                      background: '#0f172a',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="phone" style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your mobile number"
                    style={{
                      background: '#0f172a',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="email" style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    style={{
                      background: '#0f172a',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="course" style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Selected Course</label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    style={{
                      background: '#0f172a',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: 'white',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    {Object.keys(courses).map((key) => (
                      <option key={key} value={courses[key].title}>{courses[key].title}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-orange"
                  style={{
                    padding: '14px',
                    borderRadius: '8px',
                    justifyContent: 'center',
                    border: 'none',
                    fontWeight: 700,
                    marginTop: '10px'
                  }}
                >
                  Schedule Demo via WhatsApp
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#000000', color: '#94a3b8', padding: '64px 24px 32px 24px' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '40px',
          borderBottom: '1px solid #1e293b',
          paddingBottom: '40px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img src="/images/SSP.png" alt="SSP Logo" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
              <span style={{ fontWeight: 800, fontSize: '24px', color: 'white', letterSpacing: '0.05em' }}>SSP GLOBAL</span>
            </div>
            <p style={{ maxWidth: '380px', fontSize: '14px', lineHeight: 1.6, color: '#64748b' }}>
              Gain industry-relevant skills through a wide range of programs designed for real-world careers. Explore Cloud, DevOps, AI, Full Stack, and much more—built to make you confident, capable, and job-ready.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '80px', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ color: 'white', fontWeight: 700, fontSize: '15px', marginBottom: '16px' }}>Programs</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', padding: 0 }}>
                <li>Cloud & DevOps</li>
                <li>Cloud Computing</li>
                <li>Full Stack Development</li>
                <li>Artificial Intelligence (AI)</li>
                <li>And Much More</li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: 700, fontSize: '15px', marginBottom: '16px' }}>Divisions</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', padding: 0 }}>
                <li><a href="/" style={{ color: '#94a3b8' }}>SSP Global Home</a></li>
                <li><a href="#courses" style={{ color: '#94a3b8' }}>Software Training (STI)</a></li>
                <li><a href="https://ss.ssptechedu.com" style={{ color: '#94a3b8' }}>Software Solutions (SS)</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '32px',
          fontSize: '12px'
        }}>
          <span>© 2026 SSP Institute. All rights reserved.</span>
          <span>Designed for Shiva Sai Perseverance</span>
        </div>
      </footer>
    </div>
  )
}
