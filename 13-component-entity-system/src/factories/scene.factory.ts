import { Injectable } from '../ioc/injector';
import { IEntity } from '../entity/entity';
import PlanetFactory from './planet.factory';
import StarfieldFactory, { Luminosity } from './starfield.factory';
import EntityProvider from '../entity/entity.provider';
import GridComponent, { GridWeight } from '../components/grid.component';
import TransformComponent from '../components/transform.component';
import SpriteComponent from '../components/sprite.component';
import splashSrc from '../assets/splash.jpg';
import CanvasProvider from '../providers/canvas.provider';
import Vector2 from '../vector-2';
import CameraComponent from '../components/camera.component';

@Injectable()
export default class SceneFactory {
	constructor(
		private entityProvider: EntityProvider,
		private planetFactory: PlanetFactory,
		private starfieldFactory: StarfieldFactory,
		private canvasProvider: CanvasProvider
	) {}

	generateSimulationScene(): Array<IEntity> {
		const entities: Array<IEntity> = [];

		entities.push(this.generateCamera());

		entities.push(this.starfieldFactory.generateStarfield(10, Luminosity.Bright));
		entities.push(this.starfieldFactory.generateStarfield(100, Luminosity.Normal));
		entities.push(this.starfieldFactory.generateStarfield(1000, Luminosity.Dim));
		entities.push(this.generateGrid(100, GridWeight.strong));

		const solarSystem = this.planetFactory.generateSolarSystem();
		solarSystem.forEach(item => {
			entities.push(item);
		});
		return entities;
	}

	generateSplashScene(): Array<IEntity> {
		const entities: Array<IEntity> = [];
		entities.push(this.generateSplash());
		return entities;
	}

	private generateGrid(resolution: number, weight: GridWeight): IEntity {
		const grid = this.entityProvider.generateEntity([GridComponent]);
		const gridComponent = this.entityProvider.getComponent(grid, GridComponent);
		gridComponent.resolution = resolution;
		gridComponent.weight = weight;
		return grid;
	}

	private generateCamera(): IEntity {
		const cameraEntity = this.entityProvider.generateEntity([CameraComponent, TransformComponent]);

		const transform: TransformComponent = this.entityProvider.getComponent(cameraEntity, TransformComponent);
		transform.position = new Vector2(0, 0);
		transform.scale = new Vector2(1, 1);
		transform.rotation = 0;

		return cameraEntity;
	}

	private generateSplash(): IEntity {
		const splash = this.entityProvider.generateEntity([TransformComponent, SpriteComponent]);

		const transform: TransformComponent = this.entityProvider.getComponent(splash, TransformComponent);
		transform.position = new Vector2(this.canvasProvider.ViewSize.x / 2, this.canvasProvider.ViewSize.y / 2);
		transform.scale = new Vector2(
			this.canvasProvider.ViewSize.x / 3,
			(this.canvasProvider.ViewSize.x / 3 / 1200) * 859
		);
		transform.rotation = 0;

		const sprite = this.entityProvider.getComponent(splash, SpriteComponent);
		sprite.image = new Image();
		sprite.image.src = splashSrc;
		sprite.cutoutPosition = new Vector2(0, 0);
		sprite.cutoutSize = new Vector2(1200, 859);
		sprite.offset = new Vector2(600, 429);

		return splash;
	}
}
