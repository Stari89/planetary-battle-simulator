import { Injectable } from '../ioc/injector';
import { OnRun } from '../lifecycle';
import EntityContainer from '../entity/entity-container';
import PlanetFactory from '../entity/planet-factory';
import { IEntity } from '../entity/entity';
import EntityProvider from '../entity/entity.provider';
import GridComponent, { GridWeight } from '../components/grid.component';

@Injectable()
export default class SceneProvider implements OnRun {
	constructor(
		private entityContainer: EntityContainer,
		private entityProvider: EntityProvider,
		private planetFactory: PlanetFactory
	) {}

	onRun() {
		// for (let i = 0; i < 50; i++) {
		// 	this.entityContainer.putEntity(this.planetFactory.generateRandomPlanet());
		// }
		// const solarSystem = this.planetFactory.generatePlanetMoonSystem();
		const solarSystem = this.planetFactory.generateSolarSystem();
		solarSystem.forEach(item => {
			this.entityContainer.putEntity(item);
		});
		this.entityContainer.putEntity(this.generateGrid(100, GridWeight.strong));
		//this.entityContainer.putEntity(this.generateGrid(20, GridWeight.strong));
	}

	generateGrid(resolution: number, weight: GridWeight): IEntity {
		const grid = this.entityProvider.generateEntity([GridComponent]);
		const gridComponent = this.entityProvider.getComponent(grid, GridComponent);
		gridComponent.resolution = resolution;
		gridComponent.weight = weight;
		return grid;
	}
}
