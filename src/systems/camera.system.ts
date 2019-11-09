import { Injectable } from '../ioc/injector';
import { OnUpdate } from '../lifecycle';
import { ILoopInfo } from '../providers/game-loop.provider';
import EntityContainer from '../entity/entity-container';
import TransformComponent from '../components/transform.component';
import CameraComponent from '../components/camera.component';
import Vector2 from '../vector-2';
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
        const focusEntity = this.entityContainer
            .getEntitiesWithComponents(FocusComponent, TransformComponent)
            .find(entity => entity.get(FocusComponent).isFocused);
        let focus = new Vector2(0, 0);
        if (!!focusEntity) {
            focus = focusEntity.get(TransformComponent).position;
        }
        focus = focus.add(this.canvasProvider.ViewSize.scale(-0.5));

        this.entityContainer.getEntitiesWithComponents(TransformComponent, CameraComponent).forEach(entity => {
            const transformComponent = entity.get(TransformComponent);
            transformComponent.position = focus;

            // if (this.inputProvider.KeyboardState.pressedKeys.some(key => key === 'ArrowUp')) {
            // 	transformComponent.position = transformComponent.position.add(new Vector2(0, -loopInfo.dt / 5));
            // }
            // if (this.inputProvider.KeyboardState.pressedKeys.some(key => key === 'ArrowDown')) {
            // 	transformComponent.position = transformComponent.position.add(new Vector2(0, loopInfo.dt / 5));
            // }
            // if (this.inputProvider.KeyboardState.pressedKeys.some(key => key === 'ArrowLeft')) {
            // 	transformComponent.position = transformComponent.position.add(new Vector2(-loopInfo.dt / 5, 0));
            // }
            // if (this.inputProvider.KeyboardState.pressedKeys.some(key => key === 'ArrowRight')) {
            // 	transformComponent.position = transformComponent.position.add(new Vector2(loopInfo.dt / 5, 0));
            // }
        });
    }
}
