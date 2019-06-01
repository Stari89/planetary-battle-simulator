export default class Event<T> {
	private name: string;
	private callbacks: Array<any>;

	public get Callbacks(): Array<any> {
		return this.callbacks;
	}

	constructor(name: string) {
		this.name = name;
		this.callbacks = [];
	}

	public register(callback: Function): void {
		this.callbacks.push(callback);
	}

	public unregister(callback: Function): void {
		const index = this.callbacks.indexOf(callback);
		if (index > -1) {
			this.callbacks.splice(index, 1);
		}
	}

	public emit(data: T): void {
		const callbacks = this.callbacks.slice(0);
		callbacks.forEach(callback => {
			callback(data);
		});
	}
}
