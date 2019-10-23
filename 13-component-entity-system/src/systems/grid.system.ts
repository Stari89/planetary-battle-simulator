import { Injectable } from '../ioc/injector';
import { ILoopInfo } from '../providers/game-loop.provider';
import EntityContainer from '../entity/entity-container';
import EntityProvider from '../entity/entity.provider';
import CanvasProvider from '../providers/canvas.provider';
import { OnRender } from '../lifecycle';
import GridComponent from '../components/grid.component';

@Injectable()
export default class GridSystem implements OnRender {
	constructor(
		private entityContainer: EntityContainer,
		private entityProvider: EntityProvider,
		private canvasProvider: CanvasProvider
	) {}

	public onRender(loopInfo: ILoopInfo) {
		this.entityContainer.entities.forEach(entity => {
			if (this.entityProvider.hasComponent(entity, GridComponent)) {
				const gridComponent = this.entityProvider.getComponent(entity, GridComponent);

				const ctx = this.canvasProvider.Context;
				const view = this.canvasProvider.ViewSize;

				let x = (view.x % (gridComponent.resolution * 2)) / 2;
				while (x < view.x) {
					ctx.beginPath();
					ctx.moveTo(x - 1, 0);
					ctx.lineTo(x - 1, view.y);
					ctx.strokeStyle = '#FF00FF20';
					ctx.stroke();

					ctx.beginPath();
					ctx.moveTo(x + 1, 0);
					ctx.lineTo(x + 1, view.y);
					ctx.strokeStyle = '#00FFFF20';
					ctx.stroke();

					ctx.beginPath();
					ctx.moveTo(x, 0);
					ctx.lineTo(x, view.y);
					ctx.strokeStyle = gridComponent.weight;
					ctx.stroke();

					x += gridComponent.resolution;
				}

				let y = (view.y % (gridComponent.resolution * 2)) / 2;
				while (y < view.y) {
					ctx.beginPath();
					ctx.moveTo(0, y - 1);
					ctx.lineTo(view.x, y - 1);
					ctx.strokeStyle = '#FF00FF20';
					ctx.stroke();

					ctx.beginPath();
					ctx.moveTo(0, y + 1);
					ctx.lineTo(view.x, y + 1);
					ctx.strokeStyle = '#00FFFF20';
					ctx.stroke();

					ctx.beginPath();
					ctx.moveTo(0, y);
					ctx.lineTo(view.x, y);
					ctx.strokeStyle = gridComponent.weight;
					ctx.stroke();

					y += gridComponent.resolution;
				}
			}
		});
	}
}
