import { Injectable } from './ioc/injector';
import GameLoopProvider from './providers/game-loop.provider';
import InputProvider from './providers/input.provider';
import CanvasProvider from './providers/canvas.provider';
import SceneProvider from './providers/scene.provider';
import EntityContainer from './entity/entity-container';
import EntityProvider from './entity/entity.provider';
import SpriteSystem from './systems/sprite.system';
import GravitySystem from './systems/gravity.system';
import PlanetFactory from './factories/planet.factory';
import ForceVisualizationSystem from './systems/force-visualization.system';
import GridSystem from './systems/grid.system';
import StarfieldFactory from './factories/starfield.factory';
import SceneFactory from './factories/scene.factory';
import CameraSystem from './systems/camera.system';

@Injectable()
export default class CanvasApp {
	constructor(
		private gameLoopProvider: GameLoopProvider,
		private inpurProvider: InputProvider,
		private canvasProvider: CanvasProvider,
		private entityContainer: EntityContainer,
		private entityBuilder: EntityProvider,
		private sceneFactory: SceneFactory,
		private sceneProvider: SceneProvider,
		private planetFactory: PlanetFactory,
		private starfieldFactory: StarfieldFactory,
		private gridSystem: GridSystem,
		private planetSystem: GravitySystem,
		private spriteSystem: SpriteSystem,
		private cameraSystem: CameraSystem
	) {
		gameLoopProvider.run();
	}
}
