import { Injectable } from '../ioc/injector';
import { IComponentType, IComponent } from '../components/component';
import Entity from './entity';

@Injectable()
export default class EntityContainer {
    private entities: Array<Entity> = [];

    public push(entity: Entity) {
        this.entities.push(entity);
    }

    public clear() {
        this.entities = [];
    }

    public getEntitiesWithComponents(...componentClasses: IComponentType<IComponent>[]): Array<Entity> {
        return this.entities.filter(entity => entity.has(...componentClasses));
    }
}
