'use client'

import React, { useState } from 'react'

interface ServiceDetail {
  title: string
  icon: string
  description: string
  bullets: string[]
  accentColor: string
}

export default function SSPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: 'Custom Software Development',
    details: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0)

  const services: ServiceDetail[] = [
    {
      title: 'Custom Software Development',
      icon: '💻',
      description: 'We design and engineer bespoke software platforms tailored to your company’s unique operations. Whether it’s an enterprise ERP, custom CRM, or scalable web portal, we build with security and expansion in mind.',
      bullets: [
        'Enterprise ERP & CRM Architecture',
        'Scalable Web Apps (Next.js, React, Node.js, Go)',
        'Robust Database Integrations (PostgreSQL, MongoDB)',
        'Secure API & Microservice Orchestration',
      ],
      accentColor: '#3b82f6',
    },
    {
      title: 'AI & Machine Learning Integrations',
      icon: '🤖',
      description: 'Automate business intelligence and improve customer experience with custom ML models. We integrate Large Language Models (LLMs), design custom RAG chatbots, and build predictive vision/data systems.',
      bullets: [
        'Generative AI & LLM Finetuning (OpenAI, Anthropic)',
        'Retrieval Augmented Generation (RAG) for internal docs',
        'Predictive Analytics & Recommendation Engines',
        'Object Detection & Computer Vision Pipelines',
      ],
      accentColor: '#8b5cf6',
    },
    {
      title: 'Cloud & DevOps Automation',
      icon: '☁️',
      description: 'Accelerate your deployment lifecycle and secure your systems on the cloud. We orchestrate AWS and GCP architectures, build automated CI/CD pipelines, and manage container deployments.',
      bullets: [
        'Infrastructure as Code (IaC) via Terraform',
        'Containerization & Orchestration (Docker, Kubernetes)',
        'Automated CI/CD Pipelines (GitHub Actions, Jenkins)',
        'High-Availability & Auto-Scaling Setups',
      ],
      accentColor: '#fb7339',
    },
    {
      title: 'Robotic Process Automation (RPA)',
      icon: '⚙️',
      description: 'Eliminate repetitive, error-prone manual operations. We build customized bot scripts and RPA integrations to synchronize systems, migrate data, and run automatic back-office processing.',
      bullets: [
        'Workflow Optimization & Custom Bot Scripts',
        'Legacy System Synchronization & Integrations',
        'Bulk Data Scraping & Automated Reports',
        'Zero-error Data Entry & Verification Systems',
      ],
      accentColor: '#10b981',
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      alert('Please fill out Name and Phone Number')
      return
    }

    const waMessage = `Hi SSP Software Solutions, I would like to request a project consultation.%0A%0A*Name:* ${encodeURIComponent(
      formData.name
    )}%0A*Company:* ${encodeURIComponent(formData.company || 'N/A')}%0A*Phone:* ${encodeURIComponent(
      formData.phone
    )}%0A*Email:* ${encodeURIComponent(formData.email || 'N/A')}%0A*Service Required:* ${encodeURIComponent(
      formData.service
    )}%0A*Brief details:* ${encodeURIComponent(formData.details || 'N/A')}`

    window.open(`https://wa.me/919035011859?text=${waMessage}`, '_blank')
    setIsSubmitted(true)
  }

  return (
    <div style={{ backgroundColor: '#0b1329', color: '#f8fafc', minHeight: '100vh', fontFamily: 'var(--font-inter)' }}>
      {/* HEADER */}
      <header style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        zIndex: 100,
        background: 'rgba(11, 19, 41, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #1e293b',
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
            <img src="/images/SSP.png" alt="SSP Logo" style={{ width: '44px', height: '44px', objectFit: 'contain', filter: 'brightness(1.2)' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 800, fontSize: '20px', color: 'white', letterSpacing: '0.05em' }}>SSP SOLUTIONS</span>
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '-3px' }}>Software Solutions & consulting</span>
            </div>
          </a>
          <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <a href="/" style={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8' }}>Home</a>
            <a href="#services" style={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8' }}>Services</a>
            <a href="#consultation" className="btn btn-orange" style={{
              borderRadius: '50px',
              padding: '8px 20px',
              fontSize: '13px',
              border: 'none',
              boxShadow: '0 4px 10px rgba(251, 115, 57, 0.25)',
              backgroundColor: '#3b82f6'
            }}>Request Quote</a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={{
        background: 'radial-gradient(circle at 10% 20%, #101b35 0%, #0b1329 100%)',
        padding: '100px 24px 120px 24px',
        borderBottom: '1px solid #1e293b'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '64px', alignItems: 'center' }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '20px',
              padding: '6px 16px',
              color: '#3b82f6',
              fontSize: '13px',
              fontWeight: 700,
              marginBottom: '24px',
              letterSpacing: '0.05em'
            }}>
              🛠️ SYSTEM INTEGRITY & SCALE
            </div>
            <h1 style={{
              fontFamily: 'var(--font-mulish)',
              fontSize: 'clamp(36px, 4.5vw, 64px)',
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.1,
              marginBottom: '24px',
              letterSpacing: '-0.02em'
            }}>
              Accelerating Enterprise <span style={{ color: '#3b82f6' }}>Digital Transformation</span>
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#94a3b8',
              lineHeight: 1.6,
              marginBottom: '36px',
              maxWidth: '600px'
            }}>
              We build secure, robust, and scalable custom software, deploy enterprise-grade AI integrations, and design automated cloud pipelines for high-growth businesses.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#services" className="btn btn-orange" style={{ padding: '14px 28px', borderRadius: '8px', backgroundColor: '#3b82f6' }}>Our Expertise</a>
              <a href="#consultation" className="btn btn-border" style={{ padding: '14px 28px', borderRadius: '8px', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>Book Consultation</a>
            </div>
          </div>
          
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '100%',
              maxWidth: '440px',
              aspectRatio: '4/5',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              position: 'relative',
              zIndex: 2
            }}>
              <img
                src="/software_solutions_banner_1778688395539.png"
                alt="AI and Cloud Servers"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED SERVICES TAB SELECTOR */}
      <section id="services" style={{ padding: '100px 24px', backgroundColor: '#090f20' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ color: '#3b82f6', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SERVICES INDEX</span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'white', marginTop: '12px' }}>Enterprise Capabilities</h2>
            <p style={{ color: '#64748b', fontSize: '16px', marginTop: '8px' }}>Select an area of expertise to explore our technology architectures.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '48px', alignItems: 'start' }}>
            {/* List side */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {services.map((serv, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedServiceIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '24px',
                    borderRadius: '16px',
                    backgroundColor: selectedServiceIndex === idx ? '#111a33' : 'transparent',
                    border: selectedServiceIndex === idx ? `1px solid rgba(59,130,246,0.3)` : '1px solid transparent',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span style={{ fontSize: '24px' }}>{serv.icon}</span>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: selectedServiceIndex === idx ? 'white' : '#64748b' }}>{serv.title}</span>
                </button>
              ))}
            </div>

            {/* Display detail side */}
            <div style={{
              background: '#111a33',
              borderRadius: '24px',
              padding: '48px',
              border: '1px solid rgba(255,255,255,0.05)',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                backgroundColor: 'rgba(255,255,255,0.03)',
                fontSize: '32px',
                marginBottom: '24px'
              }}>
                {services[selectedServiceIndex].icon}
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '16px' }}>{services[selectedServiceIndex].title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.6, marginBottom: '32px' }}>{services[selectedServiceIndex].description}</p>
              
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.05em' }}>Key Implementations</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {services[selectedServiceIndex].bullets.map((bullet, bidx) => (
                  <div key={bidx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>•</span>
                    <span style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.4' }}>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK & SYSTEM INFRASTRUCTURE */}
      <section style={{ padding: '80px 24px', borderTop: '1px solid #1e293b', borderBottom: '1px solid #1e293b', backgroundColor: '#0b1329' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ color: '#3b82f6', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>STABLE STACK</span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'white', marginTop: '12px' }}>Technologies We Deploy</h2>
            <p style={{ color: '#94a3b8', fontSize: '16px', marginTop: '8px' }}>We utilize modern programming languages and web standards to construct secure networks.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {[
              { title: 'Frontend Technologies', tools: ['Next.js (App Router)', 'React 19', 'TypeScript', 'TailwindCSS / Vanilla CSS'] },
              { title: 'Backend & Databases', tools: ['Node.js & Express.js', 'Go (Golang)', 'PostgreSQL & MySQL', 'MongoDB & Redis'] },
              { title: 'Cloud & Infrastructure', tools: ['AWS Infrastructure', 'Docker Containerization', 'Kubernetes Orchestration', 'Terraform (IaC)'] },
            ].map((st, sidx) => (
              <div key={sidx} style={{
                background: '#0e1832',
                padding: '36px',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'white', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>{st.title}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {st.tools.map((t, tidx) => (
                    <span key={tidx} style={{
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#cbd5e1'
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCOVERY & QUOTE INTAKE FORM */}
      <section id="consultation" style={{ padding: '100px 24px', background: '#090f20' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '64px', alignItems: 'center' }}>
          <div>
            <span style={{ color: '#3b82f6', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>GET IN TOUCH</span>
            <h2 style={{ fontSize: '40px', fontWeight: 800, color: 'white', marginTop: '12px', marginBottom: '24px', lineHeight: 1.1 }}>Request Project Consultation</h2>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
              Have a software project, cloud migration requirement, or automation workflow to discuss? Submit the details to review with our technical directors.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ color: '#3b82f6', fontSize: '18px', fontWeight: 'bold' }}>📍</span>
                <span style={{ fontSize: '14px', color: '#94a3b8' }}>Annamaiah Circle, Beside DMART, Bypass Road, Tirupati</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ color: '#3b82f6', fontSize: '18px', fontWeight: 'bold' }}>📞</span>
                <span style={{ fontSize: '14px', color: '#94a3b8' }}>+91-9035011859</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ color: '#3b82f6', fontSize: '18px', fontWeight: 'bold' }}>✉</span>
                <span style={{ fontSize: '14px', color: '#94a3b8' }}>persevcareers@gmail.com</span>
              </div>
            </div>
          </div>

          <div style={{ background: '#111a33', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📩</div>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'white', marginBottom: '12px' }}>Request Received</h3>
                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.5, marginBottom: '24px' }}>
                  We have prepared your project specifications. Redirecting you to WhatsApp to connect with our consulting lead...
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  style={{
                    color: '#3b82f6',
                    fontSize: '14px',
                    fontWeight: 700,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="name" style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Contact Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      style={{
                        background: '#090f20',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        color: 'white',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="company" style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Company Name</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Company"
                      style={{
                        background: '#090f20',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        color: 'white',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="phone" style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Mobile number"
                      style={{
                        background: '#090f20',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        color: 'white',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="email" style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@company.com"
                      style={{
                        background: '#090f20',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        color: 'white',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="service" style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Project Type</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    style={{
                      background: '#090f20',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: 'white',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Custom Software Development">Custom Software Development</option>
                    <option value="AI & Machine Learning Integration">AI & Machine Learning Integration</option>
                    <option value="Cloud & DevOps Automation">Cloud & DevOps Automation</option>
                    <option value="Robotic Process Automation (RPA)">Robotic Process Automation (RPA)</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="details" style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Project Scope Details</label>
                  <textarea
                    id="details"
                    name="details"
                    rows={4}
                    value={formData.details}
                    onChange={handleInputChange}
                    placeholder="Briefly describe the software or automation you require"
                    style={{
                      background: '#090f20',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: 'white',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      resize: 'vertical'
                    }}
                  />
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
                    backgroundColor: '#3b82f6',
                    marginTop: '10px'
                  }}
                >
                  Send Consultation Request
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#050a14', color: '#64748b', padding: '64px 24px 32px 24px', borderTop: '1px solid #1e293b' }}>
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
              <h4 style={{ color: 'white', fontWeight: 700, fontSize: '15px', marginBottom: '16px' }}>Our Services</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', padding: 0 }}>
                <li>Custom Software</li>
                <li>AI & Machine Learning</li>
                <li>Cloud Architectures</li>
                <li>Workflow Automation</li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: 700, fontSize: '15px', marginBottom: '16px' }}>Divisions</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', padding: 0 }}>
                <li><a href="/" style={{ color: '#64748b' }}>SSP Global Home</a></li>
                <li><a href="https://sti.ssptechedu.com" style={{ color: '#64748b' }}>Software Training (STI)</a></li>
                <li><a href="#services" style={{ color: '#64748b' }}>Software Solutions (SS)</a></li>
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
