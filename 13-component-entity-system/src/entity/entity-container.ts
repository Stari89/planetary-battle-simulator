import { Injectable } from '../ioc/injector';
import { IEntity } from './entity';
import Helpers from '../helpers';

@Injectable()
export default class EntityContainer {
	public readonly entities: Map<string, IEntity> = new Map<string, IEntity>();

	public putEntity(entity: IEntity) {
		this.entities.set(Helpers.generateRandomUniqueId(this.entities), entity);
	}
}
