import { Injectable } from '../ioc/injector';
import { IEntity } from './entity';
import Helpers from '../helpers';
import { IComponentType, IComponent } from '../components/component';
import EntityProvider from '../providers/entity.provider';

@Injectable()
export default class EntityContainer {
    public readonly entities: Map<string, IEntity> = new Map<string, IEntity>();

    constructor(private entityProvider: EntityProvider) {}

    public putEntity(entity: IEntity) {
        this.entities.set(Helpers.generateRandomUniqueId(this.entities), entity);
    }

    public getEntitiesWithComponents(...componentClasses: IComponentType<IComponent>[]): Array<IEntity> {
        const result: Array<IEntity> = [];
        this.entities.forEach(entity => {
            if (componentClasses.every(componentClass => this.entityProvider.hasComponent(entity, componentClass))) {
                result.push(entity);
            }
        });
        return result;
    }
}
