import { Injectable } from '../ioc/injector';
import { IEntity } from './entity';
import EntityProvider from './entity.provider';
import SpriteComponent from '../components/sprite.component';
import TransformComponent from '../components/transform.component';
import Vector2 from '../vector-2';
import GravityAffectedComponent from '../components/gravity-affected.component';

import planet01 from '../assets/planet01.png';
import planet02 from '../assets/planet02.png';
import planet03 from '../assets/planet03.png';
import planet04 from '../assets/planet04.png';
import planet05 from '../assets/planet05.png';
import planet06 from '../assets/planet06.png';
import planet07 from '../assets/planet07.png';
import planet08 from '../assets/planet08.png';
import planet09 from '../assets/planet09.png';
import planet10 from '../assets/planet10.png';
import planet11 from '../assets/planet11.png';
import planet12 from '../assets/planet12.png';
import planet13 from '../assets/planet13.png';
import planet14 from '../assets/planet14.png';
import planet15 from '../assets/planet15.png';
import planet16 from '../assets/planet16.png';
import planet17 from '../assets/planet17.png';
import planet18 from '../assets/planet18.png';

@Injectable()
export default class PlanetFactory {
	constructor(private entityProvider: EntityProvider) {}

	generateRandomPlanet(): IEntity {
		const planet = this.entityProvider.generateEntity([
			SpriteComponent,
			TransformComponent,
			GravityAffectedComponent
		]);

		const sprite = this.entityProvider.getComponent(planet, SpriteComponent);
		sprite.image = this.getRandomImage();
		sprite.cutoutPosition = new Vector2(0, 0);
		sprite.cutoutSize = new Vector2(300, 300);

		let transform: TransformComponent = this.entityProvider.getComponent(planet, TransformComponent);
		transform.position = new Vector2(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1080)); // todo
		const diameter = 10 + Math.floor(Math.random() * 40);
		transform.scale = new Vector2(diameter, diameter);
		transform.rotation = 0;

		let gravityAssisted: GravityAffectedComponent = this.entityProvider.getComponent(
			planet,
			GravityAffectedComponent
		);
		gravityAssisted.mass = 200;
		gravityAssisted.position = transform.position;
		gravityAssisted.preUpdatedPosition = transform.position;
		gravityAssisted.speed = Vector2.getRandomVector(new Vector2(50, 50), true);

		return planet;
	}

	private getRandomImage(): HTMLImageElement {
		const image = new Image();
		switch (Math.floor(Math.random() * 18 + 1)) {
			case 1:
				image.src = planet01;
				break;
			case 2:
				image.src = planet02;
				break;
			case 3:
				image.src = planet03;
				break;
			case 4:
				image.src = planet04;
				break;
			case 5:
				image.src = planet05;
				break;
			case 6:
				image.src = planet06;
				break;
			case 7:
				image.src = planet07;
				break;
			case 8:
				image.src = planet08;
				break;
			case 9:
				image.src = planet09;
				break;
			case 10:
				image.src = planet10;
				break;
			case 11:
				image.src = planet11;
				break;
			case 12:
				image.src = planet12;
				break;
			case 13:
				image.src = planet13;
				break;
			case 14:
				image.src = planet14;
				break;
			case 15:
				image.src = planet15;
				break;
			case 16:
				image.src = planet16;
				break;
			case 17:
				image.src = planet17;
				break;
			default:
				image.src = planet18;
				break;
		}
		return image;
	}
}
