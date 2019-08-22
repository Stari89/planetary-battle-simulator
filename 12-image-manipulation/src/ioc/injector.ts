import 'reflect-metadata';
import { Type } from './injectable.decorator';
import { ContainerEventEmitter } from './container-event-emitter';
import { LifecycleEvents } from '../lifecycle/lifecycle-events.enum';

/**
 * Every entry point class instance starts its own dependency container.
 * Injector ensures that all decorated classes in the container are singletons.
 */
export class Injector extends Map {
	constructor() {
		super();
		this.emit = this.emit.bind(this);
	}

	public resolve<T>(target: Type<any>): T {
		const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
		const injections = tokens.map((token: Type<any>) => this.resolve<any>(token));

		const classInstance = this.get(target);
		if (classInstance) {
			return classInstance;
		}

		const newClassInstance = new target(...injections);

		if (newClassInstance instanceof ContainerEventEmitter) {
			newClassInstance.emit = this.emit;
		}

		this.set(target, newClassInstance);
		return newClassInstance;
	}

	public release(): void {
		for (const value of this.values()) {
			if (typeof value['onRelease'] === 'function') {
				value['onRelease']();
			}
		}

		this.clear();
	}

	private emit(event: LifecycleEvents, ...params: any): void {
		for (const value of this.values()) {
			if (typeof value[event] === 'function') {
				value[event](...params);
			}
		}
	}
}
