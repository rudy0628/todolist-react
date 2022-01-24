import React from 'react';

const TodoContext = React.createContext({
	todoState: {},
	addItem: (todo, date) => {},
	updateItem: (todo, date, id) => {},
	deleteItem: id => {},
});

export default TodoContext;
