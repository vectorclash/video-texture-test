import * as THREE from 'three'

export default class VideoMesh {
  constructor(video, side = THREE.FrontSide) {
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

    TweenMax.ticker.addEventListener('tick', this.update.bind(this))
  }

  update() {
    this.mesh.rotation.x += 0.002
    this.mesh.rotation.y += 0.002
    this.mesh.rotation.z += 0.002
  }
}
