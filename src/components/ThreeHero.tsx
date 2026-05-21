'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ThreeHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [skeletonLoaded, setSkeletonLoaded] = useState(false)

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const container = containerRef.current

    // 1. Setup Three.js Scene, Orthographic Camera, and Renderer
    const scene = new THREE.Scene()
    // Orthographic Camera is ideal for 2D full-screen texture mapping
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    // 2. Create a Fullscreen Plane mesh
    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.MeshBasicMaterial({
      transparent: true,
      toneMapped: false,
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // 3. Image and Texture states
    const frameCount = 241
    const textures: (THREE.Texture | null)[] = new Array(frameCount).fill(null)
    const textureLoader = new THREE.TextureLoader()

    const currentFramePath = (index: number) =>
      `/Frame/frame_${String(index).padStart(3, '0')}_delay-0.041s.png`

    const seq = { frame: 0 }
    let lastDrawnFrame = -1

    // 4. Handle aspect ratio scaling (cover effect)
    function updatePlaneScale(texture: THREE.Texture) {
      if (!texture.image) return

      const img = texture.image as HTMLImageElement
      const canvasWidth = window.innerWidth
      const canvasHeight = window.innerHeight
      const canvasRatio = canvasWidth / canvasHeight

      const imgWidth = img.width
      const imgHeight = img.height
      const imgRatio = imgWidth / imgHeight

      let scaleX = 1
      let scaleY = 1

      if (imgRatio > canvasRatio) {
        // Image is wider than canvas
        scaleX = imgRatio / canvasRatio
      } else {
        // Image is taller than canvas
        scaleY = canvasRatio / imgRatio
      }

      mesh.scale.set(scaleX, scaleY, 1)
    }

    // 5. Render loop
    function render() {
      const targetIndex = Math.round(seq.frame)
      let frameToDraw = targetIndex

      // Fallback: If target frame isn't loaded, find the closest loaded frame
      if (!textures[targetIndex]) {
        let found = -1;
        for (let i = 1; i < frameCount; i++) {
          const down = targetIndex - i
          const up = targetIndex + i
          if (down >= 0 && textures[down]) {
            found = down
            break
          }
          if (up < frameCount && textures[up]) {
            found = up
            break
          }
        }
        if (found !== -1) {
          frameToDraw = found
        } else {
          return // Nothing is ready to draw yet
        }
      }

      if (frameToDraw === lastDrawnFrame) return

      const activeTexture = textures[frameToDraw]
      if (activeTexture) {
        material.map = activeTexture
        material.needsUpdate = true
        updatePlaneScale(activeTexture)
        renderer.render(scene, camera)
        lastDrawnFrame = frameToDraw
      }
    }

    // Handle window resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      lastDrawnFrame = -1
      render()
    }
    window.addEventListener('resize', handleResize)

    // 6. Progressive Image & Texture Loading Schedule
    function getIndices(interval: number, offset: number) {
      const arr = []
      for (let i = offset; i < frameCount; i += interval) {
        arr.push(i)
      }
      return arr
    }

    const steps = [
      { indices: getIndices(16, 0), delay: 0 },     // skeleton (16 frames)
      { indices: getIndices(16, 8), delay: 400 },   // gaps (15 frames)
      { indices: getIndices(8, 4), delay: 1000 },   // mid details (30 frames)
      { indices: getIndices(4, 2), delay: 2000 },   // 30fps (60 frames)
      { indices: getIndices(2, 1), delay: 3500 }    // full 60fps (120 frames)
    ]

    let loadedCount = 0
    const totalToLoad = frameCount

    steps.forEach((step, stepIdx) => {
      setTimeout(() => {
        step.indices.forEach((index) => {
          textureLoader.load(
            currentFramePath(index),
            (texture) => {
              // Configure texture for sharp layout and optimal GPU caching
              texture.minFilter = THREE.LinearFilter
              texture.magFilter = THREE.LinearFilter
              texture.generateMipmaps = false

              // Crucial: Upload texture to GPU memory immediately to prevent scroll stutter
              renderer.initTexture(texture)

              textures[index] = texture
              loadedCount++

              // Progress percentage
              const progress = Math.round((loadedCount / totalToLoad) * 100)
              setLoadingProgress(progress)

              if (stepIdx === 0 && step.indices.every(idx => textures[idx] !== null)) {
                setSkeletonLoaded(true)
              }

              // Trigger render on first load or if scrolling on this exact frame
              if (loadedCount === 1 || Math.round(seq.frame) === index) {
                render()
              }
            },
            undefined,
            (err) => console.error(`Error loading texture ${index}:`, err)
          )
        })
      }, step.delay)
    })

    // 7. Connect scroll position to sequence frame via GSAP
    const heroScroll = gsap.to(seq, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: render,
      },
    })

    // 8. Replicate original phase text animations
    // Phase 1 Text Entrance & Exit
    const phase1Text = container.querySelector('.phase-1 .hero-giant-title')
    if (phase1Text) {
      const text = phase1Text.textContent || ''
      phase1Text.innerHTML = ''
      Array.from(text).forEach((char) => {
        const span = document.createElement('span')
        span.textContent = char
        span.style.display = 'inline-block'
        phase1Text.appendChild(span)
      })

      gsap.fromTo(
        phase1Text.querySelectorAll('span'),
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          stagger: 0.08,
          ease: 'expo.out',
        }
      )

      gsap.to(phase1Text, {
        y: '-120vh',
        opacity: 0.2,
        scrollTrigger: {
          trigger: container.querySelector('.phase-1'),
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    // Phase 2 Text Entrance & Exit
    const phase2Content = container.querySelector('.phase-2 .hero-content')
    if (phase2Content) {
      gsap.fromTo(
        phase2Content,
        { opacity: 0, y: '50vh' },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: container.querySelector('.phase-2'),
            start: 'top 90%',
            end: 'center center',
            scrub: true,
          },
        }
      )

      gsap.to(phase2Content, {
        opacity: 0,
        y: '-50vh',
        scrollTrigger: {
          trigger: container.querySelector('.phase-2'),
          start: 'center top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    // Phase 3 Text Entrance
    const phase3Title = container.querySelector('.phase-3 .hero-page3-title')
    if (phase3Title) {
      gsap.fromTo(
        phase3Title,
        { opacity: 0, y: '50vh' },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: container.querySelector('.phase-3'),
            start: 'top 90%',
            end: 'center center',
            scrub: true,
          },
        }
      )
    }

    // Set pointer-events active class on entering phases
    ;['.phase-1', '.phase-2', '.phase-3'].forEach((selector) => {
      const el = container.querySelector(selector)
      if (el) {
        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => el.classList.add('active'),
          onLeave: () => el.classList.remove('active'),
          onEnterBack: () => el.classList.add('active'),
          onLeaveBack: () => el.classList.remove('active'),
        })
      }
    })

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize)
      heroScroll.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      geometry.dispose()
      material.dispose()
      textures.forEach((tex) => tex?.dispose())
      renderer.dispose()
    }
  }, [])

  return (
    <section className="hero" id="hero" ref={containerRef}>
      {/* Canvas for Three.js WebGL frames */}
      <canvas id="hero-canvas" ref={canvasRef} />

      {/* Loading Overlay */}
      {!skeletonLoaded && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: '#080808',
            zIndex: 9,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#ffffff',
            fontFamily: 'var(--font-inter)',
          }}
        >
          <div
            style={{
              fontSize: '24px',
              fontWeight: 800,
              letterSpacing: '0.1em',
              marginBottom: '16px',
              color: 'var(--orange)',
            }}
          >
            SSP GLOBAL
          </div>
          <div
            style={{
              width: '200px',
              height: '2px',
              background: 'rgba(255,255,255,0.1)',
              position: 'relative',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${loadingProgress}%`,
                height: '100%',
                background: 'var(--orange)',
                transition: 'width 0.1s ease',
              }}
            />
          </div>
          <div
            style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.4)',
              marginTop: '8px',
            }}
          >
            Hardware Accelerated Graphics Preloading ({loadingProgress}%)
          </div>
        </div>
      )}

      {/* Replicate Content Wrapper */}
      <div className="hero-content-wrapper">
        <div className="hero-phase phase-1">
          <h1
            className="hero-giant-title"
            id="hero-ssp-title"
            aria-label="SSP Global – Software Organization in Tirupati"
          >
            SSP
          </h1>
        </div>

        <div className="hero-phase phase-2">
          <div className="hero-content">
            <h2 className="hero-title">
              <span className="line">Empowering the future</span>
              <span className="line">through technology,</span>
              <span className="line">education & innovation.</span>
            </h2>
            <div className="hero-cta-top" style={{ marginTop: '30px' }}>
              <a href="#leadership" className="btn btn-border">
                Explore SSP Global
              </a>
            </div>
          </div>
        </div>

        <div className="hero-phase phase-3">
          <h2 className="hero-page3-title">
            <span className="line">A software</span>
            <span className="line">Organization</span>
            <span className="line">in Tirupati</span>
          </h2>
        </div>
      </div>
    </section>
  )
}
