import React, { Component } from 'react';
import { Row, Divider, Checkbox, Button } from 'antd';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    title: '这是一个示例事项1',
                    checked: true
                },
                {
                    title: '这是一个示例事项2',
                    checked: false
                }
            ]
        };
    }

    addData = (e) => {
        //按下回车的时候增加todo事项

        if (e.keyCode == 13 && this.refs.title.value != '') {


            // alert(title);

            let title = this.refs.title.value;
            let tempList = this.state.list;

            tempList.push({
                title: title,
                checked: false
            })
            //改变后的值赋值给list

            this.setState({
                list: tempList
            })


            //表单置为空
            this.refs.title.value = '';

            //执行缓存数据
            localStorage.setItem('todolist', JSON.stringify(tempList));
        }
    }
    checkboxChage = (key) => {

        // alert('111');
        let tempList = this.state.list;

        tempList[key].checked = !tempList[key].checked;


        this.setState({

            list: tempList
        })
        //执行缓存数据
        localStorage.setItem('todolist', JSON.stringify(tempList));

    }
    removeData = (key) => {

        let tempList = this.state.list;


        tempList.splice(key, 1);


        this.setState({

            list: tempList
        })
        //执行缓存数据
        localStorage.setItem('todolist', JSON.stringify(tempList));


    }
    clearLocalStorage = () => {
        this.setState({
            list: []
        })
        //执行缓存数据
        localStorage.setItem('todolist', JSON.stringify([]));
    }

    //生命周期函数  页面加载就会触发

    componentDidMount() {

        //获取缓存的数据

        var todolist = JSON.parse(localStorage.getItem('todolist'));

        if (todolist) {

            this.setState({
                list: todolist
            })
        }else{
            this.setState({
                list: this.state.list
            })
        }
    }


    render() {
        return (
            <div>

                <header className="title">TodoList: 　<input ref="title" placeholder="添加ToDo" onKeyUp={this.addData} />  </header>

                <Divider orientation="left">待办事项</Divider>

                <ul>
                    {
                        this.state.list.map((value, key) => {
                            if (!value.checked) {
                                return (

                                    <li>
                                        <Row>
                                            <Checkbox checked={value.checked} onChange={this.checkboxChage.bind(this, key)} />
                                            {value.title}
                                            <Button onClick={this.removeData.bind(this, key)}>删除</Button>
                                        </Row>
                                    </li>
                                )
                            }
                        })


                    }
                </ul>

                <Divider orientation="left">已完成事项</Divider>

                <ul >
                    {
                        this.state.list.map((value, key) => {
                            if (value.checked) {
                                return (
                                    <li>
                                        <Row>
                                            <Checkbox checked={value.checked} onChange={this.checkboxChage.bind(this, key)} />
                                            {value.title}
                                            <Button onClick={this.removeData.bind(this, key)}>删除</Button>
                                        </Row>
                                    </li>
                                )
                            }

                        })
                    }
                </ul>
                <Button onClick={this.clearLocalStorage.bind(this)}>reset</Button>
            </div>
        );
    }
}
export default TodoList;