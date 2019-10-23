import { Injectable } from './ioc/injector';
import GameLoopProvider from './providers/game-loop.provider';
import InputProvider from './providers/input.provider';
import CanvasProvider from './providers/canvas.provider';
import SceneProvider from './providers/scene.provider';
import EntityContainer from './entity/entity-container';
import EntityProvider from './entity/entity.provider';
import SpriteSystem from './systems/sprite.system';
import GravitySystem from './systems/gravity.system';
import PlanetFactory from './entity/planet-factory';
import ForceVisualizationSystem from './systems/force-visualization.system';
import GridSystem from './systems/grid.system';

@Injectable()
export default class CanvasApp {
	constructor(
		private gameLoopProvider: GameLoopProvider,
		private inpurProvider: InputProvider,
		private canvasProvider: CanvasProvider,
		private sceneProvider: SceneProvider,
		private entityContainer: EntityContainer,
		private entityBuilder: EntityProvider,
		private planetSystem: GravitySystem,
		private planetFactory: PlanetFactory,
		private gridSystem: GridSystem,
		private spriteSystem: SpriteSystem
	) {
		gameLoopProvider.run();
	}
}
