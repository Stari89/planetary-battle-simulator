import { OnUpdate } from '../lifecycle';
import GameObjectsManager from '../managers/game-objects.manager';
import InputManager from '../managers/input.manager';
import { Injectable } from '../ioc/injector';
import { ILoopInfo } from '../managers/game-loop.manager';
import BaseEntity, { Tags } from '../entities/base.entity';
import LabelTextComponent from '../components/label-text.component';
import TouchStateComponent from '../components/touch-state.component';

@Injectable()
export default class TouchStateLabelSystem implements OnUpdate {
    constructor(private gameObjectsManager: GameObjectsManager, private inputManager: InputManager) {}

    public onUpdate(loopInfo: ILoopInfo) {
        this.gameObjectsManager.gameObjectItems.forEach((entity: BaseEntity) => {
            const labelText: LabelTextComponent = entity.getProperty(Tags.LabelText);
            const touchState: TouchStateComponent = entity.getProperty(Tags.TouchState);
            if (!labelText || !touchState) return;

            let touchString = '';
            this.inputManager.TouchState.touchList.forEach(touch => {
                touchString += touch.position.floor().toString();
            });

            labelText.text = `Touch: [${touchString}]`;
        });
    }
}
