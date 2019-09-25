import { Injectable } from '../ioc/injector';
import { OnRender } from '../lifecycle';
import { ILoopInfo } from '../providers/game-loop.provider';
import GameObjectsProvider from '../providers/game-objects.provider';
import CanvasProvider from '../providers/canvas.provider';
import BaseEntity, { Tags } from '../entities/base.entity';
import TransformComponent from '../components/transform.component';
import LabelTextComponent from '../components/label-text.component';

@Injectable()
export default class LabelSystem implements OnRender {
    constructor(private gameObjectsManager: GameObjectsProvider, private canvasManager: CanvasProvider) {}

    public onRender(loopInfo: ILoopInfo) {
        this.gameObjectsManager.gameObjectItems.forEach((entity: BaseEntity) => {
            const transform: TransformComponent = entity.getProperty(Tags.Transform);
            const labelText: LabelTextComponent = entity.getProperty(Tags.LabelText);
            if (!transform || !labelText) return;

            const ctx = this.canvasManager.Context;
            ctx.font = labelText.font;
            ctx.fillStyle = labelText.color;
            ctx.fillText(labelText.text, transform.position.x, transform.position.y);
        });
    }
}
