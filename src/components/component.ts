export interface IComponent {}

export interface IComponentType<T extends IComponent> {
    readonly name: string;
    new (): T;
}
