import { Injectable } from '../ioc/injector';
import { OnRender } from '../util/lifecycle';
import EntityContainer from '../entity/entity-container';
import CanvasProvider from '../providers/canvas.provider';
import { ILoopInfo } from '../providers/game-loop.provider';
import TransformComponent from '../components/transform.component';
import StarfieldComponent, { Luminosity } from '../components/starfield.component';
import CameraComponent from '../components/camera.component';
import Vector2 from '../util/vector-2';

@Injectable()
export default class StarfieldSystem implements OnRender {
    constructor(private entityContainer: EntityContainer, private canvasProvider: CanvasProvider) {}

    public onRender(loopInfo: ILoopInfo) {
        this.entityContainer.getEntitiesWithComponents(TransformComponent, StarfieldComponent).forEach(entity => {
            const transformComponent = entity.get(TransformComponent);
            const starfieldComponent = entity.get(StarfieldComponent);

            const paralaxFactor =
                1 /
                (starfieldComponent.luminosity === Luminosity.Bright
                    ? 2
                    : starfieldComponent.luminosity === Luminosity.Normal
                    ? 4
                    : 8);

            this.entityContainer.getEntitiesWithComponents(CameraComponent, TransformComponent).forEach(camera => {
                const cameraTransform = camera.get(TransformComponent);

                const renderPosition = new Vector2(
                    transformComponent.position.x -
                        (starfieldComponent.offset.x * transformComponent.scale.x) / starfieldComponent.cutoutSize.x -
                        cameraTransform.position.x * paralaxFactor,
                    transformComponent.position.y -
                        (starfieldComponent.offset.y * transformComponent.scale.y) / starfieldComponent.cutoutSize.y -
                        cameraTransform.position.y * paralaxFactor
                );

                const tileStartPosition = new Vector2(
                    renderPosition.x % starfieldComponent.tileSize.x,
                    renderPosition.y % starfieldComponent.tileSize.y
                );
                tileStartPosition.x =
                    tileStartPosition.x > 0 ? tileStartPosition.x - starfieldComponent.tileSize.x : tileStartPosition.x;
                tileStartPosition.y =
                    tileStartPosition.y > 0 ? tileStartPosition.y - starfieldComponent.tileSize.y : tileStartPosition.y;

                const tilePosition = new Vector2(tileStartPosition.x, tileStartPosition.y);
                while (tilePosition.x < this.canvasProvider.ViewSize.x) {
                    while (tilePosition.y < this.canvasProvider.ViewSize.y) {
                        this.canvasProvider.Context.drawImage(
                            starfieldComponent.image,
                            starfieldComponent.cutoutPosition.x,
                            starfieldComponent.cutoutPosition.y,
                            starfieldComponent.cutoutSize.x,
                            starfieldComponent.cutoutSize.y,
                            tilePosition.x,
                            tilePosition.y,
                            transformComponent.scale.x,
                            transformComponent.scale.y
                        );
                        tilePosition.y += starfieldComponent.tileSize.y;
                    }
                    tilePosition.y = tileStartPosition.y;
                    tilePosition.x += starfieldComponent.tileSize.x;
                }
            });
        });
    }
}
