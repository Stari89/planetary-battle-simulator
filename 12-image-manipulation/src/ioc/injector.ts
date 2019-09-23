import 'reflect-metadata';
import { Type } from './util';
import { Container } from './container';

export class Injector {
	private static _instance: Injector;

	private constructor() {}

	public static get instance(): Injector {
		if (!Injector._instance) {
			Injector._instance = new Injector();
		}
		return this._instance;
	}

	public resolve<T>(target: Type<any>): T {
		const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
		const injections: Array<any> = tokens.map((token: Type<any>) => this.resolve<any>(token));
		return Container.instance.getClassInstance(target, injections);
	}
}

export const Injectable = (): ((target: Type<any>) => void) => {
	return (target: Type<any>) => {};
};

export const Component = (tag: string) => {
	return <T extends { new (...args: any[]): {} }>(constructor: T) => {
		return class extends constructor {
			tag = tag;
		};
	};
};

export const Entity = () => {
	return <T extends { new (...args: any[]): any }>(constructor: T) => {
		return class extends constructor {
			private tags: string[];
			get Tags(): string[] {
				if (!!this.tags) {
					return this.tags;
				}
				const tags: string[] = [];
				const keys = Object.keys(this);
				keys.forEach(key => {
					const tag = this[key].tag;
					if (!!tag) {
						tags.push(tag);
					}
				});
				this.tags = tags;
				return tags;
			}
		};
	};
};

export const System = () => {
	return (constructor: Function) => {
		constructor.prototype.isIocService = true;
	};
};
