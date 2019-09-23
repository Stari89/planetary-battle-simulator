import { Injectable } from '../ioc/injector';
import { OnUpdate } from '../lifecycle';
import { ILoopInfo } from '../managers/game-loop.manager';
import GameObjectsManager from '../managers/game-objects.manager';
import LabelTextComponent from '../components/label-text.component';
import BaseEntity from '../entities/base.entity';
import InputManager from '../managers/input.manager';
import Vector2 from '../vector-2';
import MouseStateComponent from '../components/mouse-state.component';

@Injectable()
export default class MouseStateLabelSystem implements OnUpdate {
	constructor(private gameObjectsManager: GameObjectsManager, private inputManager: InputManager) {}

	public onUpdate(loopInfo: ILoopInfo) {
		this.gameObjectsManager.gameObjectItems.forEach((entity: BaseEntity) => {
			const labelText: LabelTextComponent = entity.getProperty('label-text');
			const mouseState: MouseStateComponent = entity.getProperty('mouse-state');
			if (!labelText || !mouseState) return;

			labelText.text = `Mouse buttons pressed: [${this.inputManager.MouseState.pressedButtons}], Mouse position: ${this.inputManager.MouseState.position}`;
		});
	}
}
