import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import {GUI} from "dat.gui";

export class App {
    daMercure = 1.003196807
    daVenus = 0.302521
    daMars = 0.025203044
    daTerre = 0.159235669
    daLune = 0.159235669
    oldTime = 0

    aMercure = 0
    aVenus = 0
    aMars = 0
    aTerre = 0
    aLune = 0

    private readonly _renderer: THREE.Renderer
    private readonly _scene: THREE.Scene
    private readonly _camera: THREE.PerspectiveCamera
    private readonly _mercure: THREE.Mesh
    private readonly _soleil: THREE.Mesh
    private readonly _lune: THREE.Mesh
    private readonly _mars: THREE.Mesh
    private readonly _terre: THREE.Mesh
    private readonly _venus: THREE.Mesh
    private readonly _orbitControls: OrbitControls
    private readonly _stats: Stats
    private readonly _gui: GUI

    private constructor(
        givenRenderer: THREE.Renderer,
        givenScene:THREE.Scene,
        givenCamera:THREE.PerspectiveCamera,
        givenSoleil: THREE.Mesh,
        givenMecure: THREE.Mesh,
        givenMars: THREE.Mesh,
        givenLune: THREE.Mesh,
        givenTerre: THREE.Mesh,
        givenVenus: THREE.Mesh,
        givenOrbitControls: OrbitControls,
        givenStats: Stats,
        givenGUI: GUI,
    ) {
        this._renderer = givenRenderer
        this._scene = givenScene
        this._camera = givenCamera
        this._soleil = givenSoleil
        this._mars = givenMars
        this._mercure = givenMecure
        this._terre = givenTerre
        this._venus = givenVenus
        this._lune = givenLune
        this._orbitControls = givenOrbitControls
        this._stats = givenStats
        this._gui = givenGUI
        this._scene.add(this._mars)
        this._scene.add(this._venus)
        this._scene.add(this._soleil)
        this._scene.add(this._terre)
        this._scene.add(this._mercure)

    }

    static create(): App {
        const [w, h] = [window.innerWidth, Math.max(window.innerHeight, 1)]
        const ratio = w / h

        const renderer = new THREE.WebGLRenderer()
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
            80,
            ratio,
            0.1,
            1000
        )

        const soleil = new THREE.Mesh(
            new THREE.SphereGeometry(),
            new THREE.MeshBasicMaterial({
                wireframe: true,
                color : 0xFFFFF
            })
        )
        const mercure = new THREE.Mesh(
            new THREE.SphereGeometry(),
            new THREE.MeshBasicMaterial({
                wireframe: true,
                color : 0xFFFFF
            })
        )
        mercure.position.x = 3.8
        mercure.scale.x = 0.5*0.382
        mercure.scale.y = 0.5*0.382
        mercure.scale.z = 0.5*0.382

        const venus = new THREE.Mesh(
            new THREE.SphereGeometry(),
            new THREE.MeshBasicMaterial({
                wireframe: true,
                color : 0xFFFFF
            })
        )

        venus.position.x = 7.2
        venus.scale.x = 0.5*0.948
        venus.scale.y = 0.5*0.948
        venus.scale.z = 0.5*0.948

        const terre = new THREE.Mesh(
            new THREE.SphereGeometry(),
            new THREE.MeshBasicMaterial({
                wireframe: true,
                color : 0xFFFFF
            })
        )
        terre.position.x = 10
        terre.scale.x = 0.5
        terre.scale.y = 0.5
        terre.scale.z = 0.5

        const mars = new THREE.Mesh(
            new THREE.SphereGeometry(),
            new THREE.MeshBasicMaterial({
                wireframe: true,
                color : 0xFFFFF
            })
        )
        mars.position.x = 15.2
        mars.scale.x = 0.5*0.532
        mars.scale.y = 0.5*0.532
        mars.scale.z = 0.5*0.532

        const lune = new THREE.Mesh(
            new THREE.SphereGeometry(),
            new THREE.MeshBasicMaterial({
                wireframe: true,
                color : 0xFFFFFF
            })
        )

        lune.position.x = 10.5
        lune.scale.x = 0.5*0.34
        lune.scale.y = 0.5*0.34
        lune.scale.z = 0.5*0.34

        const orbitControls = new OrbitControls(camera, renderer.domElement)
        const stats = Stats()
        const gui = new GUI()
        const rotationFolder = gui.addFolder("Cube rotation")
        camera.position.z = 2
        renderer.setSize(w,h)
        document.body.appendChild(renderer.domElement)
        document.body.appendChild(stats.dom)
        const res : App = new App(renderer, scene, camera, soleil, mars, mercure, terre, venus, lune, orbitControls, stats, gui)
        window.addEventListener("resize", res._onWindowResize.bind(res), false)
        return res
    }

    private _processFrame(t: number) {
        requestAnimationFrame(this._processFrame.bind(this))
        const dt = t - this.oldTime
        this.aMercure += this.daMercure
        this.aVenus += this.daVenus
        this.aTerre += this.daTerre
        this.aLune += this.daLune
        this.aMars += this.daMars
        this._mercure.position.x = Math.cos(this.aMercure)* 3.8
        this._mercure.position.z = Math.sin(this.aMercure)* 3.8
        this._venus.position.x = Math.cos(this.aVenus)* 7.2
        this._venus.position.z = Math.sin(this.aVenus)* 7.2
        this._render()
        this._stats.update()
    }

    run() {
        this._processFrame(0)
    }

    private _render(){
        this._renderer.render(this._scene, this._camera)
    }

    private _onWindowResize(){
        const [w, h] = [window.innerWidth, Math.max(window.innerHeight, 1)]
        const ratio = w / h
        this._camera.aspect = ratio
        this._camera.updateProjectionMatrix()
        this._renderer.setSize(w, h)
        //this._render()
    }
}