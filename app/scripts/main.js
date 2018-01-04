// external imports
import * as THREE from 'three'
import TweenMax from 'gsap'

// custom component imports
import Renderer from './components/Renderer'
import VideoMesh from './components/VideoMesh'

let renderer
let scene, camera
let shapeContainer

let videos = [
  '../videos/abstract.mp4',
  '../videos/geometric.mp4',
  '../videos/spacial.mp4',
  '../videos/circular.mp4'
]

function init() {
  renderer = new Renderer(0x00CCFF)
  document.body.appendChild(renderer.rendererElement)

  scene = renderer.scene
  camera = renderer.camera

  shapeContainer = new THREE.Object3D()
  scene.add(shapeContainer)

  for(let i = 0; i < 6; i++) {
    let ranVideo = videos[Math.floor(Math.random() * videos.length)]
    if(i > 0) {
      let videoShape = new VideoMesh(ranVideo)
      var ranScale = 0.2 + Math.random() * 1
      var ranX1 = -50 + Math.random() * 100
      var ranY1 = -50 + Math.random() * 100
      var ranZ1 = -50 + Math.random() * 100

      var ranX2 = -50 + Math.random() * 100
      var ranY2 = -50 + Math.random() * 100
      var ranZ2 = -50 + Math.random() * 100

      videoShape.mesh.scale.set(ranScale, ranScale, ranScale)
      videoShape.mesh.position.set(ranX1, ranY1, ranZ1)

      TweenMax.to(videoShape.mesh.position, 5 + Math.random() * 5, {
          x: ranX2,
          y: ranY2,
          z: ranZ2,
          ease: Back.easeInOut,
          yoyoEase: Back.easeInOut,
          repeat: -1
        }
      )

      shapeContainer.add(videoShape.mesh)
    } else {
      let videoShape = new VideoMesh(ranVideo, THREE.BackSide)
      videoShape.mesh.scale.set(150, 150, 150)
      shapeContainer.add(videoShape.mesh)
    }
  }

  TweenMax.ticker.addEventListener('tick', loop)
}

function loop() {
  renderer.render()
  shapeContainer.rotation.x += 0.0021
  shapeContainer.rotation.y += 0.00191
  shapeContainer.rotation.z += 0.002
}

window.addEventListener('load', init)
