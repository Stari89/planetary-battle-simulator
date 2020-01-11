import { Injectable } from '../ioc/injector';
import { OnRender } from '../util/lifecycle';
import EntityContainer from '../entity/entity-container';
import CanvasProvider from '../providers/canvas.provider';
import { ILoopInfo } from '../providers/game-loop.provider';
import TransformComponent from '../components/transform.component';
import BackgroundComponent from '../components/background.component';
import CameraComponent from '../components/camera.component';
import Vector2 from '../util/vector-2';

@Injectable()
export default class BackgroundSystem implements OnRender {
    constructor(private entityContainer: EntityContainer, private canvasProvider: CanvasProvider) {}

    public onRender(loopInfo: ILoopInfo) {
        this.entityContainer.getEntitiesWithComponents(TransformComponent, BackgroundComponent).forEach(background => {
            const backgroundTransformComponent = background.get(TransformComponent);
            const backgroundBackgroundComponent = background.get(BackgroundComponent);

            this.entityContainer.getEntitiesWithComponents(CameraComponent, TransformComponent).forEach(camera => {
                const cameraTransformComponent = camera.get(TransformComponent);
                const renderPosition = new Vector2(
                    backgroundTransformComponent.position.x -
                        (backgroundBackgroundComponent.offset.x * backgroundTransformComponent.scale.x) /
                            backgroundBackgroundComponent.cutoutSize.x -
                        cameraTransformComponent.position.x *
                            cameraTransformComponent.scale.x *
                            backgroundBackgroundComponent.paralax,
                    backgroundTransformComponent.position.y -
                        (backgroundBackgroundComponent.offset.y * backgroundTransformComponent.scale.y) /
                            backgroundBackgroundComponent.cutoutSize.y -
                        cameraTransformComponent.position.y *
                            cameraTransformComponent.scale.y *
                            backgroundBackgroundComponent.paralax
                );

                const tileStartPosition = new Vector2(
                    renderPosition.x % backgroundBackgroundComponent.tileSize.x,
                    renderPosition.y % backgroundBackgroundComponent.tileSize.y
                );
                tileStartPosition.x =
                    tileStartPosition.x > 0
                        ? tileStartPosition.x - backgroundBackgroundComponent.tileSize.x
                        : tileStartPosition.x;
                tileStartPosition.y =
                    tileStartPosition.y > 0
                        ? tileStartPosition.y - backgroundBackgroundComponent.tileSize.y
                        : tileStartPosition.y;

                const tilePosition = new Vector2(tileStartPosition.x, tileStartPosition.y);
                while (tilePosition.x < this.canvasProvider.ViewSize.x) {
                    while (tilePosition.y < this.canvasProvider.ViewSize.y) {
                        this.canvasProvider.Context.drawImage(
                            backgroundBackgroundComponent.image,
                            backgroundBackgroundComponent.cutoutPosition.x,
                            backgroundBackgroundComponent.cutoutPosition.y,
                            backgroundBackgroundComponent.cutoutSize.x,
                            backgroundBackgroundComponent.cutoutSize.y,
                            tilePosition.x,
                            tilePosition.y,
                            backgroundTransformComponent.scale.x,
                            backgroundTransformComponent.scale.y
                        );
                        tilePosition.y += backgroundBackgroundComponent.tileSize.y;
                    }
                    tilePosition.y = tileStartPosition.y;
                    tilePosition.x += backgroundBackgroundComponent.tileSize.x;
                }
            });
        });
    }
}
