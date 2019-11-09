import { Injectable } from '../ioc/injector';
import { ILoopInfo } from '../providers/game-loop.provider';
import EntityContainer from '../entity/entity-container';
import CanvasProvider from '../providers/canvas.provider';
import { OnRender } from '../lifecycle';
import GridComponent from '../components/grid.component';
import CameraComponent from '../components/camera.component';
import TransformComponent from '../components/transform.component';

@Injectable()
export default class GridSystem implements OnRender {
    constructor(private entityContainer: EntityContainer, private canvasProvider: CanvasProvider) {}

    public onRender(loopInfo: ILoopInfo) {
        const ctx = this.canvasProvider.Context;
        const view = this.canvasProvider.ViewSize;

        this.entityContainer.getEntitiesWithComponents(GridComponent).forEach(entity => {
            const gridComponent = entity.get(GridComponent);

            this.entityContainer.getEntitiesWithComponents(CameraComponent, TransformComponent).forEach(camera => {
                const cameraTransform = camera.get(TransformComponent);

                let x = ((view.x - cameraTransform.position.x * 2) % (gridComponent.resolution * 2)) / 2;
                while (x < view.x) {
                    ctx.beginPath();
                    ctx.moveTo(x - 1, 0);
                    ctx.lineTo(x - 1, view.y);
                    ctx.strokeStyle = `#FF00FF${gridComponent.weight}`;
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(x + 1, 0);
                    ctx.lineTo(x + 1, view.y);
                    ctx.strokeStyle = `#00FFFF${gridComponent.weight}`;
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, view.y);
                    ctx.strokeStyle = `#FFFFFF${gridComponent.weight}`;
                    ctx.stroke();

                    x += gridComponent.resolution;
                }

                let y = ((view.y - cameraTransform.position.y * 2) % (gridComponent.resolution * 2)) / 2;
                while (y < view.y) {
                    ctx.beginPath();
                    ctx.moveTo(0, y - 1);
                    ctx.lineTo(view.x, y - 1);
                    ctx.strokeStyle = `#FF00FF${gridComponent.weight}`;
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(0, y + 1);
                    ctx.lineTo(view.x, y + 1);
                    ctx.strokeStyle = `#00FFFF${gridComponent.weight}`;
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(0, y);
                    ctx.lineTo(view.x, y);
                    ctx.strokeStyle = `#FFFFFF${gridComponent.weight}`;
                    ctx.stroke();

                    y += gridComponent.resolution;
                }
            });
        });
    }
}
