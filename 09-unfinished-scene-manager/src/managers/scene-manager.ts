import Scene from "../scene";
import { GameScene, LoadingScene, MainMenuScene, OptionsMenuScene } from "../game-scenes/index";

export default class SceneManager {
	// Fields
	private gameScenes: Array<Scene>;

	// Constructor
	constructor() {
		this.gameScenes = [new GameScene(), new LoadingScene(), new MainMenuScene(), new OptionsMenuScene()];
	}

	// Public
	public init(): void {
		this.gameScenes.forEach(scene => {
			scene.onUnloaded = this.someCallback;
			scene.init();
		});
		this.loadScene("loading.scene");
		this.loadScene("main-menu.scene");
	}

	// Private
	private loadScene(id: string): void {
		this.gameScenes
			.filter(scene => scene.id !== id && scene.Loaded)
			.forEach(scene => {
				scene.unload();
			});

		this.gameScenes
			.filter(scene => scene.id === id)
			.forEach(scene => {
				scene.load();
			});
	}

	private someCallback(data: string) {
		console.log(`Scene unloaded: ${data}!`);
	}
}
