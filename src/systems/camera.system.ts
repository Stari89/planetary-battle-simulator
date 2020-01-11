import { Injectable } from '../ioc/injector';
import { OnUpdate } from '../util/lifecycle';
import { ILoopInfo } from '../providers/game-loop.provider';
import EntityContainer from '../entity/entity-container';
import TransformComponent from '../components/transform.component';
import CameraComponent from '../components/camera.component';
import InputProvider from '../providers/input.provider';
import CanvasProvider from '../providers/canvas.provider';
import Vector2 from '../util/vector-2';

@Injectable()
export default class CameraSystem implements OnUpdate {
    constructor(
        private entityContainer: EntityContainer,
        private inputProvider: InputProvider,
        private canvasProvider: CanvasProvider
    ) {}

    public onUpdate(loopInfo: ILoopInfo) {
        this.entityContainer.getEntitiesWithComponents(TransformComponent, CameraComponent).forEach(cameraEntity => {
            const cameraCameraComponent = cameraEntity.get(CameraComponent);
            const cameraTransformComponent = cameraEntity.get(TransformComponent);

            this.updateCameraTranslation(cameraTransformComponent);
            this.updateCameraZoom(cameraCameraComponent, cameraTransformComponent);
            this.updateCameraViewFrame(cameraCameraComponent, cameraTransformComponent);
        });
    }

    private updateCameraTranslation(cameraTransformComponent: TransformComponent): void {
        // return if left mouse button was not pressed
        if (!this.inputProvider.MouseState.pressedButtons.some(b => b === 0)) {
            return;
        }
        cameraTransformComponent.position = cameraTransformComponent.position.subtract(
            this.inputProvider.MouseState.deltaPosition.scale(1 / cameraTransformComponent.scale.x)
        );
    }

    private updateCameraZoom(
        cameraCameraComponent: CameraComponent,
        cameraTransformComponent: TransformComponent
    ): void {
        // return if scroll wheel was not moved
        if (this.inputProvider.MouseState.scrollDelta.y === 0) {
            return;
        }

        const offsetBeforeZooming = this.getMouseToCameraWorldOffset(cameraTransformComponent);
        this.setCurrentZoomLevel(cameraCameraComponent, this.inputProvider.MouseState.scrollDelta);
        const newScale = Math.pow(0.8, -cameraCameraComponent.currentZoomLevel);
        cameraTransformComponent.scale = new Vector2(newScale, newScale);
        const offsetAfterZooming = this.getMouseToCameraWorldOffset(cameraTransformComponent);

        cameraTransformComponent.position = cameraTransformComponent.position
            .add(offsetBeforeZooming)
            .subtract(offsetAfterZooming);
    }

    private updateCameraViewFrame(
        cameraCameraComponent: CameraComponent,
        cameraTransformComponent: TransformComponent
    ): void {
        cameraCameraComponent.viewFramePosition = this.canvasProvider.ViewSize.scale(-0.5)
            .scale(1 / cameraTransformComponent.scale.x)
            .add(cameraTransformComponent.position);
        cameraCameraComponent.viewFrameSize = this.canvasProvider.ViewSize.scale(1 / cameraTransformComponent.scale.x);
    }

    private setCurrentZoomLevel(cameraComponent: CameraComponent, scrollDelta: Vector2) {
        cameraComponent.currentZoomLevel += scrollDelta.y < 0 ? 1 : -1;
        if (cameraComponent.currentZoomLevel > cameraComponent.maxZoomLevel) {
            cameraComponent.currentZoomLevel = cameraComponent.maxZoomLevel;
        }
        if (cameraComponent.currentZoomLevel < cameraComponent.minZoomLevel) {
            cameraComponent.currentZoomLevel = cameraComponent.minZoomLevel;
        }
    }

    // Returns position of the mouse relative to the camera in game world
    private getMouseToCameraWorldOffset(cameraTransformComponent: TransformComponent): Vector2 {
        return this.inputProvider.MouseState.position
            .subtract(this.canvasProvider.ViewSize.scale(0.5))
            .scale(1 / cameraTransformComponent.scale.x);
    }
}
