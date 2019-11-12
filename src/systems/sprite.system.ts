import { Injectable } from '../ioc/injector';
import EntityContainer from '../entity/entity-container';
import CanvasProvider from '../providers/canvas.provider';
import { ILoopInfo } from '../providers/game-loop.provider';
import { OnRender } from '../util/lifecycle';
import TransformComponent from '../components/transform.component';
import SpriteComponent from '../components/sprite.component';
import CameraComponent from '../components/camera.component';

@Injectable()
export default class SpriteSystem implements OnRender {
    constructor(private entityContainer: EntityContainer, private canvasProvider: CanvasProvider) {}

    public onRender(loopInfo: ILoopInfo) {
        this.entityContainer.getEntitiesWithComponents(TransformComponent, SpriteComponent).forEach(entity => {
            const transformComponent = entity.get(TransformComponent);
            const spriteComponent = entity.get(SpriteComponent);

            this.entityContainer.getEntitiesWithComponents(CameraComponent, TransformComponent).forEach(camera => {
                const cameraTransform = camera.get(TransformComponent);

                this.canvasProvider.Context.drawImage(
                    spriteComponent.image,
                    spriteComponent.cutoutPosition.x,
                    spriteComponent.cutoutPosition.y,
                    spriteComponent.cutoutSize.x,
                    spriteComponent.cutoutSize.y,
                    transformComponent.position.x -
                        (spriteComponent.offset.x * transformComponent.scale.x) / spriteComponent.cutoutSize.x -
                        cameraTransform.position.x,
                    transformComponent.position.y -
                        (spriteComponent.offset.y * transformComponent.scale.y) / spriteComponent.cutoutSize.y -
                        cameraTransform.position.y,
                    transformComponent.scale.x,
                    transformComponent.scale.y
                );
            });
        });
    }
}
