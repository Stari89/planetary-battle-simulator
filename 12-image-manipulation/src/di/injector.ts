import 'reflect-metadata';
import { Type } from './injectable.decorator';

/**
 * Every entry point class instance starts its own dependency container.
 * Injector ensures that all decorated classes in the container are singletons.
 */
export class Injector extends Map {
	public resolve<T>(target: Type<any>): T {
		const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
		const injections = tokens.map((token: Type<any>) => this.resolve<any>(token));

		const classInstance = this.get(target);
		if (classInstance) {
			return classInstance;
		}

		const newClassInstance = new target(...injections);
		this.set(target, newClassInstance);
		return newClassInstance;
	}

	public release(): void {
		for (const value of this.values()) {
			if (typeof value['release'] === 'function') {
				value['release']();
			}
		}

		this.clear();
	}
}
