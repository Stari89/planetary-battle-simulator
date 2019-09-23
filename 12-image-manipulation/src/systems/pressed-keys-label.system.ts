import { Injectable } from '../ioc/injector';
import { OnUpdate } from '../lifecycle';
import { ILoopInfo } from '../managers/game-loop.manager';
import GameObjectsManager from '../managers/game-objects.manager';
import LabelTextComponent from '../components/label-text.component';
import BaseEntity from '../entities/base.entity';
import KeyboardInputComponent from '../components/keyboard-input.component';
import InputManager from '../managers/input.manager';

@Injectable()
export default class PressedKeysLabelSystem implements OnUpdate {
	constructor(private gameObjectsManager: GameObjectsManager, private inputManager: InputManager) {}

	public onUpdate(loopInfo: ILoopInfo) {
		this.gameObjectsManager.gameObjectItems.forEach((entity: BaseEntity) => {
			const labelText: LabelTextComponent = entity.getProperty('label-text');
			const keyboardInput: KeyboardInputComponent = entity.getProperty('keyboard-input');
			if (!labelText || !keyboardInput) return;

			labelText.text = `Pressed keys: [${this.inputManager.KeyboardState.pressedKeys.toString()}]`;
		});
	}
}
