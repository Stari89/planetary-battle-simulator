import { Injectable } from '../ioc/injector';
import { OnUpdate } from '../lifecycle';
import { ILoopInfo } from '../managers/game-loop.manager';
import GameObjectsManager from '../managers/game-objects.manager';
import LabelTextComponent from '../components/label-text.component';
import BaseEntity, { Tags } from '../entities/base.entity';
import PressedKeysComponent from '../components/pressed-keys.component';
import InputManager from '../managers/input.manager';

@Injectable()
export default class PressedKeysLabelSystem implements OnUpdate {
	constructor(private gameObjectsManager: GameObjectsManager, private inputManager: InputManager) {}

	public onUpdate(loopInfo: ILoopInfo) {
		this.gameObjectsManager.gameObjectItems.forEach((entity: BaseEntity) => {
			const labelText: LabelTextComponent = entity.getProperty(Tags.LabelText);
			const pressedKeys: PressedKeysComponent = entity.getProperty(Tags.PressedKeys);
			if (!labelText || !pressedKeys) return;

			labelText.text = `Pressed keys: [${this.inputManager.KeyboardState.pressedKeys.toString()}]`;
		});
	}
}
