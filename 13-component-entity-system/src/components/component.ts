export interface IComponent {}

export interface IComponentClass<T extends IComponent> {
	readonly name: string;
	readonly tag?: string;
	new (): T;
}
