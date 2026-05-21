'use client'

import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import ThreeHero from '@/components/ThreeHero'

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeAccordion, setActiveAccordion] = useState<number>(0)
  const [headerHidden, setHeaderHidden] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  // 1. Lenis Smooth Scroll Setup
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)
    
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    // Hide/Show header on scroll
    let lastScroll = 0
    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      if (scroll > 120) {
        setHeaderHidden(scroll > lastScroll)
      } else {
        setHeaderHidden(false)
      }
      lastScroll = scroll
    })

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
    }
  }, [])

  // Lock/Unlock scroll when mobile menu is toggled
  useEffect(() => {
    if (lenisRef.current) {
      if (menuOpen) {
        lenisRef.current.stop()
      } else {
        lenisRef.current.start()
      }
    }
  }, [menuOpen])

  // 2. GSAP Scroll Animations
  useEffect(() => {
    // Reveal text reveals (per-word stagger)
    const titles = document.querySelectorAll('.section-title')
    titles.forEach((title) => {
      const text = title.textContent || ''
      const words = text.split(' ')
      title.innerHTML = words.map((w) => `<span class="word" style="display:inline-block">${w}</span>`).join(' ')
      const wordEls = title.querySelectorAll('.word')
      gsap.set(wordEls, { opacity: 0, y: 40 })

      ScrollTrigger.create({
        trigger: title,
        start: 'top 82%',
        once: true,
        onEnter: () => {
          gsap.to(wordEls, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: 'power2.out',
          })
        },
      })
    })

    // Image clip reveals
    const images = document.querySelectorAll('.project-image, .location-image, .management-image')
    images.forEach((img) => {
      gsap.set(img, { clipPath: 'inset(100% 0% 0% 0%)' })
      ScrollTrigger.create({
        trigger: img,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(img, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'power3.out',
          })
        },
      })
    })

    // Staggered fade ups
    const fadeEls = document.querySelectorAll('[data-fade]')
    fadeEls.forEach((el) => {
      const type = el.getAttribute('data-fade')
      let fromVars = { opacity: 0, y: 40, x: 0 }

      if (type === 'left') {
        fromVars = { opacity: 0, x: 40, y: 0 }
      } else if (type === 'right') {
        fromVars = { opacity: 0, x: -40, y: 0 }
      } else if (type === 'up') {
        fromVars = { opacity: 0, y: 40, x: 0 }
      }

      gsap.set(el, fromVars)

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          })
        },
      })
    })

    // S-Split card animation
    const cards = document.getElementById('s-split-cards')
    const cardLeft = document.getElementById('s-card-sti')
    const cardRight = document.getElementById('s-card-ssp')
    if (cards && cardLeft && cardRight) {
      gsap.set(cards, { opacity: 0 })
      gsap.set(cardLeft, { x: -80, opacity: 0 })
      gsap.set(cardRight, { x: 80, opacity: 0 })

      ScrollTrigger.create({
        trigger: '#s-split',
        start: 'top 70%',
        once: true,
        onEnter: () => {
          gsap.to(cards, { opacity: 1, duration: 0.4, ease: 'power2.out' })
          gsap.to(cardLeft, { x: 0, opacity: 1, duration: 0.8, delay: 0.1, ease: 'expo.out' })
          gsap.to(cardRight, { x: 0, opacity: 1, duration: 0.8, delay: 0.25, ease: 'expo.out' })
        },
      })
    }

    // Parallax on management image
    const mgmtImg = document.querySelector('.management-image img')
    if (mgmtImg) {
      gsap.to(mgmtImg, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.management',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    // Contact card entrance
    const contactContainer = document.querySelector('.contact-container')
    if (contactContainer) {
      const children = contactContainer.children
      gsap.set(children, { opacity: 0, y: 50 })
      ScrollTrigger.create({
        trigger: contactContainer,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to(children, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
          })
        },
      })
    }

    // Footer sticky reveal opacity control
    const footer = document.querySelector('.footer')
    if (footer) {
      ScrollTrigger.create({
        trigger: footer,
        start: 'top bottom',
        end: 'top top',
        onUpdate: (self) => {
          const p = self.progress
          gsap.set('.footer-inner', {
            opacity: 0.3 + p * 0.7,
            y: 30 * (1 - p),
          })
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <>
      {/* HEADER */}
      <header className={`header ${headerHidden ? 'hidden' : ''}`} id="header">
        <div className="header-inner">
          <a href="#" className="header-logo" id="header-logo">
            <img
              src="/images/SSP.png"
              alt="SSP Global"
              onError={(e) => {
                const target = e.currentTarget
                target.outerHTML = "<span class='logo-text'>SSP GLOBAL</span>"
              }}
            />
          </a>
          <nav className={`header-nav ${menuOpen ? 'open' : ''}`} id="header-nav">
            <ul>
              <li>
                <a href="#" className="active" onClick={() => setMenuOpen(false)}>
                  Home
                </a>
              </li>
              <li>
                <a href="https://sti.ssptechedu.com/" onClick={() => setMenuOpen(false)}>
                  Training
                </a>
              </li>
              <li>
                <a href="https://sti.ssptechedu.com/" onClick={() => setMenuOpen(false)}>
                  Placements
                </a>
              </li>
              <li>
                <a href="https://ss.ssptechedu.com/" onClick={() => setMenuOpen(false)}>
                  Software Solutions
                </a>
              </li>
              <li>
                <a href="#leadership" onClick={() => setMenuOpen(false)}>
                  Leadership
                </a>
              </li>
            </ul>
            <div className="header-phone">
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                Contact Us
              </a>
            </div>
          </nav>
          <div className="header-cta">
            <a href="#leadership" className="btn btn-orange" id="header-cta-btn">
              Meet Our Team
            </a>
          </div>
          <button
            className={`header-burger ${menuOpen ? 'active' : ''}`}
            id="header-burger"
            aria-label="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <main>
        {/* THREE.JS HERO CANVAS & PHASES */}
        <ThreeHero />

        {/* WELCOME S-SPLIT DIVISION ROUTER */}
        <section className="s-split-section" id="s-split" style={{ minHeight: 'auto' }}>
          <div
            className="s-split-inner"
            style={{
              flexDirection: 'column',
              paddingTop: 'clamp(60px, 6vw, 80px)',
              paddingBottom: 'clamp(60px, 6vw, 80px)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-mulish)',
                fontWeight: 800,
                fontSize: 'clamp(36px, 4.5vw, 72px)',
                color: 'var(--dark)',
                textAlign: 'center',
                marginBottom: 'clamp(40px, 4vw, 80px)',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
              }}
              data-fade="up"
            >
              WELCOME TO SSP
            </h2>

            {/* SEO Text */}
            <p
              style={{
                position: 'absolute',
                width: '1px',
                height: '1px',
                padding: 0,
                margin: '-1px',
                overflow: 'hidden',
                clip: 'rect(0,0,0,0)',
                whiteSpace: 'nowrap',
                border: 0,
              }}
              aria-hidden="false"
            >
              SSP Global is a premier Software Organization in Tirupati, Andhra Pradesh, offering
              comprehensive Software Training, guaranteed Placement Assistance, AI &amp; Machine
              Learning solutions, DevOps Training, Cloud Computing courses, and Custom Software
              Development. Known as Shiva Sai Perseverance, SSP Global bridges the gap between academic
              learning and industry demands through its two divisions: SSP STI (Software Training
              Institute) and SSP SS (Software Solutions). Top software training institute in Tirupati
              providing real-time training, internships, workshops, and 100% placement support.
            </p>

            <div className="s-split-cards" id="s-split-cards">
              <a
                href="https://sti.ssptechedu.com/"
                className="s-card s-card-left"
                id="s-card-sti"
                style={{ ['--theme-color' as any]: '15 89% 50%' }}
              >
                <div
                  className="s-card-bg"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                  }}
                ></div>
                <div className="s-card-overlay"></div>
                <div className="s-card-content">
                  <h3 className="s-card-title">STI</h3>
                  <div className="s-card-stats">Software Training Institute</div>
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '0.875rem',
                      color: 'rgba(255,255,255,0.9)',
                      marginTop: '1rem',
                      lineHeight: 1.4,
                    }}
                  >
                    Hands-on tech education for the future workforce. Real projects, expert mentors,
                    lifetime support.
                  </p>
                  <div className="s-card-button">
                    <span className="s-card-btn-text">Explore Training</span>
                    <svg className="s-card-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>

              <a
                href="https://ss.ssptechedu.com/"
                className="s-card s-card-right"
                id="s-card-ssp"
                style={{ ['--theme-color' as any]: '210 100% 50%' }}
              >
                <div
                  className="s-card-bg"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                  }}
                ></div>
                <div className="s-card-overlay"></div>
                <div className="s-card-content">
                  <h3 className="s-card-title">SS</h3>
                  <div className="s-card-stats">Software Solutions</div>
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '0.875rem',
                      color: 'rgba(255,255,255,0.9)',
                      marginTop: '1rem',
                      lineHeight: 1.4,
                    }}
                  >
                    Cutting-edge software development and digital transformation for businesses of all
                    scales.
                  </p>
                  <div className="s-card-button">
                    <span className="s-card-btn-text">Explore Solutions</span>
                    <svg className="s-card-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* LEADERSHIP SECTION */}
        <section className="projects" id="leadership">
          <div className="projects-container">
            <div
              className="projects-header"
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  backgroundColor: '#f0f8fb',
                  color: '#00a8cc',
                  fontFamily: 'var(--font-inter)',
                  fontSize: '13px',
                  fontWeight: 700,
                  padding: '6px 16px',
                  borderRadius: '20px',
                  marginBottom: '16px',
                  letterSpacing: '0.05em',
                }}
              >
                VISIONARIES
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 'clamp(32px, 5vw, 60px)',
                  fontWeight: 800,
                  color: '#0a192f',
                  marginBottom: '20px',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
                data-fade="up"
              >
                Leadership Behind SSP
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 'clamp(16px, 1.5vw, 20px)',
                  color: '#4a5568',
                  marginBottom: '8px',
                  lineHeight: 1.5,
                }}
              >
                Driven by experience. Focused on student success.
                <br />
                Meet the mentors shaping the future of engineering.
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '60px',
                maxWidth: '900px',
                margin: '0 auto',
                paddingTop: '40px',
              }}
            >
              {/* Leader 1 - CEO */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  overflow: 'visible',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '40px',
                }}
              >
                <div style={{ flexShrink: 0, width: '280px', position: 'relative' }}>
                  <img
                    src="/images/Sai Charan V P.png"
                    alt="Sai Charan V P"
                    style={{
                      width: '100%',
                      aspectRatio: '1/1',
                      objectFit: 'cover',
                      borderRadius: '24px',
                      border: '6px solid #ffffff',
                      boxShadow: '-12px -12px 0px #eaf8f9, 0 10px 20px rgba(0,0,0,0.05)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '-15px',
                      background: 'white',
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      color: '#00b4d8',
                      fontWeight: 'bold',
                      lineHeight: 1,
                    }}
                  >
                    ❞
                  </div>
                </div>
                <div
                  style={{
                    flexGrow: 1,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minWidth: '300px',
                    maxWidth: '500px',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '-15px',
                      left: '-25px',
                      fontSize: '45px',
                      color: '#eef2f5',
                      fontFamily: 'serif',
                      lineHeight: 1,
                      pointerEvents: 'none',
                    }}
                  >
                    ❝
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '18px',
                      color: '#222',
                      lineHeight: 1.5,
                      fontWeight: 500,
                      marginBottom: '24px',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    Our mission is to turn skills into confidence and confidence into careers. We are
                    here to bridge the gap between academic learning and industry demands.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ width: '30px', height: '2px', backgroundColor: '#00b4d8', marginRight: '12px' }}></span>
                      <strong style={{ fontFamily: 'var(--font-inter)', fontSize: '16px', color: '#000' }}>
                        Sai Charan V P
                      </strong>
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '10px',
                        fontWeight: 800,
                        color: '#00b4d8',
                        textTransform: 'uppercase',
                        marginLeft: '42px',
                        letterSpacing: '0.05em',
                      }}
                    >
                      CEO
                    </span>
                  </div>
                </div>
              </div>

              {/* Leader 2 - Director */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  overflow: 'visible',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '40px',
                }}
              >
                <div style={{ flexShrink: 0, width: '280px', position: 'relative' }}>
                  <img
                    src="/images/Manoj Kumar G.png"
                    alt="Manoj Kumar G"
                    style={{
                      width: '100%',
                      aspectRatio: '1/1',
                      objectFit: 'cover',
                      borderRadius: '24px',
                      border: '6px solid #ffffff',
                      boxShadow: '-12px -12px 0px #eaf8f9, 0 10px 20px rgba(0,0,0,0.05)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '-15px',
                      background: 'white',
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      color: '#00b4d8',
                      fontWeight: 'bold',
                      lineHeight: 1,
                    }}
                  >
                    ❞
                  </div>
                </div>
                <div
                  style={{
                    flexGrow: 1,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minWidth: '300px',
                    maxWidth: '500px',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '-15px',
                      left: '-25px',
                      fontSize: '45px',
                      color: '#eef2f5',
                      fontFamily: 'serif',
                      lineHeight: 1,
                      pointerEvents: 'none',
                    }}
                  >
                    ❝
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '18px',
                      color: '#222',
                      lineHeight: 1.5,
                      fontWeight: 500,
                      marginBottom: '24px',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    We don't train students for exams — we prepare them for real industry challenges.
                    Quality education is about empowerment, not just certification.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ width: '30px', height: '2px', backgroundColor: '#00b4d8', marginRight: '12px' }}></span>
                      <strong style={{ fontFamily: 'var(--font-inter)', fontSize: '16px', color: '#000' }}>
                        Manoj Kumar G
                      </strong>
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '10px',
                        fontWeight: 800,
                        color: '#00b4d8',
                        textTransform: 'uppercase',
                        marginLeft: '42px',
                        letterSpacing: '0.05em',
                      }}
                    >
                      DIRECTOR
                    </span>
                  </div>
                </div>
              </div>

              {/* Leader 3 - Founder */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  overflow: 'visible',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '40px',
                }}
              >
                <div style={{ flexShrink: 0, width: '280px', position: 'relative' }}>
                  <img
                    src="/images/Praveen Kumar G.png"
                    alt="Praveen Kumar G"
                    style={{
                      width: '100%',
                      aspectRatio: '1/1',
                      objectFit: 'cover',
                      borderRadius: '24px',
                      border: '6px solid #ffffff',
                      boxShadow: '-12px -12px 0px #eaf8f9, 0 10px 20px rgba(0,0,0,0.05)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '-15px',
                      background: 'white',
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      color: '#00b4d8',
                      fontWeight: 'bold',
                      lineHeight: 1,
                    }}
                  >
                    ❞
                  </div>
                </div>
                <div
                  style={{
                    flexGrow: 1,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minWidth: '300px',
                    maxWidth: '500px',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '-15px',
                      left: '-25px',
                      fontSize: '45px',
                      color: '#eef2f5',
                      fontFamily: 'serif',
                      lineHeight: 1,
                      pointerEvents: 'none',
                    }}
                  >
                    ❝
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '18px',
                      color: '#222',
                      lineHeight: 1.5,
                      fontWeight: 500,
                      marginBottom: '24px',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    SSP was built to create ethical, skilled engineers who are ready for the real world.
                    Integrity and perseverance are at the core of everything we do.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ width: '30px', height: '2px', backgroundColor: '#00b4d8', marginRight: '12px' }}></span>
                      <strong style={{ fontFamily: 'var(--font-inter)', fontSize: '16px', color: '#000' }}>
                        Praveen Kumar G
                      </strong>
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '10px',
                        fontWeight: 800,
                        color: '#00b4d8',
                        textTransform: 'uppercase',
                        marginLeft: '42px',
                        letterSpacing: '0.05em',
                      }}
                    >
                      FOUNDER
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DETAILED SOFTWARE SOLUTIONS */}
        <section
          className="software-solutions-detail"
          id="software-solutions"
          style={{ padding: 'clamp(80px, 8vw, 140px) 0', background: '#ffffff', position: 'relative', zIndex: 2 }}
        >
          <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 58px)' }}>
            <div className="responsive-grid" style={{ marginBottom: 'clamp(60px, 6vw, 120px)' }}>
              <div data-fade="right">
                <div
                  style={{
                    backgroundColor: '#f0f4ff',
                    color: '#3b82f6',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '13px',
                    fontWeight: 700,
                    padding: '6px 16px',
                    borderRadius: '20px',
                    marginBottom: '24px',
                    letterSpacing: '0.05em',
                    display: 'inline-block',
                  }}
                >
                  TECHNOLOGY EXCELLENCE
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: 'clamp(32px, 4vw, 56px)',
                    fontWeight: 800,
                    color: '#0a192f',
                    marginBottom: '24px',
                    lineHeight: 1.1,
                  }}
                >
                  Next-Gen Software <br />
                  <span style={{ color: '#3b82f6' }}>Solutions for Business</span>
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '18px',
                    color: '#4a5568',
                    lineHeight: 1.6,
                    marginBottom: '32px',
                  }}
                >
                  We build scalable, high-performance software that solves complex business problems. From
                  custom web platforms to <strong>AI-driven automation</strong>, our team specialize in
                  creating digital experiences that drive growth.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0a192f' }}>AI Integration</h4>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>
                      Leveraging Machine Learning to automate workflows and provide deep insights.
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0a192f' }}>Custom Solutions</h4>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>
                      Tailored software designed to scale with your business and security needs.
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ position: 'relative' }} data-fade="left">
                <div
                  style={{
                    aspectRatio: '4/5',
                    borderRadius: '32px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
                  }}
                >
                  <img
                    src="/software_solutions_banner_1778688395539.png"
                    alt="Software Solutions"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                {/* Floating Stat Card */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '-40px',
                    background: 'white',
                    padding: '24px',
                    borderRadius: '20px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    border: '1px solid #f1f5f9',
                  }}
                >
                  <span style={{ fontSize: '32px', fontWeight: 800, color: '#3b82f6' }}>99.9%</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#64748b' }}>Uptime & Reliability</span>
                </div>
              </div>
            </div>

            {/* Service Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              {/* Web Development */}
              <div className="pro-card" style={{ ['--card-accent' as any]: '#3b82f6' }}>
                <div className="pro-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>Web Development</h3>
                <p style={{ color: '#64748b', lineHeight: 1.6, marginBottom: '32px', fontSize: '15px' }}>
                  Modern, responsive websites and complex web applications built with React, Next.js, and
                  high-performance backends.
                </p>
                <ul className="pro-list">
                  <li className="pro-list-item">
                    <svg className="pro-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>{' '}
                    E-commerce & SaaS
                  </li>
                  <li className="pro-list-item">
                    <svg className="pro-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>{' '}
                    Enterprise Portals
                  </li>
                  <li className="pro-list-item">
                    <svg className="pro-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>{' '}
                    API Architecture
                  </li>
                </ul>
              </div>

              {/* AI & ML */}
              <div className="pro-card" style={{ ['--card-accent' as any]: '#8b5cf6' }}>
                <div className="pro-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>AI & ML Solutions</h3>
                <p style={{ color: '#64748b', lineHeight: 1.6, marginBottom: '32px', fontSize: '15px' }}>
                  Empowering businesses with intelligent automation, predictive analytics, and custom AI
                  models to drive efficiency.
                </p>
                <ul className="pro-list">
                  <li className="pro-list-item">
                    <svg className="pro-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>{' '}
                    Predictive Modeling
                  </li>
                  <li className="pro-list-item">
                    <svg className="pro-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>{' '}
                    NLP & Chatbots
                  </li>
                  <li className="pro-list-item">
                    <svg className="pro-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>{' '}
                    Computer Vision
                  </li>
                </ul>
              </div>

              {/* Cloud & DevOps */}
              <div className="pro-card" style={{ ['--card-accent' as any]: '#f59e0b' }}>
                <div className="pro-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.5 19a3.5 3.5 0 0 0 0-7h-1.5a4.5 4.5 0 1 0-9 0h-1.5a3.5 3.5 0 0 0 0 7z" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>Cloud & DevOps</h3>
                <p style={{ color: '#64748b', lineHeight: 1.6, marginBottom: '32px', fontSize: '15px' }}>
                  Infrastructure setup and automated deployment pipelines to ensure your software is
                  always live and secure.
                </p>
                <ul className="pro-list">
                  <li className="pro-list-item">
                    <svg className="pro-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>{' '}
                    AWS / Azure Setup
                  </li>
                  <li className="pro-list-item">
                    <svg className="pro-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>{' '}
                    CI/CD Automation
                  </li>
                  <li className="pro-list-item">
                    <svg className="pro-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>{' '}
                    Docker Security
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE SSP & STUDENT SUCCESS FACTORS */}
        <section
          className="software-solutions-detail"
          id="training-placements"
          style={{ padding: 'clamp(80px, 8vw, 140px) 0', background: '#f8fafc', position: 'relative', zIndex: 2 }}
        >
          <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 58px)' }}>
            <div className="responsive-grid" style={{ marginBottom: 'clamp(60px, 6vw, 120px)' }}>
              <div data-fade="right">
                <div
                  style={{
                    backgroundColor: '#e0e7ff',
                    color: '#4f46e5',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '13px',
                    fontWeight: 700,
                    padding: '6px 16px',
                    borderRadius: '20px',
                    marginBottom: '24px',
                    letterSpacing: '0.05em',
                    display: 'inline-block',
                  }}
                >
                  CAREER EXCELLENCE
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: 'clamp(32px, 4vw, 56px)',
                    fontWeight: 800,
                    color: '#0a192f',
                    marginBottom: '24px',
                    lineHeight: 1.1,
                  }}
                >
                  Empowering Careers with <br />
                  <span style={{ color: '#4f46e5' }}>World-Class Training</span>
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '18px',
                    color: '#4a5568',
                    lineHeight: 1.6,
                    marginBottom: '32px',
                  }}
                >
                  We provide comprehensive training programs and guaranteed placement support to transform
                  students into industry-ready professionals. From <strong>hands-on coding</strong> to
                  mock interviews, we guide you every step of the way.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0a192f' }}>Practical Learning</h4>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>
                      Real-world projects and interactive labs to build experience.
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0a192f' }}>Placement Assistance</h4>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>
                      Dedicated support and corporate tie-ups to land your dream job.
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ position: 'relative' }} data-fade="left">
                <div
                  style={{
                    aspectRatio: '4/5',
                    borderRadius: '32px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Training and Placements"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                {/* Floating Stat Card */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '-40px',
                    background: 'white',
                    padding: '24px',
                    borderRadius: '20px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    border: '1px solid #f1f5f9',
                  }}
                >
                  <span style={{ fontSize: '32px', fontWeight: 800, color: '#4f46e5' }}>100%</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#64748b' }}>Placement Support</span>
                </div>
              </div>
            </div>

            {/* WHY CHOOSE SSP STI (CARDS) */}
            <div data-fade="up" style={{ marginTop: '80px', marginBottom: '80px' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '28px',
                  fontWeight: 800,
                  color: '#0a192f',
                  marginBottom: '40px',
                }}
              >
                Why Choose SSP STI?
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                <div className="premium-card">
                  <div className="premium-icon-box">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <h4 className="premium-card-title">Individual Mentorship</h4>
                  <p className="premium-card-desc">Personalized guidance and one-on-one support for every student.</p>
                </div>

                <div className="premium-card">
                  <div className="premium-icon-box">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </div>
                  <h4 className="premium-card-title">Standalone Mindset</h4>
                  <p className="premium-card-desc">Training students to think independently and solve real-world challenges confidently.</p>
                </div>

                <div className="premium-card">
                  <div className="premium-icon-box">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <h4 className="premium-card-title">Ethical Education</h4>
                  <p className="premium-card-desc">Combining technical excellence with discipline, values, and professional ethics.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACCORDION (CLIENT SUCCESS & STUDENT SUCCESS) */}
        <section className="management" id="management">
          <div className="management-container">
            <h2 className="section-title" data-fade="up">
              Client Success and Student Success
            </h2>
            <div className="management-content">
              <div className="management-image" data-fade="up">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Client and Student Success"
                />
              </div>
              <div className="management-accordion">
                {/* Accordion Item 1 */}
                <div className={`accordion-item ${activeAccordion === 0 ? 'active' : ''}`} data-fade="up">
                  <div className="accordion-header" onClick={() => setActiveAccordion(activeAccordion === 0 ? -1 : 0)}>
                    <span className="accordion-num">01</span>
                    <h4 className="accordion-title">Individual Tracking</h4>
                    <span className="accordion-toggle">{activeAccordion === 0 ? '-' : '+'}</span>
                  </div>
                  <div
                    className="accordion-body"
                    style={{
                      height: activeAccordion === 0 ? 'auto' : '0px',
                      transition: 'height 0.4s ease',
                      paddingLeft: '50px',
                      overflow: 'hidden',
                    }}
                  >
                    <div className="accordion-body-inner" style={{ paddingBottom: '32px' }}>
                      <p>
                        Personalized progress monitoring and mentor feedback to ensure students stay on track
                        and continuously improve.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Accordion Item 2 */}
                <div className={`accordion-item ${activeAccordion === 1 ? 'active' : ''}`} data-fade="up">
                  <div className="accordion-header" onClick={() => setActiveAccordion(activeAccordion === 1 ? -1 : 1)}>
                    <span className="accordion-num">02</span>
                    <h4 className="accordion-title">Business Transformation</h4>
                    <span className="accordion-toggle">{activeAccordion === 1 ? '-' : '+'}</span>
                  </div>
                  <div
                    className="accordion-body"
                    style={{
                      height: activeAccordion === 1 ? 'auto' : '0px',
                      transition: 'height 0.4s ease',
                      paddingLeft: '50px',
                      overflow: 'hidden',
                    }}
                  >
                    <div className="accordion-body-inner" style={{ paddingBottom: '32px' }}>
                      <p>
                        Driving digital evolution for our clients through custom-built software that
                        streamlines operations and fosters measurable growth.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Accordion Item 3 */}
                <div className={`accordion-item ${activeAccordion === 2 ? 'active' : ''}`} data-fade="up">
                  <div className="accordion-header" onClick={() => setActiveAccordion(activeAccordion === 2 ? -1 : 2)}>
                    <span className="accordion-num">03</span>
                    <h4 className="accordion-title">Standalone Mindset</h4>
                    <span className="accordion-toggle">{activeAccordion === 2 ? '-' : '+'}</span>
                  </div>
                  <div
                    className="accordion-body"
                    style={{
                      height: activeAccordion === 2 ? 'auto' : '0px',
                      transition: 'height 0.4s ease',
                      paddingLeft: '50px',
                      overflow: 'hidden',
                    }}
                  >
                    <div className="accordion-body-inner" style={{ paddingBottom: '32px' }}>
                      <p>
                        We build independent problem-solving skills that allow students to tackle complex
                        challenges and thrive in any professional environment.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Accordion Item 4 */}
                <div className={`accordion-item ${activeAccordion === 3 ? 'active' : ''}`} data-fade="up">
                  <div className="accordion-header" onClick={() => setActiveAccordion(activeAccordion === 3 ? -1 : 3)}>
                    <span className="accordion-num">04</span>
                    <h4 className="accordion-title">Scalable Solutions</h4>
                    <span className="accordion-toggle">{activeAccordion === 3 ? '-' : '+'}</span>
                  </div>
                  <div
                    className="accordion-body"
                    style={{
                      height: activeAccordion === 3 ? 'auto' : '0px',
                      transition: 'height 0.4s ease',
                      paddingLeft: '50px',
                      overflow: 'hidden',
                    }}
                  >
                    <div className="accordion-body-inner" style={{ paddingBottom: '32px' }}>
                      <p>
                        Engineering robust platforms for businesses designed to grow and handle increasing
                        complexity with ease.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Accordion Item 5 */}
                <div className={`accordion-item ${activeAccordion === 4 ? 'active' : ''}`} data-fade="up">
                  <div className="accordion-header" onClick={() => setActiveAccordion(activeAccordion === 4 ? -1 : 4)}>
                    <span className="accordion-num">05</span>
                    <h4 className="accordion-title">Lifetime Support</h4>
                    <span className="accordion-toggle">{activeAccordion === 4 ? '-' : '+'}</span>
                  </div>
                  <div
                    className="accordion-body"
                    style={{
                      height: activeAccordion === 4 ? 'auto' : '0px',
                      transition: 'height 0.4s ease',
                      paddingLeft: '50px',
                      overflow: 'hidden',
                    }}
                  >
                    <div className="accordion-body-inner" style={{ paddingBottom: '32px' }}>
                      <p>
                        Continuous guidance for both students and clients. Our relationship is a long-term
                        commitment to your ongoing success journey.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONNECT SECTION (LEAD GENERATION VIA WHATSAPP) */}
        <section
          className="contact"
          id="contact"
          style={{ padding: 'clamp(100px, 10vw, 160px) 0', background: '#ffffff', position: 'relative', zIndex: 2 }}
        >
          <div className="contact-container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '0 24px' }}>
            <div
              style={{
                background: '#f8fafc',
                padding: 'clamp(40px, 6vw, 80px)',
                borderRadius: '32px',
                border: '1px solid #f1f5f9',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)',
              }}
              data-fade="up"
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  background: '#25D366',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 32px',
                  boxShadow: '0 10px 20px rgba(37, 211, 102, 0.2)',
                }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <h2
                style={{
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  fontWeight: 800,
                  color: '#0f172a',
                  marginBottom: '20px',
                  letterSpacing: '-0.02em',
                }}
              >
                Connect with Us
              </h2>
              <p
                style={{
                  color: '#64748b',
                  fontSize: '18px',
                  lineHeight: 1.6,
                  marginBottom: '40px',
                  maxWidth: '500px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                Have questions about our trainings or services? Get in touch with our team directly on
                WhatsApp for instant support.
              </p>
              <a
                href="https://wa.me/919035011859?text=I%20want%20to%20know%20more%20about%20your%20services"
                target="_blank"
                className="btn"
                style={{
                  background: '#25D366',
                  color: 'white',
                  padding: '18px 48px',
                  borderRadius: '100px',
                  fontWeight: 700,
                  fontSize: '18px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 20px rgba(37, 211, 102, 0.2)',
                }}
              >
                Message on WhatsApp
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer" id="footer">
        <div className="footer-inner">
          <div className="footer-col footer-about">
            <a
              href="#"
              className="footer-logo"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '380px',
                height: '150px',
                overflow: 'hidden',
                marginBottom: '24px',
                marginLeft: '-30px',
              }}
            >
              <img
                src="/images/SSP.png"
                alt="SSP Global"
                style={{
                  height: '450px',
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)',
                }}
                onError={(e) => {
                  const target = e.currentTarget
                  target.outerHTML =
                    "<span class='footer-logo-text' style='font-weight:800; font-style:italic;'>SSP GLOBAL</span>"
                }}
              />
            </a>
            <p>
              SSP Global – A visionary Software Organization in Tirupati empowering individuals and
              businesses through specialized software training, placement assistance, AI solutions, DevOps
              services, and cutting-edge custom software development.
            </p>
          </div>
          <div className="footer-col footer-menu">
            <h5 className="footer-heading">Divisions</h5>
            <ul>
              <li>
                <a href="https://sti.ssptechedu.com/">Training</a>
              </li>
              <li>
                <a href="https://sti.ssptechedu.com/">Placements</a>
              </li>
              <li>
                <a href="https://ss.ssptechedu.com/">Software Solutions</a>
              </li>
              <li>
                <a href="#leadership">Leadership</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="footer-col footer-contacts">
            <h5 className="footer-heading">Contact</h5>
            <a href="tel:919035011859" className="footer-phone">
              +91-9035011859
            </a>
            <a href="mailto:persevcareers@gmail.com" className="footer-email">
              persevcareers@gmail.com
            </a>
            <p style={{ color: 'rgba(255,255,255,.7)', marginTop: '8px', fontSize: '15px' }}>
              Annamaiah Circle, Beside DMART,
              <br />
              AIR Bypass Road, Tirupati
            </p>
            <h5 className="footer-heading mt">Socials</h5>
            <div className="social-icons">
              <a
                href="https://www.instagram.com/ssperseverance_institute/"
                target="_blank"
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/p/Perseverance-Software-Institute-61550316355738/"
                target="_blank"
                aria-label="Facebook"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@persevcareers6577" target="_blank" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48" />
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">©2026 SSP Global. All rights reserved.</span>
            <span className="footer-credit">Designed for SSP Global</span>
          </div>
          <div className="footer-line"></div>
          <div className="footer-disclaimer">
            <p>
              SSP Global – Software Organization in Tirupati. Providing Training | Placements | Software
              Solutions | AI &amp; DevOps Services. Empowering careers and building world-class software.
              © 2026 SSP Global, Tirupati, Andhra Pradesh, India.
            </p>
          </div>
        </div>
      </footer>

    </>
  )
}
