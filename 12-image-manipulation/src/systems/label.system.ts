import { Injectable } from '../ioc/injector';
import { OnRender } from '../lifecycle';
import { ILoopInfo } from '../managers/game-loop.manager';
import GameObjectsManager from '../managers/game-objects.manager';
import CanvasManager from '../managers/canvas.manager';
import BaseEntity from '../entities/base.entity';
import TransformComponent from '../components/transform.component';
import LabelTextComponent from '../components/label-text.component';

@Injectable()
export default class LabelSystem implements OnRender {
	constructor(private gameObjectsManager: GameObjectsManager, private canvasManager: CanvasManager) {}

	public onRender(loopInfo: ILoopInfo) {
		this.gameObjectsManager.gameObjectItems.forEach((entity: BaseEntity) => {
			const transform: TransformComponent = entity.getProperty('transform');
			const labelText: LabelTextComponent = entity.getProperty('label-text');
			if (!transform || !labelText) return;

			const ctx = this.canvasManager.Context;
			ctx.font = labelText.font;
			ctx.fillStyle = labelText.color;
			ctx.fillText(labelText.text, transform.position.x, transform.position.y);
		});
	}
}
