import { Injectable } from '../ioc/injector';
import { ILoopInfo } from '../providers/game-loop.provider';
import EntityContainer from '../entity/entity-container';
import CanvasProvider from '../providers/canvas.provider';
import { OnUpdate } from '../util/lifecycle';
import GridComponent from '../components/grid.component';
import CameraComponent from '../components/camera.component';
import TransformComponent from '../components/transform.component';
import PolygonComponent from '../components/polygon.component';
import Vector2 from '../util/vector-2';

@Injectable()
export default class GridSystem implements OnUpdate {
    constructor(private entityContainer: EntityContainer, private canvasProvider: CanvasProvider) {}

    public onUpdate(loopInfo: ILoopInfo): void {
        this.entityContainer
            .getEntitiesWithComponents(GridComponent, TransformComponent, PolygonComponent)
            .forEach(gridEntity => {
                const gridComponent = gridEntity.get(GridComponent);
                const polygon = gridEntity.get(PolygonComponent);

                this.entityContainer
                    .getEntitiesWithComponents(CameraComponent, TransformComponent)
                    .forEach(cameraEntity => {
                        const cameraComponent = cameraEntity.get(CameraComponent);

                        polygon.points = [];

                        const xMin =
                            Math.floor(cameraComponent.viewFramePosition.x / gridComponent.resolution) *
                                gridComponent.resolution -
                            gridComponent.resolution;
                        const xMax =
                            Math.ceil(
                                (cameraComponent.viewFramePosition.x + cameraComponent.viewFrameSize.x) /
                                    gridComponent.resolution
                            ) *
                                gridComponent.resolution +
                            gridComponent.resolution;
                        const yMin =
                            Math.floor(cameraComponent.viewFramePosition.y / gridComponent.resolution) *
                                gridComponent.resolution -
                            gridComponent.resolution;
                        const yMax =
                            Math.ceil(
                                (cameraComponent.viewFramePosition.y + cameraComponent.viewFrameSize.y) /
                                    gridComponent.resolution
                            ) *
                                gridComponent.resolution +
                            gridComponent.resolution;

                        let x = xMin;
                        let down = true;
                        while (x <= xMax) {
                            if (down) {
                                polygon.points.push(new Vector2(x, yMin));
                                polygon.points.push(new Vector2(x, yMax));
                            } else {
                                polygon.points.push(new Vector2(x, yMax));
                                polygon.points.push(new Vector2(x, yMin));
                            }
                            down = !down;
                            x += gridComponent.resolution;
                        }
                        let y = yMin;
                        down = false;
                        while (y < yMax) {
                            if (down) {
                                polygon.points.push(new Vector2(xMin, y));
                                polygon.points.push(new Vector2(xMax, y));
                            } else {
                                polygon.points.push(new Vector2(xMax, y));
                                polygon.points.push(new Vector2(xMin, y));
                            }
                            down = !down;
                            y += gridComponent.resolution;
                        }
                    });
            });
    }
}
