import { System, Injectable } from '../ioc/injector';
import { OnRender } from '../lifecycle';
import { ILoopInfo } from '../managers/game-loop-manager';
import GameObjectsManager from '../managers/game-objects-manager';
import Label from '../entities/label';
import CanvasManager from '../managers/canvas-manager';

@System()
@Injectable()
export default class LabelSystem implements OnRender {
	constructor(private gameObjectsManager: GameObjectsManager, private canvasManager: CanvasManager) {}

	public onRender(loopInfo: ILoopInfo) {
		this.gameObjectsManager.gameObjectItems
			.filter(x => {
				const tags = x.Tags;
				const requiredTags = ['transform', 'label-text'];
				return requiredTags.every(tag => tags.indexOf(tag) > -1);
			})
			.forEach((x: Label) => {
				const ctx = this.canvasManager.Context;
				ctx.font = x.labelText.font;
				ctx.fillStyle = x.labelText.color;
				ctx.fillText(x.labelText.text, x.transform.position.x, x.transform.position.y);
			});
	}
}
