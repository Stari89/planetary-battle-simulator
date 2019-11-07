import { Injectable } from '../ioc/injector';
import EntityContainer from '../entity/entity-container';
import { OnUpdate, OnBeforeUpdate, OnRender } from '../lifecycle';
import { ILoopInfo } from '../providers/game-loop.provider';
import TransformComponent from '../components/transform.component';
import GravityAffectedComponent from '../components/gravity-affected.component';
import Vector2 from '../vector-2';
import CanvasProvider from '../providers/canvas.provider';
import CameraComponent from '../components/camera.component';

@Injectable()
export default class GravitySystem implements OnBeforeUpdate, OnUpdate, OnRender {
    private readonly G: number = 0.00001;

    constructor(private entityContainer: EntityContainer, private canvasProvider: CanvasProvider) {}

    public onBeforeUpdate(loopInfo: ILoopInfo) {
        this.entityContainer.getEntitiesWithComponents(TransformComponent, GravityAffectedComponent).forEach(entity => {
            const gravityAffectedComponent = entity.get(GravityAffectedComponent);
            const transformComponent = entity.get(TransformComponent);

            gravityAffectedComponent.preUpdatedPosition = transformComponent.position;
        });
    }

    public onUpdate(loopInfo: ILoopInfo) {
        this.entityContainer.getEntitiesWithComponents(TransformComponent, GravityAffectedComponent).forEach(planet => {
            const gravityAffectedComponent = planet.get(GravityAffectedComponent);
            const transformComponent = planet.get(TransformComponent);

            gravityAffectedComponent.netAcceleration = new Vector2(0, 0);
            this.entityContainer
                .getEntitiesWithComponents(TransformComponent, GravityAffectedComponent)
                .forEach(otherPlanet => {
                    if (planet === otherPlanet) return;
                    const otherGravityAffectedComponent = otherPlanet.get(GravityAffectedComponent);

                    const distance = otherGravityAffectedComponent.preUpdatedPosition.substract(
                        gravityAffectedComponent.preUpdatedPosition
                    );
                    const accelerationMagnitude =
                        (otherGravityAffectedComponent.mass * this.G) / Math.pow(distance.magnitude, 2);
                    const acceleration = distance.direction.scale(accelerationMagnitude);
                    gravityAffectedComponent.netAcceleration = gravityAffectedComponent.netAcceleration.add(
                        acceleration
                    );
                });

            const deltaVelocity = gravityAffectedComponent.netAcceleration.scale(loopInfo.dt);
            gravityAffectedComponent.velocity = gravityAffectedComponent.velocity.add(deltaVelocity);

            const deltaPosition = gravityAffectedComponent.velocity.scale(loopInfo.dt);
            transformComponent.position = transformComponent.position.add(deltaPosition);

            gravityAffectedComponent.positionHistory.push({ t: loopInfo.t, position: transformComponent.position });
            gravityAffectedComponent.positionHistory = gravityAffectedComponent.positionHistory.filter(
                log => log.t > loopInfo.t - 3000
            );
        });
    }

    public onRender(loopInfo: ILoopInfo) {
        this.entityContainer.getEntitiesWithComponents(TransformComponent, GravityAffectedComponent).forEach(planet => {
            const gravityAffectedComponent = planet.get(GravityAffectedComponent);

            if (gravityAffectedComponent.positionHistory.length < 2) {
                return;
            }
            const history = gravityAffectedComponent.positionHistory;
            const ctx = this.canvasProvider.Context;

            this.entityContainer.getEntitiesWithComponents(CameraComponent, TransformComponent).forEach(camera => {
                const cameraTransform = camera.get(TransformComponent);

                ctx.beginPath();
                for (let i = 0; i < gravityAffectedComponent.positionHistory.length - 1; i++) {
                    ctx.moveTo(
                        history[i].position.x - cameraTransform.position.x - 1,
                        history[i].position.y - cameraTransform.position.y - 1
                    );
                    ctx.lineTo(
                        history[i + 1].position.x - cameraTransform.position.x - 1,
                        history[i + 1].position.y - cameraTransform.position.y - 1
                    );
                }
                ctx.strokeStyle = `#FF00FF20`;
                ctx.stroke();

                ctx.beginPath();
                for (let i = 0; i < gravityAffectedComponent.positionHistory.length - 1; i++) {
                    ctx.moveTo(
                        history[i].position.x - cameraTransform.position.x + 1,
                        history[i].position.y - cameraTransform.position.y + 1
                    );
                    ctx.lineTo(
                        history[i + 1].position.x - cameraTransform.position.x + 1,
                        history[i + 1].position.y - cameraTransform.position.y + 1
                    );
                }
                ctx.strokeStyle = `#00FFFF20`;
                ctx.stroke();

                ctx.beginPath();
                for (let i = 0; i < gravityAffectedComponent.positionHistory.length - 1; i++) {
                    ctx.moveTo(
                        history[i].position.x - cameraTransform.position.x,
                        history[i].position.y - cameraTransform.position.y
                    );
                    ctx.lineTo(
                        history[i + 1].position.x - cameraTransform.position.x,
                        history[i + 1].position.y - cameraTransform.position.y
                    );
                }
                ctx.strokeStyle = `#FFFFFF20`;
                ctx.stroke();
            });
        });
    }
}
