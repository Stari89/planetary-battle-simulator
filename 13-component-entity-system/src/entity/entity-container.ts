import { Injectable } from '../ioc/injector';
import Helpers from '../helpers';
import { IComponentType, IComponent } from '../components/component';
import Entity2 from './entity2';

@Injectable()
export default class EntityContainer {
    public readonly entities: Map<string, Entity2> = new Map<string, Entity2>();

    public putEntity(entity: Entity2) {
        this.entities.set(Helpers.generateRandomUniqueId(this.entities), entity);
    }

    public getEntitiesWithComponents(...componentClasses: IComponentType<IComponent>[]): Array<Entity2> {
        const result: Array<Entity2> = [];
        this.entities.forEach(entity => {
            if (entity.has(...componentClasses)) {
                result.push(entity);
            }
        });
        return result;
    }
}
