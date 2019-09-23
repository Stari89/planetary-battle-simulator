export default class Entity {
	constructor(private tags: ITag[]) {}
	public get Tags(): ITag[] {
		return this.tags;
	}
	public getProperty(tagName: string) {
		const tag: ITag = this.tags.find(tag => tag.name === tagName);
		if (!tag || !tag.property) {
			return null;
		}
		return getEntityProperty(this, tag.property);
	}
}

export function getEntityProperty(obj: any, key: string) {
	return obj[key];
}

export interface ITag {
	name: string;
	property: string;
}
