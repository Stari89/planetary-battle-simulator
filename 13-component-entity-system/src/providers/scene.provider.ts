import { Injectable } from '../ioc/injector';
import { OnRun, OnBeforeUpdate } from '../lifecycle';
import EntityContainer from '../entity/entity-container';
import { IEntity } from '../entity/entity';
import SceneFactory from '../factories/scene.factory';

export enum Scenes {
	Splash,
	Simulation
}

@Injectable()
export default class SceneProvider implements OnRun, OnBeforeUpdate {
	private activeScene: Scenes;
	private beforeNextUpdateSwitchTo: Scenes;
	private nextSceneEntities: Array<IEntity>;

	constructor(private sceneFactory: SceneFactory, private entityContainer: EntityContainer) {
		this.loadSplashScene = this.loadSplashScene.bind(this);
		this.loadSimulationScene = this.loadSimulationScene.bind(this);
		this.switchScene = this.switchScene.bind(this);
		this.onBeforeUpdate = this.onBeforeUpdate.bind(this);
	}

	onRun() {
		this.loadSplashScene();
		setTimeout(this.loadSimulationScene, 500);
	}

	onBeforeUpdate() {
		if (this.activeScene === this.beforeNextUpdateSwitchTo) {
			return;
		}

		this.switchScene(this.nextSceneEntities);
		this.activeScene = this.beforeNextUpdateSwitchTo;
	}

	public loadSplashScene() {
		this.nextSceneEntities = this.sceneFactory.generateSplashScene();
		this.beforeNextUpdateSwitchTo = Scenes.Splash;
	}

	public loadSimulationScene() {
		this.nextSceneEntities = this.sceneFactory.generateSimulationScene();
		setTimeout(() => {
			this.beforeNextUpdateSwitchTo = Scenes.Simulation;
		}, 500);
	}

	private switchScene(entities: Array<IEntity>) {
		this.entityContainer.entities.clear();
		entities.forEach(entity => {
			this.entityContainer.putEntity(entity);
		});
	}
}
