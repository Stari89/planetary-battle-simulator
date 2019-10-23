import { Injectable } from '../ioc/injector';
import { OnRender, OnRun } from '../lifecycle';
import EntityContainer from '../entity/entity-container';
import EntityProvider from '../entity/entity.provider';
import CanvasProvider from '../providers/canvas.provider';
import { ILoopInfo } from '../providers/game-loop.provider';
import StarfieldComponent from '../components/starfield.component';
import Vector2 from '../vector-2';

@Injectable()
export default class StarfieldSystem implements OnRun, OnRender {
	constructor(
		private entityContainer: EntityContainer,
		private entityProvider: EntityProvider,
		private canvasProvider: CanvasProvider
	) {}

	public onRun() {
		this.entityContainer.entities.forEach(entity => {
			if (this.entityProvider.hasComponent(entity, StarfieldComponent)) {
				const starfieldComponent = this.entityProvider.getComponent(entity, StarfieldComponent);

				const pixelCount = this.canvasProvider.ViewSize.x * this.canvasProvider.ViewSize.y;
				const starCount = Math.floor((pixelCount * starfieldComponent.ppm) / 1000000);

				for (let i = 0; i < starCount; i++) {
					starfieldComponent.stars.push(Vector2.getRandomVector(this.canvasProvider.ViewSize, false));
				}
			}
		});
	}

	public onRender(loopInfo: ILoopInfo) {
		const ctx = this.canvasProvider.Context;

		this.entityContainer.entities.forEach(entity => {
			if (this.entityProvider.hasComponent(entity, StarfieldComponent)) {
				const starfieldComponent = this.entityProvider.getComponent(entity, StarfieldComponent);
				starfieldComponent.stars.forEach(star => {
					ctx.beginPath();
					ctx.moveTo(star.x, star.y);
					ctx.lineTo(star.x + 1, star.y);
					ctx.strokeStyle = `#FFFFFF${starfieldComponent.luminosity}`;
					ctx.stroke();

					ctx.beginPath();
					ctx.moveTo(star.x - 1, star.y);
					ctx.lineTo(star.x, star.y);
					ctx.strokeStyle = `#FF00FF${starfieldComponent.luminosity}`;
					ctx.stroke();

					ctx.beginPath();
					ctx.moveTo(star.x + 1, star.y);
					ctx.lineTo(star.x + 2, star.y);
					ctx.strokeStyle = `#00FFFF${starfieldComponent.luminosity}`;
					ctx.stroke();

					ctx.beginPath();
					ctx.moveTo(star.x, star.y - 1);
					ctx.lineTo(star.x + 1, star.y - 1);
					ctx.strokeStyle = `#FF00FF${starfieldComponent.luminosity}`;
					ctx.stroke();

					ctx.beginPath();
					ctx.moveTo(star.x, star.y + 1);
					ctx.lineTo(star.x + 1, star.y + 1);
					ctx.strokeStyle = `#00FFFF${starfieldComponent.luminosity}`;
					ctx.stroke();
				});
			}
		});
	}
}
