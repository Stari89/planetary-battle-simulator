import { Injectable } from '../ioc/injector';
import EntityContainer from '../entity/entity-container';
import { OnUpdate, OnBeforeUpdate } from '../util/lifecycle';
import { ILoopInfo } from '../providers/game-loop.provider';
import TransformComponent from '../components/transform.component';
import GravityAffectedComponent from '../components/gravity-affected.component';
import Vector2 from '../util/vector-2';
import CanvasProvider from '../providers/canvas.provider';

@Injectable()
export default class GravitySystem implements OnBeforeUpdate, OnUpdate {
    private readonly G: number = 0.00000000075;

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

                    const distance = otherGravityAffectedComponent.preUpdatedPosition.subtract(
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
        });
    }
}
