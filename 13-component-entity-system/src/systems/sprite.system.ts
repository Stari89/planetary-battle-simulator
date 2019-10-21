import { Injectable } from '../ioc/injector';
import EntityContainer from '../entity/entity-container';
import EntityProvider from '../entity/entity.provider';
import CanvasProvider from '../providers/canvas.provider';
import { ILoopInfo } from '../providers/game-loop.provider';
import { OnRender } from '../lifecycle';
import TransformComponent from '../components/transform.component';
import SpriteComponent from '../components/sprite.component';

@Injectable()
export default class SpriteSystem implements OnRender {
	constructor(
		private entityContainer: EntityContainer,
		private entityProvider: EntityProvider,
		private canvasProvider: CanvasProvider
	) {}

	public onRender(loopInfo: ILoopInfo) {
		this.entityContainer.entities.forEach(entity => {
			if (
				this.entityProvider.hasComponent(entity, TransformComponent) &&
				this.entityProvider.hasComponent(entity, SpriteComponent)
			) {
				const transformComponent = this.entityProvider.getComponent(entity, TransformComponent);
				const spriteComponent = this.entityProvider.getComponent(entity, SpriteComponent);
				this.canvasProvider.Context.drawImage(
					spriteComponent.image,
					spriteComponent.cutoutPosition.x,
					spriteComponent.cutoutPosition.y,
					spriteComponent.cutoutSize.x,
					spriteComponent.cutoutSize.y,
					transformComponent.position.x -
						(spriteComponent.offset.x * transformComponent.scale.x) / spriteComponent.cutoutSize.x,
					transformComponent.position.y -
						(spriteComponent.offset.y * transformComponent.scale.y) / spriteComponent.cutoutSize.y,
					transformComponent.scale.x,
					transformComponent.scale.y
				);
			}
		});
	}
}
