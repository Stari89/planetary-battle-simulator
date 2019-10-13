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
	constructor(private entityContainer: EntityContainer, private entityProvider: EntityProvider) {}

	public onBeforeUpdate(loopInfo: ILoopInfo) {
		this.entityContainer.entities.forEach(entity => {
			if (
				this.entityProvider.hasComponent(entity, TransformComponent) &&
				this.entityProvider.hasComponent(entity, GravityAffectedComponent)
			) {
				const gravityAffectedComponent = this.entityProvider.getComponent(entity, GravityAffectedComponent);
				gravityAffectedComponent.preUpdatedPosition = gravityAffectedComponent.position;
			}
		});
	}

	public onUpdate(loopInfo: ILoopInfo) {
		this.entityContainer.entities.forEach(entity => {
			if (
				this.entityProvider.hasComponent(entity, TransformComponent) &&
				this.entityProvider.hasComponent(entity, GravityAffectedComponent)
			) {
				const gravityAffectedComponent = this.entityProvider.getComponent(entity, GravityAffectedComponent);
				const transformComponent = this.entityProvider.getComponent(entity, TransformComponent);

				const delta = gravityAffectedComponent.speed.scale(loopInfo.dt / 1000);
				transformComponent.position = transformComponent.position.add(delta);
			}
		});
	}
}
