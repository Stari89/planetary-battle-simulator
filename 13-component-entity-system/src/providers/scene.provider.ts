import { Injectable } from '../ioc/injector';
import { OnRun } from '../lifecycle';
import EntityContainer from '../entity/entity-container';
import PlanetFactory from '../entity/planet-factory';
import { IEntity } from '../entity/entity';
import EntityProvider from '../entity/entity.provider';
import GridComponent, { GridWeight } from '../components/grid.component';
import StarfieldComponent from '../components/starfield.component';
import TransformComponent from '../components/transform.component';
import SpriteComponent from '../components/sprite.component';
import StarfieldFactory, { Luminosity } from '../entity/starfield-factory';

@Injectable()
export default class SceneProvider implements OnRun {
	constructor(
		private entityContainer: EntityContainer,
		private entityProvider: EntityProvider,
		private planetFactory: PlanetFactory,
		private starfieldFactory: StarfieldFactory
	) {}

	onRun() {
		this.entityContainer.putEntity(this.starfieldFactory.generateStarfield(10, Luminosity.Bright));
		this.entityContainer.putEntity(this.starfieldFactory.generateStarfield(100, Luminosity.Normal));
		this.entityContainer.putEntity(this.starfieldFactory.generateStarfield(1000, Luminosity.Dim));

		this.entityContainer.putEntity(this.generateGrid(100, GridWeight.strong));

		const solarSystem = this.planetFactory.generateSolarSystem();
		solarSystem.forEach(item => {
			this.entityContainer.putEntity(item);
		});
	}

	generateGrid(resolution: number, weight: GridWeight): IEntity {
		const grid = this.entityProvider.generateEntity([GridComponent]);
		const gridComponent = this.entityProvider.getComponent(grid, GridComponent);
		gridComponent.resolution = resolution;
		gridComponent.weight = weight;
		return grid;
	}
}
