import { OnUpdate } from '../lifecycle';
import GameObjectsProvider from '../providers/game-objects.provider';
import InputProvider from '../providers/input.provider';
import { Injectable } from '../ioc/injector';
import { ILoopInfo } from '../providers/game-loop.provider';
import BaseEntity, { Tags } from '../entities/base.entity';
import LabelTextComponent from '../components/label-text.component';
import TouchStateComponent from '../components/touch-state.component';

@Injectable()
export default class TouchStateLabelSystem implements OnUpdate {
    constructor(private gameObjectsManager: GameObjectsProvider, private inputManager: InputProvider) {}

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
