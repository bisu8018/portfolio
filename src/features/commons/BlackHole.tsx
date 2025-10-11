import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

interface BlackHoleProps {
  width?: number | string
  height?: number | string
  className?: string
}

export default function BlackHole({
  width = '100%',
  height = '100%',
  className = '',
}: BlackHoleProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const animationIdRef = useRef<number | null>(null)
  const [actualSize, setActualSize] = useState({ width: 400, height: 400 })

  // Calculate actual size from props
  useEffect(() => {
    const mountElement = mountRef.current
    if (!mountElement) return

    const calculateSize = () => {
      const parentElement = mountElement.parentElement
      if (!parentElement) return

      const parentRect = parentElement.getBoundingClientRect()

      let newWidth = 400
      let newHeight = 400

      if (typeof width === 'string' && width.includes('%')) {
        const percentage = parseFloat(width) / 100
        newWidth = parentRect.width * percentage
      } else if (typeof width === 'number') {
        newWidth = width
      }

      if (typeof height === 'string' && height.includes('%')) {
        const percentage = parseFloat(height) / 100
        newHeight = parentRect.height * percentage
      } else if (typeof height === 'number') {
        newHeight = height
      }

      setActualSize({ width: newWidth, height: newHeight })
    }

    // Initial calculation
    calculateSize()

    // Set up ResizeObserver to watch for parent size changes
    const resizeObserver = new ResizeObserver(calculateSize)
    resizeObserver.observe(mountElement.parentElement!)

    return () => {
      resizeObserver.disconnect()
    }
  }, [width, height])

  // Scene initialization (only once)
  useEffect(() => {
    const mountElement = mountRef.current
    if (!mountElement) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000) // Use default aspect ratio
    camera.position.set(3, 2, 5) // Better initial angle to see the black hole
    cameraRef.current = camera

    // Renderer setup - Enhanced quality
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(400, 400) // Use default size, will be updated dynamically
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // High DPI support
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    rendererRef.current = renderer

    mountElement.appendChild(renderer.domElement)

    // OrbitControls setup
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = true
    controls.enablePan = false
    controls.maxDistance = 10
    controls.minDistance = 2
    controls.maxPolarAngle = Math.PI * 0.8 // Limit vertical rotation
    controls.minPolarAngle = Math.PI * 0.2
    controls.target.set(0, 0, 0) // Focus on black hole center

    // Store geometries and materials for cleanup
    const geometries: THREE.BufferGeometry[] = []
    const materials: THREE.Material[] = []

    // Black hole center (event horizon) - Enhanced with glowing effect
    const blackHoleGeometry = new THREE.SphereGeometry(0.3, 64, 64) // Higher resolution
    const blackHoleMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.95,
    })
    geometries.push(blackHoleGeometry)
    materials.push(blackHoleMaterial)
    const blackHole = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial)
    scene.add(blackHole)

    // Add glowing halo around black hole
    const haloGeometry = new THREE.SphereGeometry(0.35, 64, 64)
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0x2a1a3a, // Deep purple-red glow
      transparent: true,
      opacity: 0.3,
      side: THREE.BackSide,
    })
    geometries.push(haloGeometry)
    materials.push(haloMaterial)
    const halo = new THREE.Mesh(haloGeometry, haloMaterial)
    scene.add(halo)

    // Add inner glow ring
    const innerGlowGeometry = new THREE.RingGeometry(0.3, 0.4, 64)
    const innerGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0x4a2a5a, // Purple glow
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    })
    geometries.push(innerGlowGeometry)
    materials.push(innerGlowMaterial)
    const innerGlow = new THREE.Mesh(innerGlowGeometry, innerGlowMaterial)
    innerGlow.rotation.x = Math.PI / 2
    scene.add(innerGlow)

    // Gravitational lensing effect - light particles bending around black hole
    const lightParticleCount = 600 // Increased for better effect
    const lightParticles = new THREE.BufferGeometry()
    const lightPositions = new Float32Array(lightParticleCount * 3)
    const lightColors = new Float32Array(lightParticleCount * 3)
    const lightSizes = new Float32Array(lightParticleCount)

    // Create light particles that will be bent by gravity
    for (let i = 0; i < lightParticleCount; i++) {
      const i3 = i * 3

      // Distribute particles in a stable ring around the black hole
      const radius = 2.0 + Math.random() * 1.0 // Stable distance from black hole
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      lightPositions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      lightPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      lightPositions[i3 + 2] = radius * Math.cos(phi)

      // Light colors - dark purple to blue gradient for better contrast
      const intensity = 0.4 + Math.random() * 0.2 // Darker for contrast
      const hue = 0.7 + Math.random() * 0.2 // Purple to blue range
      const color = new THREE.Color().setHSL(hue, 0.9, intensity)
      lightColors[i3] = color.r
      lightColors[i3 + 1] = color.g
      lightColors[i3 + 2] = color.b

      lightSizes[i] = 0.01 + Math.random() * 0.02
    }

    lightParticles.setAttribute('position', new THREE.BufferAttribute(lightPositions, 3))
    lightParticles.setAttribute('color', new THREE.BufferAttribute(lightColors, 3))
    lightParticles.setAttribute('size', new THREE.BufferAttribute(lightSizes, 1))

    const lightParticleMaterial = new THREE.PointsMaterial({
      size: 0.04, // Larger for better visibility
      vertexColors: true,
      transparent: true,
      opacity: 1.0, // Full opacity for better contrast
      blending: THREE.NormalBlending, // Change from additive to normal for better contrast
      sizeAttenuation: true,
    })
    geometries.push(lightParticles)
    materials.push(lightParticleMaterial)

    const lightParticleSystem = new THREE.Points(lightParticles, lightParticleMaterial)
    scene.add(lightParticleSystem)

    // Spiral orbital particle system - optimized and increased count
    const orbitalParticleCount = 800 // Further increased for better effect
    const orbitalParticles = new THREE.BufferGeometry()
    const orbitalPositions = new Float32Array(orbitalParticleCount * 3)
    const orbitalColors = new Float32Array(orbitalParticleCount * 3)

    for (let i = 0; i < orbitalParticleCount; i++) {
      const i3 = i * 3

      // Optimized spiral pattern around black hole
      const angle = (i / orbitalParticleCount) * Math.PI * 8 // More spirals for denser effect
      const radius = 0.6 + Math.random() * 2.0 // Closer to black hole, more concentrated
      const height = (Math.random() - 0.5) * 0.6 // Controlled vertical spread

      orbitalPositions[i3] = Math.cos(angle) * radius
      orbitalPositions[i3 + 1] = height
      orbitalPositions[i3 + 2] = Math.sin(angle) * radius

      // Dark purple-blue colors for better contrast on white background
      const hue = 0.7 + Math.random() * 0.2 // Purple to blue range
      const color = new THREE.Color().setHSL(hue, 0.95, 0.3) // Much darker for contrast
      orbitalColors[i3] = color.r
      orbitalColors[i3 + 1] = color.g
      orbitalColors[i3 + 2] = color.b
    }

    orbitalParticles.setAttribute('position', new THREE.BufferAttribute(orbitalPositions, 3))
    orbitalParticles.setAttribute('color', new THREE.BufferAttribute(orbitalColors, 3))

    const orbitalParticleMaterial = new THREE.PointsMaterial({
      size: 0.025, // Larger for better visibility
      vertexColors: true,
      transparent: true,
      opacity: 1.0, // Full opacity for better contrast
      blending: THREE.NormalBlending, // Change from additive to normal for better contrast
    })
    geometries.push(orbitalParticles)
    materials.push(orbitalParticleMaterial)

    const orbitalParticleSystem = new THREE.Points(orbitalParticles, orbitalParticleMaterial)
    scene.add(orbitalParticleSystem)

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      const time = Date.now() * 0.001

      // Rotate orbital particle system
      orbitalParticleSystem.rotation.y = time * 0.3

      // Simple orbital rotation - no gravitational lensing
      // Just rotate the entire particle system around the black hole
      lightParticleSystem.rotation.y = time * 0.1

      // Update controls
      controls.update()

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      // Cancel animation frame
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current)
        animationIdRef.current = null
      }

      // Dispose controls
      controls.dispose()

      // Dispose all geometries
      geometries.forEach((geometry) => {
        geometry.dispose()
      })

      // Dispose all materials
      materials.forEach((material) => {
        material.dispose()
      })

      // Clear scene
      while (scene.children.length > 0) {
        scene.remove(scene.children[0])
      }

      // Remove renderer DOM element
      if (mountElement && renderer.domElement && mountElement.contains(renderer.domElement)) {
        mountElement.removeChild(renderer.domElement)
      }

      // Dispose renderer
      renderer.dispose()
    }
  }, []) // Scene initialization only once

  // Dynamic size updates
  useEffect(() => {
    if (rendererRef.current && cameraRef.current) {
      // Update renderer size
      rendererRef.current.setSize(actualSize.width, actualSize.height)

      // Update camera aspect ratio
      cameraRef.current.aspect = actualSize.width / actualSize.height
      cameraRef.current.updateProjectionMatrix()
    }
  }, [actualSize])

  return <div ref={mountRef} className={`inline-block ${className}`} style={{ width, height }} />
}
