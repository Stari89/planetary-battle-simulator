import { Injectable } from '../ioc/injector';
import { OnRender } from '../util/lifecycle';
import { ILoopInfo } from '../providers/game-loop.provider';
import EntityContainer from '../entity/entity-container';
import CanvasProvider from '../providers/canvas.provider';
import PolygonComponent from '../components/polygon.component';
import TransformComponent from '../components/transform.component';
import Vector2 from '../util/vector-2';
import CameraComponent from '../components/camera.component';

@Injectable()
export default class PolygonSystem implements OnRender {
    constructor(private entityContainer: EntityContainer, private canvasProvider: CanvasProvider) {}

    public onRender(loopInfo: ILoopInfo) {
        const ctx = this.canvasProvider.Context;

        this.entityContainer.getEntitiesWithComponents(PolygonComponent, TransformComponent).forEach(entity => {
            const polygonComponent = entity.get(PolygonComponent);
            const transformComponent = entity.get(TransformComponent);

            if (!polygonComponent.points || polygonComponent.points.length < 2) {
                return;
            }

            this.entityContainer.getEntitiesWithComponents(CameraComponent, TransformComponent).forEach(camera => {
                const cameraTransform = camera.get(TransformComponent);

                const points = this.calculatePoints(polygonComponent, transformComponent, cameraTransform);

                // draw CRT artifacts
                ctx.beginPath();
                ctx.moveTo(points[0].x - 1, points[0].y - 1);
                points.forEach(point => {
                    ctx.lineTo(point.x - 1, point.y - 1);
                });
                if (polygonComponent.closePath) {
                    ctx.closePath();
                }
                ctx.strokeStyle = polygonComponent.lineColor.ghostRed.toString();
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(points[0].x + 1, points[0].y + 1);
                points.forEach(point => {
                    ctx.lineTo(point.x + 1, point.y + 1);
                });
                if (polygonComponent.closePath) {
                    ctx.closePath();
                }
                ctx.strokeStyle = polygonComponent.lineColor.ghostBlue.toString();
                ctx.stroke();

                // draw poly
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
                points.forEach(point => {
                    ctx.lineTo(point.x, point.y);
                });
                if (polygonComponent.closePath) {
                    ctx.closePath();
                }
                ctx.strokeStyle = polygonComponent.lineColor.toString();
                ctx.stroke();
            });
        });
    }

    private calculatePoints(
        polygonComponent: PolygonComponent,
        transformComponent: TransformComponent,
        cameraTransform: TransformComponent
    ): Array<Vector2> {
        const result: Array<Vector2> = [];
        for (let i = 0; i < polygonComponent.points.length; i++) {
            // Step 1: point relative to the position of the transformComponent (rotated)
            let point = polygonComponent.points[i].rotate(transformComponent.rotation, polygonComponent.center);
            // Step 2: point relative to the position of the transformComponent (rotated and scaled)
            point = new Vector2(point.x * transformComponent.scale.x, point.y * transformComponent.scale.y);
            // Step 3: point relative to the position of the camera
            point = point.subtract(cameraTransform.position).add(transformComponent.position);
            // Step 4: point relative to the position of the camera (scaled)
            point = point.scale(cameraTransform.scale.x);
            // Step 5: point relative to the top left corner of the screen
            point = point.add(this.canvasProvider.ViewSize.scale(0.5));
            result.push(point);
        }
        return result;
    }
}
