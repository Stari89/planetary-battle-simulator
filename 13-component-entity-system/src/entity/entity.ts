import { IComponent, IComponentClass } from '../components/component';

export interface IEntity {
	components: { [tag: string]: IComponent };
	componentClasses: {
		[tag: string]: IComponentClass<IComponent>;
	};
}
