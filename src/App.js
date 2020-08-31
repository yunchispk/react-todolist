import React from 'react';
import { Input, Button } from 'antd';
import TodoList from './components/TodoList.js'
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <TodoList/>
      </div>
    );
  }
}

export default App;
