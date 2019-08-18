import './style.css';
import { Service } from './service-decorator';
import { Injector } from './injector';

@Service()
class Foo {
	doFooStuff() {
		console.log('foo');
	}
}

@Service()
class Bar {
	constructor(public foo: Foo) {}

	doBarStuff() {
		console.log('bar');
	}
}

@Service()
class Foobar {
	constructor(public foo: Foo, public bar: Bar) {}
}

window.onload = () => {
	const foobar = Injector.resolve<Foobar>(Foobar);
	foobar.bar.doBarStuff();
	foobar.foo.doFooStuff();
	foobar.bar.foo.doFooStuff();
};
