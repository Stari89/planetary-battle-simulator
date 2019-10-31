import { Injectable } from '../ioc/injector';
import { OnUpdate } from '../lifecycle';
import { ILoopInfo } from '../providers/game-loop.provider';
import EntityContainer from '../entity/entity-container';
import EntityProvider from '../providers/entity.provider';
import TransformComponent from '../components/transform.component';
import CameraComponent from '../components/camera.component';
import Vector2 from '../vector-2';

@Injectable()
export default class CameraSystem implements OnUpdate {
	constructor(private entityContainer: EntityContainer, private entityProvider: EntityProvider) {}

	public onUpdate(loopInfo: ILoopInfo) {
		this.entityContainer.getEntitiesWithComponents(TransformComponent, CameraComponent).forEach(entity => {
			const cameraComponent = this.entityProvider.getComponent(entity, CameraComponent);
			const transformComponent = this.entityProvider.getComponent(entity, TransformComponent);

			transformComponent.position = transformComponent.position.add(new Vector2(loopInfo.dt / 10, 0));
		});
	}
}
