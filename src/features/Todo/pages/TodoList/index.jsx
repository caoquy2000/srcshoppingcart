import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TodoList from '../../components/TodoList';
import TodoForm from '../../components/TodoForm';
import queryString from 'query-string';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

Todos.propTypes = {

};

function Todos(props) {
    const initTodoList = [
        {
            id: 1,
            title: 'Eat',
            status: 'new'
        },
        {
            id: 2,
            title: 'Sleep',
            status: 'completed'
        },
        {
            id: 3,
            title: 'Code',
            status: 'new'
        }
    ]
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();
    const [todoList, setTodoList] = useState(initTodoList);
    const [filterTodo, setFilterTodo] = useState(() => {
        const param = queryString.parse(location.search);
        return param.status || 'all';
    });
    useEffect(() => {
        const param = queryString.parse(location.search);
        setFilterTodo(param.status || 'all');
    }, [location.search])

    const handleTodoClick = (todo, index) => {
        const newTodoList = [...todoList];
        const newTodo = {
            ...todoList[index],
            status: todoList[index].status === 'new' ? 'completed' : 'new',
        }
        newTodoList[index] = newTodo
        setTodoList(newTodoList);
    }
    const handleShowAll = () => {
        // setFilterTodo('all');
        const queryParam = { status: "all" };
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParam),
        })
    }
    const handleShowCompleted = () => {
        const queryParam = { status: "completed" };
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParam),
        })
    }
    const handleShowNew = () => {
        // setFilterTodo('new');
        const queryParam = { status: "new" };
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParam),
        })
    }
    const renderedListTodo = todoList.filter(todo => filterTodo === 'all' || todo.status === filterTodo);

    const handleTodoFormSubmit = (values) => {
        const id = initTodoList.length + 1;
        const newTodo = {
            id: id,
            title: values.title,
            status: 'new',
        };
        const newListTodo = [...todoList, newTodo];
        // console.log(newListTodo);
        setTodoList(newListTodo);
    }

    return (
        <div>
            <h3>Todo Form</h3>
            {/* Khi user submit ở component TodoForm sẽ gọi hàm 
                handleTodoFormSubmit để xử lí ở component này.
            */}
            <TodoForm onSubmit={handleTodoFormSubmit} />
            <h2>Todo List</h2>
            <TodoList todoList={renderedListTodo} onTodoClick={handleTodoClick} />
            <div className="button__div">
                <button onClick={() => handleShowAll()}>Show All</button>
                <button onClick={() => handleShowCompleted()}>Show Completed</button>
                <button onClick={() => handleShowNew()}>Show New</button>
            </div>
        </div >
    );
}

export default Todos;