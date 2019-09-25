import { Injectable } from '../ioc/injector';
import { OnUpdate } from '../lifecycle';
import { ILoopInfo } from '../providers/game-loop.provider';
import GameObjectsProvider from '../providers/game-objects.provider';
import LabelTextComponent from '../components/label-text.component';
import BaseEntity, { Tags } from '../entities/base.entity';
import InputProvider from '../providers/input.provider';
import MouseScrollComponent from '../components/mouse-scroll.component';
import Vector2 from '../vector-2';

@Injectable()
export default class MouseScrollLabelSystem implements OnUpdate {
    private lastScroll: Vector2;

    constructor(private gameObjectsManager: GameObjectsProvider, private inputManager: InputProvider) {
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
