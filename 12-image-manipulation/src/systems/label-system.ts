import { System, Injectable } from '../ioc/injector';
import { OnRender } from '../lifecycle';
import { ILoopInfo } from '../managers/game-loop-manager';
import GameObjectsManager from '../managers/game-objects-manager';
import CanvasManager from '../managers/canvas-manager';
import Entity from '../entities/entity';
import Transform from '../components/transform';
import LabelText from '../components/label-text';

@System()
@Injectable()
export default class LabelSystem implements OnRender {
	constructor(private gameObjectsManager: GameObjectsManager, private canvasManager: CanvasManager) {}

	public onRender(loopInfo: ILoopInfo) {
		this.gameObjectsManager.gameObjectItems.forEach((entity: Entity) => {
			const transform: Transform = entity.getProperty('transform');
			const labelText: LabelText = entity.getProperty('label-text');
			if (!transform || !labelText) return;

			const ctx = this.canvasManager.Context;
			ctx.font = labelText.font;
			ctx.fillStyle = labelText.color;
			ctx.fillText(labelText.text, transform.position.x, transform.position.y);
		});
	}
}
