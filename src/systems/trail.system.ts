import { Injectable } from '../ioc/injector';
import { OnUpdate } from '../util/lifecycle';
import EntityContainer from '../entity/entity-container';
import { ILoopInfo } from '../providers/game-loop.provider';
import GravityAffectedComponent from '../components/gravity-affected.component';
import TransformComponent from '../components/transform.component';
import TrailComponent from '../components/trail.component';
import PolygonComponent from '../components/polygon.component';

@Injectable()
export default class TrailSystem implements OnUpdate {
    constructor(private entityContainer: EntityContainer) {}

    public onUpdate(loopInfo: ILoopInfo): void {
        this.entityContainer
            .getEntitiesWithComponents(GravityAffectedComponent, TransformComponent)
            .forEach(gravityAffectedComponent => {
                gravityAffectedComponent.children.forEach(trailEntity => {
                    if (!trailEntity.has(TrailComponent, PolygonComponent, TransformComponent)) {
                        return;
                    }

                    const trail = trailEntity.get(TrailComponent);
                    const polygon = trailEntity.get(PolygonComponent);
                    const gravityTransform = gravityAffectedComponent.get(TransformComponent);

                    trail.positionHistory.push({ t: loopInfo.t, position: gravityTransform.position });
                    trail.positionHistory = trail.positionHistory.filter(log => log.t > loopInfo.t - 3000);

                    polygon.points = trail.positionHistory.map(log => log.position);
                });
            });
    }
}
