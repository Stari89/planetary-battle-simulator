import { Injectable } from '../ioc/injector';
import { OnUpdate } from '../lifecycle';
import GameObjectsProvider from '../providers/game-objects.provider';
import InputProvider from '../providers/input.provider';
import { ILoopInfo } from '../providers/game-loop.provider';
import BaseEntity, { Tags } from '../entities/base.entity';
import TransformComponent from '../components/transform.component';
import ManipulatedComponent from '../components/manipulated.component';

@Injectable()
export default class ManipulationSystem implements OnUpdate {
	constructor(private gameObjectsProvider: GameObjectsProvider, private inputProvider: InputProvider) {}

	public onUpdate(loopInfo: ILoopInfo) {
		this.gameObjectsProvider.gameObjectItems.forEach((entity: BaseEntity) => {
			const transform: TransformComponent = entity.getProperty(Tags.Transform);
			const manipulated: ManipulatedComponent = entity.getProperty(Tags.Manipulated);
			if (!transform || !manipulated) return;

			const scaleDelta = (this.inputProvider.MouseState.scrollDelta.y / 150) * 0.25;
			transform.scale = transform.scale.scale(1 - scaleDelta);
			if (transform.scale.x < 50) {
				transform.scale = transform.scale.scale(50 / transform.scale.x);
			}
		});
	}
}
