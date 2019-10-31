import { Injectable } from '../ioc/injector';
import EntityProvider from '../providers/entity.provider';
import CanvasProvider from '../providers/canvas.provider';
import { IEntity } from '../entity/entity';
import StarfieldComponent, { Luminosity } from '../components/starfield.component';
import TransformComponent from '../components/transform.component';
import Vector2 from '../vector-2';

@Injectable()
export default class StarfieldFactory {
	constructor(private entityProvider: EntityProvider, private canvasProvider: CanvasProvider) {}

	generateStarfield(ppm: number, luminosity: Luminosity): IEntity {
		const entity = this.entityProvider.generateEntity(StarfieldComponent, TransformComponent);

		const starfield = this.entityProvider.getComponent(entity, StarfieldComponent);
		starfield.image = new Image();
		starfield.image.src = this.generateImage(ppm, luminosity);
		starfield.cutoutPosition = new Vector2(0, 0);
		starfield.cutoutSize = new Vector2(this.canvasProvider.ViewSize.x, this.canvasProvider.ViewSize.y);
		starfield.offset = new Vector2(0, 0);
		starfield.luminosity = luminosity;

		const transform = this.entityProvider.getComponent(entity, TransformComponent);
		transform.position = new Vector2(0, 0);
		transform.scale = new Vector2(this.canvasProvider.ViewSize.x, this.canvasProvider.ViewSize.y);
		transform.rotation = 0;

		return entity;
	}

	private generateImage(ppm: number, luminosity: Luminosity): string {
		const view = this.canvasProvider.ViewSize;
		const scale = this.canvasProvider.Scale;

		const canvas = document.createElement('canvas');
		canvas.width = view.x;
		canvas.height = view.y;
		canvas.style.backgroundColor = '#00000000';
		const ctx = canvas.getContext('2d');

		const pixelCount = view.x * view.y;
		const starCount = Math.floor((pixelCount * ppm) / 1000000);

		ctx.clearRect(0, 0, view.x, view.y);
		for (let i = 0; i < starCount; i++) {
			const star: Vector2 = Vector2.getRandomVector(this.canvasProvider.ViewSize, false);

			ctx.beginPath();
			ctx.moveTo(star.x, star.y);
			ctx.lineTo(star.x + 1, star.y);
			ctx.strokeStyle = `#FFFFFF${luminosity}`;
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo(star.x - 1, star.y);
			ctx.lineTo(star.x, star.y);
			ctx.strokeStyle = `#FF00FF${luminosity}`;
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo(star.x + 1, star.y);
			ctx.lineTo(star.x + 2, star.y);
			ctx.strokeStyle = `#00FFFF${luminosity}`;
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo(star.x, star.y - 1);
			ctx.lineTo(star.x + 1, star.y - 1);
			ctx.strokeStyle = `#FF00FF${luminosity}`;
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo(star.x, star.y + 1);
			ctx.lineTo(star.x + 1, star.y + 1);
			ctx.strokeStyle = `#00FFFF${luminosity}`;
			ctx.stroke();
		}
		return canvas.toDataURL('image/png');
	}
}
