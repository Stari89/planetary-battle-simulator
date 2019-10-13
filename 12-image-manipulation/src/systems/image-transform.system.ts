import { Injectable } from '../ioc/injector';
import { OnRender } from '../lifecycle';
import GameObjectsProvider from '../providers/game-objects.provider';
import CanvasProvider from '../providers/canvas.provider';
import { ILoopInfo } from '../providers/game-loop.provider';
import BaseEntity, { Tags } from '../entities/base.entity';
import TransformComponent from '../components/transform.component';
import ImageComponent from '../components/image.component';

@Injectable()
export default class ImageTransformSystem implements OnRender {
	constructor(private gameObjectsManager: GameObjectsProvider, private canvasManager: CanvasProvider) {}

	public onRender(loopInfo: ILoopInfo) {
		this.gameObjectsManager.gameObjectItems.forEach((entity: BaseEntity) => {
			const transform: TransformComponent = entity.getProperty(Tags.Transform);
			const image: ImageComponent = entity.getProperty(Tags.Image);
			if (!transform || !image) return;
			const ctx = this.canvasManager.Context;
			ctx.drawImage(
				image.imageElement,
				transform.position.x,
				transform.position.y,
				transform.scale.x,
				transform.scale.y
			);
		});
	}
}
