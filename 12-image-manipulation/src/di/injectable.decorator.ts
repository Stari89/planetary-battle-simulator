export interface Type<T> {
	new (...args: any[]): T;
}

/**
 * Decorator function to annotate classes which can inject another ones in constructors.
 * A decorator is required to be able to get Reflect's metadata.
 */
export const Injectable = (): ((target: Type<any>) => void) => {
	return (target: Type<any>) => {
		// do something if needed
	};
};
