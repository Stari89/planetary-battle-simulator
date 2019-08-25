import { Type } from '../ioc/util';
import { Injectable, Injector, Service } from '../ioc/injector';
import Label from './label';

export default class GameObject {}

@Service()
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
