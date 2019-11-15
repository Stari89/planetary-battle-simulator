import { Injectable } from '../ioc/injector';
import { OnRender } from '../util/lifecycle';
import { ILoopInfo } from '../providers/game-loop.provider';
import EntityContainer from '../entity/entity-container';
import CanvasProvider from '../providers/canvas.provider';
import PolygonComponent from '../components/polygon.component';
import TransformComponent from '../components/transform.component';
import Vector2 from '../util/vector-2';
import { Colors } from '../util/color';
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
                ctx.closePath();
                // ctx.fillStyle = Colors.ghostA(polygonComponent.lineColor);
                // ctx.fill();
                ctx.strokeStyle = Colors.ghostA(polygonComponent.lineColor);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(points[0].x + 1, points[0].y + 1);
                points.forEach(point => {
                    ctx.lineTo(point.x + 1, point.y + 1);
                });
                ctx.closePath();
                // ctx.fillStyle = Colors.ghostB(polygonComponent.lineColor);
                // ctx.fill();
                ctx.strokeStyle = Colors.ghostB(polygonComponent.lineColor);
                ctx.stroke();

                // draw poly
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
                points.forEach(point => {
                    ctx.lineTo(point.x, point.y);
                });
                ctx.closePath();
                // ctx.fillStyle = polygonComponent.lineColor;
                // ctx.fill();
                ctx.strokeStyle = polygonComponent.lineColor;
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
            let point = polygonComponent.points[i].rotate(transformComponent.rotation, polygonComponent.center);
            point = new Vector2(point.x * transformComponent.scale.x, point.y * transformComponent.scale.y);
            point = point.subtract(cameraTransform.position).add(transformComponent.position);
            result.push(point);
        }
        return result;
    }
}
