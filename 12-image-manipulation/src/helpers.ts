export default class Helpers {
	public static generateRandomString(length: number): string {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return result;
	}

	public static generateRandomUniqueId(map: Map<string, any>): string {
		let id = '';
		do {
			id += Helpers.generateRandomString(1);
		} while (!!map.get(id));
		return id;
	}
}
