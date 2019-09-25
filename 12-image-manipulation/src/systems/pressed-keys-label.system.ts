import { Injectable } from '../ioc/injector';
import { OnUpdate } from '../lifecycle';
import { ILoopInfo } from '../providers/game-loop.provider';
import GameObjectsProvider from '../providers/game-objects.provider';
import LabelTextComponent from '../components/label-text.component';
import BaseEntity, { Tags } from '../entities/base.entity';
import PressedKeysComponent from '../components/pressed-keys.component';
import InputProvider from '../providers/input.provider';

@Injectable()
export default class PressedKeysLabelSystem implements OnUpdate {
    constructor(private gameObjectsManager: GameObjectsProvider, private inputManager: InputProvider) {}

    public onUpdate(loopInfo: ILoopInfo) {
        this.gameObjectsManager.gameObjectItems.forEach((entity: BaseEntity) => {
            const labelText: LabelTextComponent = entity.getProperty(Tags.LabelText);
            const pressedKeys: PressedKeysComponent = entity.getProperty(Tags.PressedKeys);
            if (!labelText || !pressedKeys) return;

            labelText.text = `Pressed keys: [${this.inputManager.KeyboardState.pressedKeys.toString()}]`;
        });
    }
}
