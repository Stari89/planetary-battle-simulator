import { Injectable } from '../ioc/injector';
import { OnUpdate } from '../util/lifecycle';
import { ILoopInfo } from '../providers/game-loop.provider';
import EntityContainer from '../entity/entity-container';
import TransformComponent from '../components/transform.component';
import CameraComponent from '../components/camera.component';
import InputProvider from '../providers/input.provider';
import CanvasProvider from '../providers/canvas.provider';

@Injectable()
export default class CameraSystem implements OnUpdate {
    constructor(
        private entityContainer: EntityContainer,
        private inputProvider: InputProvider,
        private canvasProvider: CanvasProvider
    ) {}

    public onUpdate(loopInfo: ILoopInfo) {
        this.entityContainer.getEntitiesWithComponents(TransformComponent, CameraComponent).forEach(cameraEntity => {
            const transformComponent = cameraEntity.get(TransformComponent);
            if (this.inputProvider.MouseState.pressedButtons.some(b => b === 0)) {
                transformComponent.position = transformComponent.position.subtract(
                    this.inputProvider.MouseState.deltaPosition.scale(1 / transformComponent.scale.x)
                );
            }

            if (this.inputProvider.MouseState.scrollDelta.y !== 0) {
                const mouseCameraScaledOffset = this.inputProvider.MouseState.position
                    .subtract(this.canvasProvider.ViewSize.scale(0.5))
                    .scale(1 / transformComponent.scale.x);
                transformComponent.position =
                    this.inputProvider.MouseState.scrollDelta.y > 0
                        ? transformComponent.position.subtract(mouseCameraScaledOffset.scale(1.25 - 1))
                        : transformComponent.position.add(mouseCameraScaledOffset.scale(1 - 0.8));
                transformComponent.scale = transformComponent.scale.scale(
                    this.inputProvider.MouseState.scrollDelta.y > 0 ? 0.8 : 1.25
                );
            }

            const cameraComponent = cameraEntity.get(CameraComponent);
            cameraComponent.viewFramePosition = this.canvasProvider.ViewSize.scale(-0.5)
                .scale(1 / transformComponent.scale.x)
                .add(transformComponent.position);

            cameraComponent.viewFrameSize = this.canvasProvider.ViewSize.scale(1 / transformComponent.scale.x);
        });
    }
}
