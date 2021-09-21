import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Todos from './pages/TodoList';
import { Route, Switch } from 'react-router';
import TodoDetail from './pages/TodoDetail';

TotoFeature.propTypes = {

};

function TotoFeature(props) {


    return (

        <Switch>
            <Route path="/todos" component={Todos} />
            <Route path="/todo/:id" component={TodoDetail} />
        </Switch>

    );
}

export default TotoFeature;