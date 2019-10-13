import { Injectable } from '../ioc/injector';
import { OnRun } from '../lifecycle';
import EntityContainer from '../entity/entity-container';
import PlanetFactory from '../entity/planet-factory';

@Injectable()
export default class SceneProvider implements OnRun {
	constructor(private entityContainer: EntityContainer, private planetFactory: PlanetFactory) {}

	onRun() {
		for (let i = 0; i < 10; i++) {
			this.entityContainer.putEntity(this.planetFactory.generateRandomPlanet());
		}
	}
}
