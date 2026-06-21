'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import styles from '../styles/CinematicLayer.module.css'

export default function CinematicLayer() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return
    const el = mountRef.current

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    // Particle system — warm bokeh feel
    const COUNT = 220
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const sizes = new Float32Array(COUNT)
    const offsets = new Float32Array(COUNT)
    const speeds = new Float32Array(COUNT)

    // Palette: warm orange glow + cool blue monitor + soft white
    const palette = [
      new THREE.Color('#E8722A'),
      new THREE.Color('#F0A060'),
      new THREE.Color('#FFDDB8'),
      new THREE.Color('#4A9EDB'),
      new THREE.Color('#C8E4F8'),
      new THREE.Color('#FFFFFF'),
    ]

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 16
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6

      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3]     = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b

      // Most particles small, some large bokeh blobs
      sizes[i] = Math.random() < 0.15 ? Math.random() * 80 + 40 : Math.random() * 18 + 4
      offsets[i] = Math.random() * Math.PI * 2
      speeds[i] = 0.15 + Math.random() * 0.25
    }

    // Soft circle texture
    const canvas2d = document.createElement('canvas')
    canvas2d.width = 64; canvas2d.height = 64
    const ctx = canvas2d.getContext('2d')!
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    grad.addColorStop(0, 'rgba(255,255,255,1)')
    grad.addColorStop(0.3, 'rgba(255,255,255,0.6)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 64, 64)
    const tex = new THREE.CanvasTexture(canvas2d)

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const mat = new THREE.PointsMaterial({
      size: 0.18,
      map: tex,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(geo, mat)
    scene.add(particles)

    // Mouse parallax
    let mx = 0, my = 0
    const onMouseMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2
      my = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    let animId: number
    const clock = new THREE.Clock()
    /* const timer = new THREE.Timer();
    timer.connect(document);
    timer.start(); */

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      const pos = geo.attributes.position.array as Float32Array
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3 + 1] += Math.sin(t * speeds[i] + offsets[i]) * 0.0015
        pos[i * 3]     += Math.cos(t * speeds[i] * 0.7 + offsets[i]) * 0.001
      }
      geo.attributes.position.needsUpdate = true

      // Gentle rotation
      particles.rotation.y = t * 0.012
      particles.rotation.x = t * 0.006

      // Smooth camera parallax
      camera.position.x += (mx * 0.4 - camera.position.x) * 0.04
      camera.position.y += (my * 0.25 - camera.position.y) * 0.04
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      if (!el) return
      camera.aspect = el.clientWidth / el.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(el.clientWidth, el.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      geo.dispose()
      mat.dispose()
      tex.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className={styles.canvas} />
}
