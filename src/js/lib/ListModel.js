import { Eventable } from './Eventable';


class ArrayWatchWrapper extends Eventable {

    constructor() {
        super();
        this._data = [];
    }

    add(item) {
        this._data.push(item);
        this.trigger('added', {
            item: item,
            index: this._data.length - 1,
        });
    }

    remove(item) {
        const index = this._data.findIndex(arrayItem => arrayItem === item);
        this._data.splice(index, 1);
        this.trigger('remove', {
            item: item,
            index: index
        });
    }

}