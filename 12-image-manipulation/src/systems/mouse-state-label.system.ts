import { Injectable } from '../ioc/injector';
import { OnUpdate } from '../lifecycle';
import { ILoopInfo } from '../providers/game-loop.provider';
import GameObjectsProvider from '../providers/game-objects.provider';
import LabelTextComponent from '../components/label-text.component';
import BaseEntity, { Tags } from '../entities/base.entity';
import InputProvider from '../providers/input.provider';
import MouseStateComponent from '../components/mouse-state.component';

@Injectable()
export default class MouseStateLabelSystem implements OnUpdate {
    constructor(private gameObjectsManager: GameObjectsProvider, private inputManager: InputProvider) {}

    public onUpdate(loopInfo: ILoopInfo) {
        this.gameObjectsManager.gameObjectItems.forEach((entity: BaseEntity) => {
            const labelText: LabelTextComponent = entity.getProperty(Tags.LabelText);
            const mouseState: MouseStateComponent = entity.getProperty(Tags.MouseState);
            if (!labelText || !mouseState) return;

            labelText.text = `Mouse buttons pressed: [${this.inputManager.MouseState.pressedButtons}], Mouse position: ${this.inputManager.MouseState.position}`;
        });
    }
}
