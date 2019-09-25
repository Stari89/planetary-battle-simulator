import './style.css';
import { Injectable } from './injectable-decorator';
import { Injector } from './injector';

@Injectable()
class Foo {
    doFooStuff() {
        console.log('foo');
    }
}

@Injectable()
class Bar {
    constructor(public foo: Foo) {}

    doBarStuff() {
        console.log('bar');
    }
}

@Injectable()
class Foobar {
    constructor(public foo: Foo, public bar: Bar) {}
}

window.onload = () => {
    const foobar = Injector.resolve<Foobar>(Foobar);
    foobar.bar.doBarStuff();
    foobar.foo.doFooStuff();
    foobar.bar.foo.doFooStuff();
};
