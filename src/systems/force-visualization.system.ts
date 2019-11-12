import { Injectable } from '../ioc/injector';
import EntityContainer from '../entity/entity-container';
import { OnRender } from '../util/lifecycle';
import CanvasProvider from '../providers/canvas.provider';
import { ILoopInfo } from '../providers/game-loop.provider';
import TransformComponent from '../components/transform.component';
import GravityAffectedComponent from '../components/gravity-affected.component';

@Injectable()
export default class ForceVisualizationSystem implements OnRender {
    constructor(private entityContainer: EntityContainer, private canvasProvider: CanvasProvider) {}

    onRender(loopInfo: ILoopInfo) {
        this.entityContainer.getEntitiesWithComponents(TransformComponent, GravityAffectedComponent).forEach(entity => {
            const gravityAffectedComponent = entity.get(GravityAffectedComponent);
            const transformComponent = entity.get(TransformComponent);

            const speedVector = transformComponent.position.add(gravityAffectedComponent.velocity.scale(1000));
            const netAccelerationVector = transformComponent.position.add(
                gravityAffectedComponent.netAcceleration.scale(1000000)
            );
            const ctx = this.canvasProvider.Context;

            ctx.beginPath();
            ctx.moveTo(transformComponent.position.x, transformComponent.position.y);
            ctx.lineTo(speedVector.x, speedVector.y);
            ctx.strokeStyle = '#00FF00';
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(transformComponent.position.x, transformComponent.position.y);
            ctx.lineTo(netAccelerationVector.x, netAccelerationVector.y);
            ctx.strokeStyle = '#FF0000';
            ctx.stroke();
        });
    }
}
