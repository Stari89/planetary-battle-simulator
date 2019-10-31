import { Injectable } from '../ioc/injector';
import { OnRender } from '../lifecycle';
import EntityContainer from '../entity/entity-container';
import EntityProvider from '../providers/entity.provider';
import CanvasProvider from '../providers/canvas.provider';
import { ILoopInfo } from '../providers/game-loop.provider';
import TransformComponent from '../components/transform.component';
import StarfieldComponent, { Luminosity } from '../components/starfield.component';
import CameraComponent from '../components/camera.component';

@Injectable()
export default class StarfieldSystem implements OnRender {
	constructor(
		private entityContainer: EntityContainer,
		private entityProvider: EntityProvider,
		private canvasProvider: CanvasProvider
	) {}

	public onRender(loopInfo: ILoopInfo) {
		this.entityContainer.getEntitiesWithComponents(TransformComponent, StarfieldComponent).forEach(entity => {
			const transformComponent = this.entityProvider.getComponent(entity, TransformComponent);
			const starfieldComponent = this.entityProvider.getComponent(entity, StarfieldComponent);

			const paralaxFactor =
				1 /
				(starfieldComponent.luminosity === Luminosity.Bright
					? 2
					: starfieldComponent.luminosity === Luminosity.Normal
					? 4
					: 8);

			this.entityContainer.getEntitiesWithComponents(CameraComponent, TransformComponent).forEach(camera => {
				const cameraTransform = this.entityProvider.getComponent(camera, TransformComponent);

				this.canvasProvider.Context.drawImage(
					starfieldComponent.image,
					starfieldComponent.cutoutPosition.x,
					starfieldComponent.cutoutPosition.y,
					starfieldComponent.cutoutSize.x,
					starfieldComponent.cutoutSize.y,
					transformComponent.position.x -
						(starfieldComponent.offset.x * transformComponent.scale.x) / starfieldComponent.cutoutSize.x -
						cameraTransform.position.x * paralaxFactor,
					transformComponent.position.y -
						(starfieldComponent.offset.y * transformComponent.scale.y) / starfieldComponent.cutoutSize.y -
						cameraTransform.position.y * paralaxFactor,
					transformComponent.scale.x,
					transformComponent.scale.y
				);
			});
		});
	}
}
