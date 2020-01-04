import { Injectable } from './ioc/injector';
import GameLoopProvider from './providers/game-loop.provider';
import InputProvider from './providers/input.provider';
import CanvasProvider from './providers/canvas.provider';
import SceneProvider from './providers/scene.provider';
import EntityContainer from './entity/entity-container';
import SpriteSystem from './systems/sprite.system';
import GravitySystem from './systems/gravity.system';
import PlanetFactory from './factories/planet.factory';
import GridSystem from './systems/grid.system';
import StarfieldFactory from './factories/starfield.factory';
import SceneFactory from './factories/scene.factory';
import CameraSystem from './systems/camera.system';
import StarfieldSystem from './systems/starfield.system';
import PolygonSystem from './systems/polygon.system';
import TrailSystem from './systems/trail.system';
import GridFactory from './factories/grid.factory';
import ColorFactory from './factories/color.factory';

@Injectable()
export default class CanvasApp {
    constructor(
        private gameLoopProvider: GameLoopProvider,
        private inpurProvider: InputProvider,
        private canvasProvider: CanvasProvider,
        private entityContainer: EntityContainer,
        private sceneProvider: SceneProvider,
        private colorFactory: ColorFactory,
        private sceneFactory: SceneFactory,
        private planetFactory: PlanetFactory,
        private starfieldFactory: StarfieldFactory,
        private gridFactory: GridFactory,
        private starfieldSystem: StarfieldSystem,
        private gridSystem: GridSystem,
        private planetSystem: GravitySystem,
        private spriteSystem: SpriteSystem,
        private trailSystem: TrailSystem,
        private polygonSystem: PolygonSystem,
        private cameraSystem: CameraSystem
    ) {
        gameLoopProvider.run();
    }
}
