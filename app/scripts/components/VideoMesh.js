import * as THREE from 'three'

export default class VideoMesh {
  constructor(video, randomMovement, side = THREE.FrontSide) {
    this.geometry = new THREE.IcosahedronBufferGeometry(30, 1)

    this.videoElement = document.createElement('video')
    this.videoElement.src = video
    this.videoElement.setAttribute('autoplay', '')
    this.videoElement.setAttribute('loop', '')

    this.videoTexture = new THREE.VideoTexture(this.videoElement)
    this.videoTexture.minFilter = THREE.LinearFilter
    this.videoTexture.magFilter = THREE.LinearFilter
    this.videoTexture.format = THREE.RGBFormat

    this.material = new THREE.MeshBasicMaterial(
      {
        map: this.videoTexture,
        side: side
      }
    )

    this.mesh = new THREE.Mesh(this.geometry, this.material)

    if(randomMovement) {
      let ranScale = 0.2 + Math.random() * 1
      let ranX1 = -50 + Math.random() * 100
      let ranY1 = -50 + Math.random() * 100
      let ranZ1 = -50 + Math.random() * 100

      let ranX2 = -50 + Math.random() * 100
      let ranY2 = -50 + Math.random() * 100
      let ranZ2 = -50 + Math.random() * 100

      this.mesh.scale.set(ranScale, ranScale, ranScale)
      this.mesh.position.set(ranX1, ranY1, ranZ1)

      this.newMovement()

      this.ranIX = -0.005 + Math.random() * 0.01
      this.ranIY = -0.005 + Math.random() * 0.01
      this.ranIZ = -0.005 + Math.random() * 0.01
    } else {
      this.ranIX = 0.002
      this.ranIY = 0.002
      this.ranIZ = 0.002
    }

    TweenMax.ticker.addEventListener('tick', this.update.bind(this))
  }

  newMovement() {
    let ranTime = 5 + Math.random() * 5
    let ranScale = 0.2 + Math.random() * 1
    let ranX1 = -50 + Math.random() * 100
    let ranY1 = -50 + Math.random() * 100
    let ranZ1 = -50 + Math.random() * 100

    let ranX2 = -50 + Math.random() * 100
    let ranY2 = -50 + Math.random() * 100
    let ranZ2 = -50 + Math.random() * 100

    TweenMax.to(this.mesh.position, ranTime, {
        x: ranX2,
        y: ranY2,
        z: ranZ2,
        ease: Expo.easeInOut,
        onComplete: this.newMovement.bind(this)
      }
    )

    TweenMax.to(this.mesh.scale, ranTime, {
        x: ranScale,
        y: ranScale,
        z: ranScale,
        ease: Expo.easeInOut
      }
    )
  }

  update() {
    this.mesh.rotation.x += this.ranIX
    this.mesh.rotation.y += this.ranIY
    this.mesh.rotation.z += this.ranIZ
  }
}
