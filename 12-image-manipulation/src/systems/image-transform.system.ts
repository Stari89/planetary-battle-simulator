import { Injectable } from '../ioc/injector';
import { OnRender } from '../lifecycle';
import GameObjectsManager from '../managers/game-objects.manager';
import CanvasManager from '../managers/canvas.manager';
import { ILoopInfo } from '../managers/game-loop.manager';
import BaseEntity, { Tags } from '../entities/base.entity';
import TransformComponent from '../components/transform.component';
import ImageComponent from '../components/image.component';

@Injectable()
export default class ImageTransformSystem implements OnRender {
    constructor(private gameObjectsManager: GameObjectsManager, private canvasManager: CanvasManager) {}

    public onRender(loopInfo: ILoopInfo) {
        this.gameObjectsManager.gameObjectItems.forEach((entity: BaseEntity) => {
            const transform: TransformComponent = entity.getProperty(Tags.Transform);
            const image: ImageComponent = entity.getProperty(Tags.Image);
            if (!transform || !image) return;
            const ctx = this.canvasManager.Context;
            ctx.drawImage(
                image.imageElement,
                transform.position.x,
                transform.position.y,
                transform.scale.x,
                transform.scale.y
            );
        });
    }
}
