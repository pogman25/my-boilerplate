import { sum } from './sum';

test('add 1 to 2 be 3', () => {
    expect(sum(1, 2)).toBe(3);
})

export class LocalStorageMock {

    private store = {}

    clear() {
        this.store = {}
    }

    getItem(key: string) {
        return this.store[key] || null
    }

    setItem(key: string, value: string) {
        this.store[key] = value
    }

    removeItem(key: string) {
        delete this.store[key]
    }
}

