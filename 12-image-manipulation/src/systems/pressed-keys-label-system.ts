import { System, Injectable } from '../ioc/injector';
import { OnUpdate } from '../lifecycle';
import { ILoopInfo } from '../managers/game-loop-manager';
import GameObjectsManager from '../managers/game-objects-manager';
import LabelText from '../components/label-text';
import Entity from '../entities/entity';
import KeyboardInput from '../components/keyboard-input';
import InputManager from '../managers/input-manager';

@System()
@Injectable()
export default class PressedKeysLabelSystem implements OnUpdate {
	constructor(private gameObjectsManager: GameObjectsManager, private inputManager: InputManager) {}

	public onUpdate(loopInfo: ILoopInfo) {
		this.gameObjectsManager.gameObjectItems.forEach((entity: Entity) => {
			const labelText: LabelText = entity.getProperty('label-text');
			const keyboardInput: KeyboardInput = entity.getProperty('keyboard-input');
			if (!labelText || !keyboardInput) return;

			labelText.text = `Pressed keys: [${this.inputManager.KeyboardState.pressedKeys.toString()}]`;
		});
	}
}
