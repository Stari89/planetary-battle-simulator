import { Injectable } from '../ioc/injector';
import { OnRun } from '../lifecycle';
import EntityContainer from '../entity/entity-container';
import PlanetFactory from '../entity/planet-factory';
import { IEntity } from '../entity/entity';
import EntityProvider from '../entity/entity.provider';
import GridComponent, { GridWeight } from '../components/grid.component';
import StarfieldComponent from '../components/starfield.component';

@Injectable()
export default class SceneProvider implements OnRun {
	constructor(
		private entityContainer: EntityContainer,
		private entityProvider: EntityProvider,
		private planetFactory: PlanetFactory
	) {}

	onRun() {
		const solarSystem = this.planetFactory.generateSolarSystem();
		solarSystem.forEach(item => {
			this.entityContainer.putEntity(item);
		});
		this.entityContainer.putEntity(this.generateGrid(100, GridWeight.strong));
		this.entityContainer.putEntity(this.generateStarfield(10, 'FF'));
		this.entityContainer.putEntity(this.generateStarfield(100, '66'));
		this.entityContainer.putEntity(this.generateStarfield(1000, '22'));
	}

	generateGrid(resolution: number, weight: GridWeight): IEntity {
		const grid = this.entityProvider.generateEntity([GridComponent]);
		const gridComponent = this.entityProvider.getComponent(grid, GridComponent);
		gridComponent.resolution = resolution;
		gridComponent.weight = weight;
		return grid;
	}

	generateStarfield(ppm: number, luminosity: string): IEntity {
		const starfield = this.entityProvider.generateEntity([StarfieldComponent]);
		const starfieldComponent = this.entityProvider.getComponent(starfield, StarfieldComponent);
		starfieldComponent.ppm = ppm;
		starfieldComponent.luminosity = luminosity;
		starfieldComponent.stars = [];
		return starfield;
	}
}
