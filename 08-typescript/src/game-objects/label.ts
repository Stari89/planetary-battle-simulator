import GameObject from "./game-object";
import { LoopInfo } from "../managers/game-loop-manager";
import CanvasManager from "../managers/canvas-manager";
import GameStateManager, { GameStates } from "../managers/game-state-manager";

export default class Label implements GameObject {
	// Fields
	public canvasManager: CanvasManager;
	public gameStateManager: GameStateManager;
	private updateFrequency: number;
	private renderFrequency: number;

	// Public
	public init(): void {
		this.updateFrequency = 0;
		this.renderFrequency = 0;
	}

	public update(loopInfo: LoopInfo): void {
		this.updateFrequency = Math.round(1000 / loopInfo.dtUpdate);
		this.renderFrequency = Math.round(1000 / loopInfo.dtRender);
	}

	public render(): void {
		const currentState = this.gameStateManager.CurrentState === GameStates.Running ? "RUNNING" : "PAUSE";
		const ctx = this.canvasManager.Context;
		ctx.font = "20px Arial";
		ctx.fillStyle = "black";
		ctx.fillText(`Game state: ${currentState}. Use [Esc] to switch`, 10, 40);
		ctx.fillText(`Render w: ${this.canvasManager.RenderSize.x}, h: ${this.canvasManager.RenderSize.y}`, 10, 80);
		ctx.fillText(`View w: ${this.canvasManager.ViewSize.x}, h: ${this.canvasManager.ViewSize.y}`, 10, 120);
		ctx.fillText(`Scale: ${this.canvasManager.Scale}`, 10, 160);
		ctx.fillText(`Update frequency: ${this.updateFrequency}Hz`, 10, 200);
		ctx.fillText(`Render frequency: ${this.renderFrequency}Hz`, 10, 240);
	}
}
