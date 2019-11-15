import { Injectable } from '../ioc/injector';
import { OnUpdate } from '../util/lifecycle';
import { ILoopInfo } from '../providers/game-loop.provider';
import EntityContainer from '../entity/entity-container';
import TransformComponent from '../components/transform.component';
import CameraComponent from '../components/camera.component';
import Vector2 from '../util/vector-2';
import InputProvider from '../providers/input.provider';
import FocusComponent from '../components/focus.component';
import CanvasProvider from '../providers/canvas.provider';

@Injectable()
export default class CameraSystem implements OnUpdate {
    constructor(
        private entityContainer: EntityContainer,
        private inputProvider: InputProvider,
        private canvasProvider: CanvasProvider
    ) {}

    public onUpdate(loopInfo: ILoopInfo) {
        this.entityContainer.getEntitiesWithComponents(TransformComponent, CameraComponent).forEach(entity => {
            const transformComponent = entity.get(TransformComponent);
            if (this.inputProvider.MouseState.pressedButtons.some(b => b === 0)) {
                transformComponent.position = transformComponent.position.subtract(
                    this.inputProvider.MouseState.deltaPosition
                );
            }
        });
    }
}
