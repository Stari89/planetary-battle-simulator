import { Injectable } from '../ioc/injector';
import { IEntity } from '../entity/entity';
import { IComponent, IComponentClass } from '../components/component';

@Injectable()
export default class EntityProvider {
	public generateEntity(...componentClasses: IComponentClass<IComponent>[]): IEntity {
		let entity: IEntity = { components: {}, componentClasses: {} };
		if (!componentClasses || componentClasses.length === 0) {
			return entity;
		}
		componentClasses.forEach(componentClass => {
			this.putComponent(entity, componentClass);
		});
		return entity;
	}

	public listComponents(entity: IEntity): Array<IComponent> {
		return Object.keys(entity.components).map(i => entity.components[i]);
	}

	public listComponentWithTypes(entity: IEntity) {
		return Object.keys(entity.components).map(i => ({
			component: entity.components[i],
			type: entity.componentClasses[i]
		}));
	}

	public listComponentsWithTags(entity: IEntity) {
		return Object.keys(entity.components).map(tag => Object.freeze({ tag, component: entity.components[tag] }));
	}

	public hasComponent<T extends IComponent>(entity: IEntity, componentClass: IComponentClass<T>): boolean {
		const tag = componentClass.tag || componentClass.name;
		const component = entity.components[tag];
		if (!component) return false;
		if (!this.cast(component, componentClass)) {
			throw new Error(
				`There are multiple classes with the same tag or name "${tag}".\nAdd a different property "tag" to one of them.`
			);
		}
		return true;
	}

	public getComponent<T extends IComponent>(entity: IEntity, componentClass: IComponentClass<T>): T {
		const tag = componentClass.tag || componentClass.name;
		const component = entity.components[tag];
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

	public putComponent<T extends IComponent>(entity: IEntity, componentClass: IComponentClass<T>): T {
		const tag = componentClass.tag || componentClass.name;
		const component = entity.components[tag];
		if (component) {
			if (!this.cast(component, componentClass)) {
				throw new Error(
					`There are multiple classes with the same tag or name "${tag}".\nAdd a different property "tag" to one of them.`
				);
			}
			delete entity.components[tag];
			delete entity.componentClasses[tag];
		}
		const newComponent = new componentClass();
		entity.components[tag] = newComponent;
		entity.componentClasses[tag] = componentClass;
		return newComponent;
	}

	public removeComponent<T extends IComponent>(entity: IEntity, componentClass: IComponentClass<T>) {
		const tag = componentClass.tag || componentClass.name;
		const component = entity.components[tag];
		if (!component) {
			throw new Error(`Component of tag "${tag}".\nDoes not exists.`);
		}
		if (!this.cast(component, componentClass)) {
			throw new Error(
				`There are multiple classes with the same tag or name "${tag}".\nAdd a different property "tag" to one of them.`
			);
		}
		delete entity.components[tag];
	}

	private cast<T extends IComponent>(
		component: IComponent | undefined | null,
		componentClass: IComponentClass<T>
	): component is T {
		return !!(component && component instanceof componentClass);
	}
}
