// external imports
import * as THREE from 'three'
import TweenMax from 'gsap'

// custom component imports
import Renderer from './components/Renderer'
import VideoMesh from './components/VideoMesh'

let renderer
let scene, camera
let shapeContainer
let videoNum = 0

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
    let iterateVideo = videos[videoNum]

    if(i > 0) {
      let videoShape = new VideoMesh(iterateVideo, true)
      shapeContainer.add(videoShape.mesh)
      videoNum++
      if(videoNum >= videos.length) {
        videoNum = 0
      }
    } else {
      let videoShape = new VideoMesh(ranVideo, false, THREE.BackSide)
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
