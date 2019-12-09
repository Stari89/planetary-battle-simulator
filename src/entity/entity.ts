import { IComponent, IComponentType } from '../components/component';

export default class Entity {
    components: { [tag: string]: IComponent };
    children: Entity[];

    constructor() {
        this.components = {};
        this.children = [];
    }

    public get<T extends IComponent>(componentClass: IComponentType<T>): T {
        const tag = componentClass.name;
        const component = this.components[tag];
        if (!component) {
            throw new Error(`Cannot get component "${tag}" from entity.`);
        }
        if (!this.cast(component, componentClass)) {
            throw new Error(
                `There are multiple classes with the same tag or name "${tag}".\nAdd a different property "tag" to one of them.`
            );
        }
        return component;
    }

    public has(...componentClasses: IComponentType<IComponent>[]): boolean {
        if (!componentClasses || componentClasses.length === 0) {
            throw new Error(`No component classes provided!`);
        }
        return componentClasses.every(componentClass => {
            const tag = componentClass.name;
            const component = this.components[tag];
            if (!component) return false;
            if (!this.cast(component, componentClass)) {
                throw new Error(
                    `There are multiple classes with the same tag or name "${tag}".\nAdd a different property "tag" to one of them.`
                );
            }
            return true;
        });
    }

    public push<T extends IComponent>(component: T) {
        const tag = component.constructor.name;
        if (this.components[tag]) {
            delete this.components[tag];
        }
        this.components[tag] = component;
    }

    private cast<T extends IComponent>(
        component: IComponent | undefined | null,
        componentClass: IComponentType<T>
    ): component is T {
        return !!(component && component instanceof componentClass);
    }
}
