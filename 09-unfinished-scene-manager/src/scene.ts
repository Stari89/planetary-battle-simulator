import GameObject from "./game-object";
import Event from "./event";

export default class Scene {
	// Fields
	public id: string;
	public gameObjects: Array<GameObject>;
	public onUnloaded: (data: string) => void;

	private inited: boolean;
	private loaded: boolean;

	// Properties
	get Inited(): boolean {
		return this.inited;
	}
	get Loaded(): boolean {
		return this.loaded;
	}

	// Constructor
	constructor() {}

	// Public
	public init(): void {
		this.inited = true;
	}

	public load(): void {
		this.loaded = true;
	}

	public unload(): void {
		this.loaded = false;
		if (this.onUnloaded) {
			this.onUnloaded(this.id);
		}
	}

	public switchScene(id: string): void {}
}
