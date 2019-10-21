import { Injectable } from '../ioc/injector';
import EntityContainer from '../entity/entity-container';
import EntityProvider from '../entity/entity.provider';
import { OnUpdate, OnBeforeUpdate } from '../lifecycle';
import { ILoopInfo } from '../providers/game-loop.provider';
import TransformComponent from '../components/transform.component';
import GravityAffectedComponent from '../components/gravity-affected.component';
import Vector2 from '../vector-2';

@Injectable()
export default class GravitySystem implements OnBeforeUpdate, OnUpdate {
	private readonly G: number = 0.0001;

	constructor(private entityContainer: EntityContainer, private entityProvider: EntityProvider) {}

	public onBeforeUpdate(loopInfo: ILoopInfo) {
		this.entityContainer.entities.forEach(entity => {
			if (
				this.entityProvider.hasComponent(entity, TransformComponent) &&
				this.entityProvider.hasComponent(entity, GravityAffectedComponent)
			) {
				const gravityAffectedComponent = this.entityProvider.getComponent(entity, GravityAffectedComponent);
				const transformComponent = this.entityProvider.getComponent(entity, TransformComponent);

				gravityAffectedComponent.preUpdatedPosition = transformComponent.position;
			}
		});
	}

	public onUpdate(loopInfo: ILoopInfo) {
		this.entityContainer.entities.forEach(planet => {
			if (
				this.entityProvider.hasComponent(planet, TransformComponent) &&
				this.entityProvider.hasComponent(planet, GravityAffectedComponent)
			) {
				const gravityAffectedComponent = this.entityProvider.getComponent(planet, GravityAffectedComponent);
				const transformComponent = this.entityProvider.getComponent(planet, TransformComponent);

				gravityAffectedComponent.netAcceleration = new Vector2(0, 0);
				this.entityContainer.entities.forEach(otherPlanet => {
					if (
						planet !== otherPlanet &&
						this.entityProvider.hasComponent(otherPlanet, TransformComponent) &&
						this.entityProvider.hasComponent(otherPlanet, GravityAffectedComponent)
					) {
						const otherGravityAffectedComponent = this.entityProvider.getComponent(
							otherPlanet,
							GravityAffectedComponent
						);

						const distance = otherGravityAffectedComponent.preUpdatedPosition.substract(
							gravityAffectedComponent.preUpdatedPosition
						);
						const accelerationMagnitude =
							(otherGravityAffectedComponent.mass * this.G) / Math.pow(distance.magnitude, 2);
						const acceleration = distance.direction.scale(accelerationMagnitude);
						gravityAffectedComponent.netAcceleration = gravityAffectedComponent.netAcceleration.add(
							acceleration
						);
					}
				});

				const deltaVelocity = gravityAffectedComponent.netAcceleration.scale(loopInfo.dt);
				gravityAffectedComponent.velocity = gravityAffectedComponent.velocity.add(deltaVelocity);

				const deltaPosition = gravityAffectedComponent.velocity.scale(loopInfo.dt);
				transformComponent.position = transformComponent.position.add(deltaPosition);
			}
		});
	}
}
