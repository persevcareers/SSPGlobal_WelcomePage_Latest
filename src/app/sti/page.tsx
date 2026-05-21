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
}

export default function STIPage() {
  const [activeCourse, setActiveCourse] = useState<string>('fullstack')
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', course: 'Full-Stack Web Development' })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const courses: Record<string, Course> = {
    fullstack: {
      id: 'fullstack',
      title: 'Full-Stack Web Development',
      duration: '6 Months',
      mode: 'Classroom & Online',
      description: 'Master frontend and backend technologies. Learn to build modern, database-driven, and highly scalable web applications from scratch.',
      syllabus: [
        'HTML5, CSS3, & Modern JavaScript (ES6+)',
        'React.js & Next.js (App Router, SSR, Server Components)',
        'Node.js & Express.js Backend Architecture',
        'Relational & Non-Relational Databases (MongoDB, PostgreSQL)',
        'RESTful APIs & GraphQL Integration',
        'State Management (Redux Toolkit, Context API)',
      ],
      projects: ['E-Commerce Platform with Stripe Checkout', 'Real-Time Collaborative Dashboard', 'SaaS Product with User Authentication'],
      color: '#3b82f6',
    },
    aiml: {
      id: 'aiml',
      title: 'AI & Machine Learning',
      duration: '6 Months',
      mode: 'Classroom & Online',
      description: 'Dive deep into algorithms, neural networks, and generative AI. Build intelligent agents, computer vision models, and natural language processors.',
      syllabus: [
        'Python Programming & Advanced Data Analysis (Pandas, NumPy)',
        'Supervised & Unsupervised Machine Learning Algorithms',
        'Deep Learning with TensorFlow & PyTorch',
        'Natural Language Processing (NLP) & Large Language Models',
        'Computer Vision & Convolutional Neural Networks (CNNs)',
        'M LOps: Deploying AI Models to Production',
      ],
      projects: ['Predictive Medical Diagnostics Engine', 'Real-Time Object Detection Application', 'Custom RAG Chatbot trained on enterprise documents'],
      color: '#8b5cf6',
    },
    devops: {
      id: 'devops',
      title: 'Cloud & DevOps Engineering',
      duration: '4 Months',
      mode: 'Classroom & Online',
      description: 'Bridge the gap between development and operations. Learn cloud infrastructure deployment, containerization, and continuous integration pipelines.',
      syllabus: [
        'Linux Administration & Shell Scripting',
        'Cloud Platforms: Amazon Web Services (AWS)',
        'Containerization: Docker & Container Orchestration: Kubernetes',
        'Infrastructure as Code (IaC) with Terraform',
        'CI/CD Pipelines (Jenkins, GitHub Actions)',
        'Monitoring & Logging (Prometheus, Grafana, ELK Stack)',
      ],
      projects: ['Automated Blue-Green Deployments with AWS & Terraform', 'Kubernetes Multi-Microservice Deployment', 'Highly Available Jenkins CI/CD Infrastructure'],
      color: '#fb7339',
    },
    datascience: {
      id: 'datascience',
      title: 'Data Science & Big Data',
      duration: '5 Months',
      mode: 'Classroom & Online',
      description: 'Unlock the power of big data. Extract patterns, build interactive dashboards, and drive strategic business decisions through data analysis.',
      syllabus: [
        'Statistics, Probability, & Quantitative Methods',
        'SQL for Data Engineering & Advanced Data Querying',
        'Data Visualization (PowerBI, Tableau, Seaborn)',
        'Big Data Ecosystems (Apache Spark, Hadoop)',
        'Time Series Forecasting & Predictive Analysis',
        'Data Cleaning, Engineering, & Feature Selection',
      ],
      projects: ['Real-time Financial Fraud Detection System', 'Interactive Executive Business Intelligence Dashboard', 'Customer Churn Analysis & Segmentation Engine'],
      color: '#06b6d4',
    },
  }

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

    // Connect to WhatsApp Lead System
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
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: 'var(--font-inter)' }}>
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
            <a href="#courses" style={{ fontSize: '14px', fontWeight: 600, color: '#475569' }}>Courses</a>
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
              Launch Your Career in <span style={{ color: '#fb7339', position: 'relative' }}>Software Engineering</span>
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#475569',
              lineHeight: 1.6,
              marginBottom: '36px',
              maxWidth: '540px'
            }}>
              Gain hands-on experience working on live applications. Get mentored by corporate tech professionals and secure jobs in premium MNCs.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#courses" className="btn btn-orange" style={{ padding: '14px 28px', borderRadius: '8px' }}>Explore Courses</a>
              <a href="#register" className="btn btn-border" style={{ padding: '14px 28px', borderRadius: '8px' }}>Apply For Batch</a>
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
                <span style={{ fontSize: '32px', fontWeight: 800, color: '#fb7339', display: 'none' }}>Highest Package</span>
                <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Highest Package Secured</span>
              </div>
            </div>
          </div>
          
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '100%',
              maxWidth: '500px',
              aspectRatio: '1/1',
              borderRadius: '30px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(251, 115, 57, 0.15)',
              border: '8px solid white',
              position: 'relative',
              zIndex: 2
            }}>
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Students learning coding"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {/* Background elements */}
            <div style={{
              position: 'absolute',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(251,115,57,0.08) 0%, rgba(255,255,255,0) 70%)',
              top: '-50px',
              right: '-50px',
              zIndex: 1
            }}></div>
          </div>
        </div>
      </section>

      {/* PLACEMENTS STATS */}
      <section id="placements" style={{ padding: '80px 24px', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ color: '#fb7339', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>PROVEN SUCCESS</span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#0f172a', marginTop: '12px' }}>Where Our Graduates Work</h2>
            <p style={{ color: '#475569', fontSize: '16px', marginTop: '8px' }}>Our placement division coordinates hiring with top IT companies and fast-growing startups.</p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
            marginBottom: '64px'
          }}>
            {[
              { label: 'TCS', role: 'System Engineer', pkg: '4.2 LPA' },
              { label: 'Infosys', role: 'Power Programmer', pkg: '6.5 LPA' },
              { label: 'Accenture', role: 'Application Associate', pkg: '4.8 LPA' },
              { label: 'Wipro', role: 'Project Engineer', pkg: '4.0 LPA' },
              { label: 'Tech Mahindra', role: 'Software Developer', pkg: '5.2 LPA' },
            ].map((p, index) => (
              <div key={index} style={{
                background: 'white',
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>{p.label}</div>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginBottom: '16px' }}>{p.role}</div>
                <div style={{
                  display: 'inline-block',
                  background: '#f0fdf4',
                  color: '#16a34a',
                  fontWeight: 700,
                  fontSize: '12px',
                  padding: '4px 12px',
                  borderRadius: '20px'
                }}>{p.pkg} Package</div>
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

      {/* CURRICULUM SECTION */}
      <section id="courses" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ color: '#fb7339', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>OUR PROGRAMS</span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#0f172a', marginTop: '12px' }}>Choose Your Specialization</h2>
            <p style={{ color: '#475569', fontSize: '16px', marginTop: '8px' }}>We cover fundamental algorithms, databases, and advanced tools in specialized branches.</p>
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

      {/* TRAINING MINDSET SECTION */}
      <section style={{ padding: '80px 24px', backgroundColor: '#fafafa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ color: '#fb7339', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>OUR METHODOLOGY</span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#0f172a', marginTop: '12px' }}>The Student Success Process</h2>
            <p style={{ color: '#475569', fontSize: '16px', marginTop: '8px' }}>How we turn coding novices into professional programmers.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {[
              { title: 'Individual Tracking', text: 'We maintain progress charts for every student. Daily tasks and assessments are reviewed by mentors to detect and fill coding knowledge gaps immediately.' },
              { title: 'Standalone Mindset', text: 'We encourage self-debugging and critical thinking. Rather than just giving answers, we train students to read docs, write pseudocode, and think like engineering leads.' },
              { title: 'Lifetime Support', text: 'Graduation is not the end. All alumni retain access to our campus facilities, training libraries, placement support, and mentorship sessions forever.' },
            ].map((mind, idx) => (
              <div key={idx} style={{
                background: 'white',
                padding: '36px',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 10px rgba(0,0,0,0.01)'
              }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#fb7339',
                  marginBottom: '16px'
                }}>0{idx + 1}</div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>{mind.title}</h3>
                <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>{mind.text}</p>
              </div>
            ))}
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
              Want to see how we teach? Register for a free demo session. Meet our training heads and get answers to your tech queries.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ color: '#fb7339', fontSize: '18px', fontWeight: 'bold' }}>📍</span>
                <span style={{ fontSize: '14px', color: '#cbd5e1' }}>Annamaiah Circle, Beside DMART, Bypass Road, Tirupati</span>
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
                    <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Cloud & DevOps Engineering">Cloud & DevOps Engineering</option>
                    <option value="Data Science & Big Data">Data Science & Big Data</option>
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

      {/* FAQ SECTION */}
      <section style={{ padding: '80px 24px', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ color: '#fb7339', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>HAVE QUESTIONS?</span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', marginTop: '12px' }}>Frequently Asked Questions</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              >
                <div style={{
                  padding: '20px 24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontWeight: 700,
                  fontSize: '16px',
                  color: '#0f172a'
                }}>
                  <span>{faq.q}</span>
                  <span style={{ color: '#fb7339', fontSize: '20px', transition: 'transform 0.3s' }}>
                    {activeFaq === index ? '−' : '+'}
                  </span>
                </div>
                {activeFaq === index && (
                  <div style={{
                    padding: '0 24px 20px 24px',
                    color: '#64748b',
                    fontSize: '14px',
                    lineHeight: 1.6,
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '16px'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
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
            <p style={{ maxWidth: '320px', fontSize: '14px', lineHeight: 1.5 }}>
              Tirupati&apos;s leading Software Organization providing Software Training, guaranteed Placement Support, and Custom Web Solutions.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '80px', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ color: 'white', fontWeight: 700, fontSize: '15px', marginBottom: '16px' }}>Training Courses</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', padding: 0 }}>
                <li>Full-Stack Web Dev</li>
                <li>AI & Machine Learning</li>
                <li>Cloud & DevOps</li>
                <li>Data Science & Analytics</li>
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
          <span>© 2026 SSP Global. All rights reserved.</span>
          <span>Designed for Shiva Sai Perseverance</span>
        </div>
      </footer>
    </div>
  )
}
