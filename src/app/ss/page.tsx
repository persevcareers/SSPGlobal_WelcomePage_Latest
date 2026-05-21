'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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
    service: 'Website & App Development',
    details: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0)

  const [homeUrl, setHomeUrl] = useState('/')
  const [stiUrl, setStiUrl] = useState('https://sti.ssptechedu.com')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname
      if (hostname.startsWith('sti.') || hostname.startsWith('ss.')) {
        const parts = hostname.split('.')
        const parentDomain = parts.slice(1).join('.')
        const port = window.location.port ? `:${window.location.port}` : ''
        setHomeUrl(`${window.location.protocol}//${parentDomain}${port}`)
        setStiUrl(`${window.location.protocol}//sti.${parentDomain}${port}`)
      } else if (hostname.includes('localhost') || hostname.includes('127.0.0.1') || hostname.includes('192.168.')) {
        setHomeUrl('/')
        setStiUrl('/sti')
      }
    }
  }, [])

  const router = useRouter()

  const handleSmoothNavigation = (targetUrl: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
    }
    const wrapper = document.getElementById('smooth-page-wrapper')
    if (wrapper) {
      wrapper.classList.remove('fade-in')
      setTimeout(() => {
        if (targetUrl.startsWith('http://') || targetUrl.startsWith('https://')) {
          window.location.href = targetUrl
        } else {
          router.push(targetUrl)
        }
      }, 400)
    } else {
      if (targetUrl.startsWith('http://') || targetUrl.startsWith('https://')) {
        window.location.href = targetUrl
      } else {
        router.push(targetUrl)
      }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    const timer = setTimeout(() => {
      const wrapper = document.getElementById('smooth-page-wrapper')
      if (wrapper) {
        wrapper.classList.add('fade-in')
      }
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  const services: ServiceDetail[] = [
    {
      title: 'Website & App Development',
      icon: '💻',
      description: 'We create modern websites and scalable mobile applications designed to help businesses grow, engage customers, and build a strong digital presence.',
      bullets: [
        'Responsive Web Design (Next.js, React)',
        'Native & Cross-Platform Mobile Apps (React Native)',
        'Headless CMS & Static Site Generation',
        'Performance & Core Web Vitals Optimization',
      ],
      accentColor: '#3b82f6',
    },
    {
      title: 'Cloud Solutions',
      icon: '☁️',
      description: 'Enterprise-grade cloud architecture, migration, and management across AWS, Azure, and GCP. We design scalable, secure, and cost-optimized cloud environments.',
      bullets: [
        'Multi-Cloud Architecture (AWS, Azure, GCP)',
        'Cloud Migration & Modernization',
        'Cost Optimization & Observability',
        'High Availability & Disaster Recovery',
      ],
      accentColor: '#06b6d4',
    },
    {
      title: 'AI Solutions',
      icon: '🤖',
      description: 'End-to-end AI and machine learning solutions — from data pipelines to production models. We build intelligent systems that drive real business outcomes.',
      bullets: [
        'Generative AI & LLM Finetuning (OpenAI, Anthropic)',
        'Retrieval Augmented Generation (RAG) Systems',
        'Predictive Analytics & ML Pipelines',
        'Computer Vision & NLP Systems',
      ],
      accentColor: '#8b5cf6',
    },
    {
      title: 'DevOps Solutions',
      icon: '⚙️',
      description: 'Accelerate delivery with CI/CD pipelines, infrastructure as code, and observability. Streamline your entire development lifecycle with modern DevOps practices.',
      bullets: [
        'Infrastructure as Code (Terraform)',
        'Containerization & Kubernetes',
        'Automated CI/CD Pipelines',
        'Site Reliability Engineering (SRE)',
      ],
      accentColor: '#fb7339',
    },
    {
      title: 'Automation Solutions',
      icon: '🔄',
      description: 'We streamline business operations through intelligent automation workflows, integrations, and scalable process optimization.',
      bullets: [
        'Workflow Automation & Integrations',
        'Legacy System Synchronization',
        'Bulk Data Migration & Processing',
        'Automated Reporting Systems',
      ],
      accentColor: '#10b981',
    },
    {
      title: 'Custom Software Development',
      icon: '🛠️',
      description: 'We build scalable custom software solutions tailored to unique business requirements, operational workflows, and enterprise needs.',
      bullets: [
        'Enterprise ERP & CRM Architectures',
        'Scalable SaaS Platform Development',
        'Secure Database Integrations',
        'Robust REST & GraphQL API Gateways',
      ],
      accentColor: '#f43f5e',
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
    <div id="smooth-page-wrapper" className="page-transition" style={{ backgroundColor: '#0b1329', color: '#f8fafc', minHeight: '100vh', fontFamily: 'var(--font-inter)' }}>
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
          <a href={homeUrl} onClick={(e) => handleSmoothNavigation(homeUrl, e)} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/images/SSP.png" alt="SSP Logo" style={{ width: '44px', height: '44px', objectFit: 'contain', filter: 'brightness(1.2)' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 800, fontSize: '20px', color: 'white', letterSpacing: '0.05em' }}>SSP SOLUTIONS</span>
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '-3px' }}>Software Solutions & consulting</span>
            </div>
          </a>
          <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <a href={homeUrl} onClick={(e) => handleSmoothNavigation(homeUrl, e)} style={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8' }}>Home</a>
            <a href="#vision" style={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8' }}>Our Vision</a>
            <a href="#services" style={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8' }}>Services</a>
            <a href="#industries" style={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8' }}>Industries</a>
            <a href="#leadership" style={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8' }}>Leadership</a>
            <a href="#insights" style={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8' }}>Insights</a>
            <a href="#consultation" className="btn btn-orange" style={{
              borderRadius: '50px',
              padding: '8px 20px',
              fontSize: '13px',
              border: 'none',
              boxShadow: '0 4px 10px rgba(59, 130, 246, 0.25)',
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
              A SOFTWARE ORGANIZATION IN TIRUPATI
            </div>
            <h1 style={{
              fontFamily: 'var(--font-mulish)',
              fontSize: 'clamp(36px, 4.5vw, 60px)',
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.1,
              marginBottom: '24px',
              letterSpacing: '-0.02em'
            }}>
              Engineering Intelligent <span style={{ color: '#3b82f6' }}>Solutions</span> for the Future of Business
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#94a3b8',
              lineHeight: 1.6,
              marginBottom: '36px',
              maxWidth: '600px'
            }}>
              We empower organizations to accelerate growth, enhance efficiency, and drive innovation with secure, scalable, and future-ready digital solutions.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#services" className="btn btn-orange" style={{ padding: '14px 28px', borderRadius: '8px', backgroundColor: '#3b82f6' }}>Explore Our Services</a>
              <a href="#consultation" className="btn btn-border" style={{ padding: '14px 28px', borderRadius: '8px', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>Talk to an Expert</a>
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

      {/* OUR VISION SECTION */}
      <section id="vision" style={{ padding: '100px 24px', backgroundColor: '#090f20', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ color: '#3b82f6', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>OUR VISION</span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'white', marginTop: '12px' }}>Building a Smarter, Sustainable Tomorrow</h2>
            <p style={{ color: '#64748b', fontSize: '16px', marginTop: '12px', maxWidth: '800px', margin: '12px auto 0 auto', lineHeight: 1.6 }}>
              Our vision is to be a global leader in digital transformation, creating intelligent solutions that empower businesses, enrich lives, and build a better future.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {[
              { title: 'Innovate with Purpose', desc: 'Harnessing next-generation technology to solve concrete, real-world problems and drive long-term business value.', icon: '💡' },
              { title: 'Deliver with Integrity', desc: 'Upholding strict ethical standards, open communication, and total transparency at every stage of the project lifecycle.', icon: '🤝' },
              { title: 'Empower Every Business', desc: 'Crafting highly adaptable, custom-fit architectures that help companies adapt, build resilience, and scale operations.', icon: '🚀' },
              { title: 'Create Impact Globally', desc: 'Deploying high-performance enterprise systems that leave a lasting, positive footprint on global digital systems.', icon: '🌍' }
            ].map((item, idx) => (
              <div key={idx} style={{
                background: 'rgba(17, 26, 51, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '20px',
                padding: '32px',
                transition: 'all 0.3s ease',
                textAlign: 'left'
              }}>
                <div style={{ fontSize: '36px', marginBottom: '20px' }}>{item.icon}</div>
                <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>{item.title}</h4>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DETAILED SERVICES TAB SELECTOR */}
      <section id="services" style={{ padding: '100px 24px', backgroundColor: '#0b1329', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ color: '#3b82f6', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>OUR SERVICES</span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'white', marginTop: '12px' }}>End-to-End Solutions Built for Enterprise Success</h2>
            <p style={{ color: '#64748b', fontSize: '16px', marginTop: '8px' }}>We combine deep domain expertise with modern technologies to deliver solutions that drive real business outcomes.</p>
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
                    padding: '20px 24px',
                    borderRadius: '16px',
                    backgroundColor: selectedServiceIndex === idx ? '#111a33' : 'transparent',
                    border: selectedServiceIndex === idx ? `1px solid rgba(59,130,246,0.3)` : '1px solid transparent',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    width: '100%'
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

      {/* INDUSTRIES WE SERVE SECTION */}
      <section id="industries" style={{ padding: '100px 24px', backgroundColor: '#090f20', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ color: '#3b82f6', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>INDUSTRIES</span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'white', marginTop: '12px' }}>Industry Solutions That Drive Impact</h2>
            <p style={{ color: '#64748b', fontSize: '16px', marginTop: '8px' }}>We partner with organizations across industries to solve complex challenges and unlock new opportunities.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { name: 'Healthcare', desc: 'Secure patient portals, telemedicine systems, and HIPAA-compliant data pipelines.', icon: '🏥' },
              { name: 'Financial Services', desc: 'Secure payment engines, trading tools, and automated bookkeeping architectures.', icon: '🏦' },
              { name: 'E-Commerce', desc: 'High-speed online shopping systems, Stripe/PayPal checkout routes, and CRM syncing.', icon: '🛍️' },
              { name: 'Education', desc: 'Student monitoring frameworks, live stream classes, and curriculum builders.', icon: '🎓' },
              { name: 'Logistics', desc: 'Real-time transit checkers, vehicle trackers, and automated packing logs.', icon: '📦' },
              { name: 'Real Estate', desc: 'Virtual site viewers, broker CRM portals, and automatic billing systems.', icon: '🏢' },
            ].map((ind, idx) => (
              <div key={idx} style={{
                background: 'rgba(17, 26, 51, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: '32px',
                transition: 'all 0.3s ease',
              }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{ind.icon}</div>
                <h4 style={{ fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>{ind.name}</h4>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP SECTION */}
      <section id="leadership" style={{ padding: '100px 24px', backgroundColor: '#0b1329', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ color: '#3b82f6', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>LEADERSHIP</span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'white', marginTop: '12px' }}>Visionary Leaders. Trusted Guidance.</h2>
            <p style={{ color: '#64748b', fontSize: '16px', marginTop: '8px' }}>Our leadership team brings experience in technology, innovation, and business strategy to guide our vision and growth.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', justifyItems: 'center' }}>
            {[
              { name: 'Sai Charan V P', role: 'Chief Executive Officer', init: 'SC' },
              { name: 'Manoj Kumar G', role: 'Director', init: 'MK' },
              { name: 'Praveen Kumar G', role: 'Founder', init: 'PK' },
            ].map((leader, idx) => (
              <div key={idx} style={{
                background: '#111a33',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '24px',
                padding: '40px 32px',
                textAlign: 'center',
                width: '100%',
                maxWidth: '360px',
                boxShadow: '0 10px 20px rgba(0,0,0,0.15)'
              }}>
                <div style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  fontWeight: 800,
                  color: 'white',
                  margin: '0 auto 24px auto',
                  boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)'
                }}>
                  {leader.init}
                </div>
                <h4 style={{ fontSize: '22px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>{leader.name}</h4>
                <p style={{ fontSize: '14px', color: '#3b82f6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{leader.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSIGHTS SECTION */}
      <section id="insights" style={{ padding: '100px 24px', backgroundColor: '#090f20', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ color: '#3b82f6', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>INSIGHTS</span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'white', marginTop: '12px' }}>Latest Insights and Perspectives</h2>
            <p style={{ color: '#64748b', fontSize: '16px', marginTop: '8px' }}>Explore the latest trends, technology insights, and thought leadership from our experts.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
            {[
              { category: 'AI & Innovation', title: 'The Future of AI in Enterprise Transformation', date: 'May 2, 2026', read: '5 min read' },
              { category: 'Cloud', title: 'Building Scalable Cloud Architectures', date: 'April 25, 2026', read: '4 min read' },
              { category: 'Cyber Security', title: 'Strengthening Security in a Digital-First World', date: 'April 18, 2026', read: '6 min read' },
              { category: 'Digital Transformation', title: 'How Businesses Can Drive Meaningful Change', date: 'April 10, 2026', read: '5 min read' },
            ].map((art, idx) => (
              <div key={idx} style={{
                background: '#111a33',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'all 0.3s ease',
              }}>
                <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{
                    color: '#3b82f6',
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '16px',
                    display: 'block'
                  }}>{art.category}</span>
                  <h4 style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'white',
                    lineHeight: 1.4,
                    marginBottom: '24px',
                    flex: 1
                  }}>{art.title}</h4>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '13px',
                    color: '#64748b',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    paddingTop: '16px'
                  }}>
                    <span>{art.date}</span>
                    <span>{art.read}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK & SYSTEM INFRASTRUCTURE */}
      <section style={{ padding: '80px 24px', borderBottom: '1px solid #1e293b', backgroundColor: '#0b1329' }}>
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
                <span style={{ fontSize: '14px', color: '#94a3b8' }}>Annamaiah Circle, Beside DMART, Caratlane Building, Air Bypass Road, Tirupati, Andhra Pradesh</span>
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
                    {services.map((s, i) => (
                      <option key={i} value={s.title}>{s.title}</option>
                    ))}
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
            <p style={{ maxWidth: '450px', fontSize: '14px', lineHeight: 1.6, color: '#94a3b8' }}>
              At SSP Global, we believe technology is not just a service — it is a commitment built on trust, transparency, and long-term value. We focus on client success by delivering ethical, reliable, and future-ready solutions with complete dedication and professionalism. Our mission is to provide the best service experience through innovation, integrity, and strong customer relationships.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '80px', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ color: 'white', fontWeight: 700, fontSize: '15px', marginBottom: '16px' }}>Our Services</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', padding: 0 }}>
                {services.map((s, i) => (
                  <li key={i} style={{ color: '#64748b' }}>{s.title}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: 700, fontSize: '15px', marginBottom: '16px' }}>Divisions</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', padding: 0 }}>
                <li><a href={homeUrl} onClick={(e) => handleSmoothNavigation(homeUrl, e)} style={{ color: '#64748b' }}>SSP Global Home</a></li>
                <li><a href={stiUrl} onClick={(e) => handleSmoothNavigation(stiUrl, e)} style={{ color: '#64748b' }}>Software Training (STI)</a></li>
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
          <span>© 2026 SSP Software Solutions. All rights reserved.</span>
          <span>Designed for Shiva Sai Perseverance</span>
        </div>
      </footer>
    </div>
  )
}
