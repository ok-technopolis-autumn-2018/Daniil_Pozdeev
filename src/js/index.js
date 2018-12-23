import '../styles/default.scss';

document.addEventListener('DOMContentLoaded', function () {

var input = document.querySelector('.todo-creator_text-input');
var list = document.querySelector('.todos-list');

var todoMain = new TodoMain();
var addTodos = new AddTodos(input);
var todoList = new TodoList(list);
var todoActionsBar = new TodoActionsBar();

function EventableConstructor() {
    this._subs = {
        listeners: new Map(),
    };
}

EventableConstructor.prototype._initEventable = function () {

};

EventableConstructor.prototype.on = function (eventName, handler, ctx) {
    const typedListeners = this._subs.listeners.get(eventName) || [];
    typedListeners.push(handler);
    this._subs.set(eventName, typedListeners);
};

EventableConstructor.prototype.off = function (eventName, handler, ctx) {
    const typedListeners = this._subs.listeners.get(eventName) || [];
    var itemIndex = typedListeners.indexOf(handler);
    if (itemIndex !== -1) {
        this._subs.splice(itemIndex, 1);
    }
};

EventableConstructor.prototype.trigger = function (eventName, data) {
    const typedListeners = this._subs.listeners.get(eventName) || [];
    for (let handler of typedListeners) {
        handler(data);
    }
};

function TodoMain() {

}

TodoMain.prototype.showFullInterface = function () {

};

TodoMain.prototype.hideFullInterface = function () {

};

function AddTodos(root) {
    this._input = root.querySelector('.todo-creator_text-input');
    this._form = root.querySelector('.todo-creator');

    this._input.addEventListener('keydown', this);
    this._form.addEventListener('submit', this);

    this._initEventable();
}

AddTodos.prototype = new EventableConstructor();

AddTodos.prototype.useCurrentText = function () {
    var text = this._input.value.trim();
    if (text) {
        this._input.value = '';
        this.trigger('add', text);
    }
};

AddTodos.prototype.handleEvent = function (e) {
    switch (e.type) {
        case 'keydown':
            if (e.keyCode === 13) {
                this.useCurrentText();
            }
            break;
        case 'submit':
            e.preventDefault();
            break;
    }

};

AddTodos.prototype.addItem = function (text) {
    list.insertAdjacentHTML(
        'beforeend',
        this.resolveTemplate(
            'listItem',
            {
                text: text
            }
        )
    );

    var removeItems = list.querySelectorAll('.todos-list_item_remove');
    removeItems[removeItems.length - 1].addEventListener(
        'click',
        function (e) {
            e.preventDefault();
            var item = this.closest('.todos-list_item');
            item.parentNode.removeChild(item);
        }
    );
};


function resolveTemplate(templateId, templateData) {
    return document.getElementById(templateId).innerHTML.replace(
        /{([^{}]*)}/g,
        function (foundSubstring, dataKey) {
            var result = templateData[dataKey];

            return typeof result === 'string'
            || typeof result === 'number'
                ? result
                : foundSubstring;
        }
    );
}

function ListItem(text) {
    list.insertAdjacentHTML(
        'beforeend',
        resolveTemplate(
            'listItem',
            {
                text: text
            }
        )
    );

    var removeItems = list.querySelectorAll('.todos-list_item_remove');
    removeItems[removeItems.length - 1].addEventListener(
        'click',
        function (e) {
            e.preventDefault();
            var item = this.closest('.todos-list_item');
            item.parentNode.removeChild(item);
        }
    );
    this._initEventable();
}

ListItem.prototype.getRoot = function () {
    return this._root;
};

ListItem.prototype.remove = function () {
    this.trigger('remove', this);
};

ListItem.prototype.handleEvent = function () {
    this.remove();
};

function TodoList(root) {
    this._root = root;
    this._items = [];
    this._initEventable();
}

TodoList.prototype = new EventableConstructor();

TodoList.prototype.createItem = function (text) {
    var item = new ListItem(text);
    this._items.push(item);
    this._root.appendChild(item.getRoot());
    item.on('remove', this._onItemRemove, this);
};

TodoList.prototype._onItemRemove = function (item) {
    var itemIndex = this._items.indexOf(item);
    if (itemIndex !== -1) {
        this._root.removeChild(item.getRoot());
        this._items.splice(itemIndex, 1);
    }
};

TodoList.prototype.markAsReadyAll = function () {

};

TodoList.prototype.getItemsCount = function () {

};

TodoList.prototype.removeCompletedItems = function () {

};

TodoList.prototype.setFilter = function (filterId) {

};

function TodoActionsBar() {

}

TodoActionsBar.prototype.setItemCount = function (itemCount) {

};

function itemsCountWatcher() {
    var itemsCount = todoList.getItemsCount();

    if (itemsCount !== 0) {
        todoMain.showFullInterface();
    } else {
        todoMain.hideFullInterface();
    }

    todoActionsBar.setItemCount(itemsCount);
}

addTodos
    .on('add',
        function (todoData) {
            todoList.createItem(todoData);
        }
    );
addTodos
    .on('markAsReadyAll',
        function () {
            todoList.markAsReadyAll();
        }
    );

todoList
    .on('itemAdd', itemsCountWatcher(), this)
    .on('itemDelete', itemsCountWatcher());

todoActionsBar
    .on('clearCompleted',
        function () {
            todoList.removeCompletedItems();
        }
    )
    .on('filterSelected',
        function (filterId) {
            todoList.setFilter(filterId);
        }
    );


});

console.log('init');