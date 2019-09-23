import { Type } from '../ioc/util';
import { Injectable, Injector, System } from '../ioc/injector';

export default class GameObject {}

@System()
@Injectable()
export class GameObjectFactory {
	constructor() {}

	public constructGameObject<T>(target: Type<any>): T {
		if (!(target.prototype instanceof GameObject)) {
			throw `Target "${target}" must extend from GameObject`;
		}
		return Injector.instance.resolve<T>(target);
	}
}
