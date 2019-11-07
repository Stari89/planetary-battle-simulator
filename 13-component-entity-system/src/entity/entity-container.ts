import { Injectable } from '../ioc/injector';
import Helpers from '../helpers';
import { IComponentType, IComponent } from '../components/component';
import Entity from './entity';

@Injectable()
export default class EntityContainer {
    public readonly entities: Map<string, Entity> = new Map<string, Entity>();

    public putEntity(entity: Entity) {
        this.entities.set(Helpers.generateRandomUniqueId(this.entities), entity);
    }

    public getEntitiesWithComponents(...componentClasses: IComponentType<IComponent>[]): Array<Entity> {
        const result: Array<Entity> = [];
        this.entities.forEach(entity => {
            if (entity.has(...componentClasses)) {
                result.push(entity);
            }
        });
        return result;
    }
}
