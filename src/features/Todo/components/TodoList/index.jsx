import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

TodoList.propTypes = {
    todoList: PropTypes.array,
    onTodoClick: PropTypes.func,
};
TodoList.defaultProps = {
    todoList: [],
    onTodoClick: null,
};

function TodoList(props) {
    const { todoList, onTodoClick } = props;

    const handleClick = (todo, index) => {

        if (!onTodoClick) return;

        onTodoClick(todo, index);
    }

    return (
        <ul className="list-todo">
            {todoList.map((todo, index) => (
                <li
                    key={todo.id}
                    className={todo.status === 'completed' ? 'completed' : ''}
                    onClick={() => handleClick(todo, index)}
                >{todo.title}

                </li>
            ))
            }
        </ul >
    );
}

export default TodoList;