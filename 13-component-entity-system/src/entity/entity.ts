import { IComponent, IComponentType } from '../components/component';

export interface IEntity {
    components: { [tag: string]: IComponent };
    componentClasses: {
        [tag: string]: IComponentType<IComponent>;
    };
}
