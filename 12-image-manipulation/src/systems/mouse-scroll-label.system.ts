import { Injectable } from '../ioc/injector';
import { OnUpdate } from '../lifecycle';
import { ILoopInfo } from '../managers/game-loop.manager';
import GameObjectsManager from '../managers/game-objects.manager';
import LabelTextComponent from '../components/label-text.component';
import BaseEntity, { Tags } from '../entities/base.entity';
import InputManager from '../managers/input.manager';
import MouseScrollComponent from '../components/mouse-scroll.component';
import Vector2 from '../vector-2';

@Injectable()
export default class MouseScrollLabelSystem implements OnUpdate {
	private lastScroll: Vector2;

	constructor(private gameObjectsManager: GameObjectsManager, private inputManager: InputManager) {
		this.lastScroll = new Vector2(0, 0);
	}

	public onUpdate(loopInfo: ILoopInfo) {
		this.gameObjectsManager.gameObjectItems.forEach((entity: BaseEntity) => {
			const labelText: LabelTextComponent = entity.getProperty(Tags.LabelText);
			const mouseScroll: MouseScrollComponent = entity.getProperty(Tags.MouseScroll);
			if (!labelText || !mouseScroll) return;

			if (!this.inputManager.MouseState.scrollDelta.equals(new Vector2(0, 0))) {
				this.lastScroll = this.inputManager.MouseState.scrollDelta;
			}

			labelText.text = `Mouse scroll: ${this.inputManager.MouseState.scrollDelta}, last scroll: ${this.lastScroll}`;
		});
	}
}
