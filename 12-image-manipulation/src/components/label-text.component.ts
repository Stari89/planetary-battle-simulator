import { Component } from '../ioc/injector';

@Component('label-text')
export default class LabelTextComponent {
	constructor(public text: string, public color: string, public font: string) {}
}
