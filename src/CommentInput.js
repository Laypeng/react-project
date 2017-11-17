import React, {Component} from 'react'


class CommentInput extends React.Component {
    constructor(...args) {
        super(...args);
        this.state={
            username: '',
            content: ''
        }
    }

    fn(e) {
        this.setState({ username: e.target.value})
    }
    speed(e) {
        this.setState({content: e.target.value})
    }
    handleClick() {
        if(this.props.onSubmit) {
            // const {username,content} = this.state;
            this.props.onSubmit({
                username: this.state.username,
                content: this.state.content,
                createdTime: +new Date()
            })
        }
        this.setState({content: ''})
    }
    componentWillMount() {
        this._loadUsername()
    }
    _loadUsername() {
        const username=localStorage.getItem('username');  //读取保存的值，里面的参数对应设置里面的键。
        if(username) {
            this.setState({username})  //这一步的意思是如果表单有新的值，那么这里就将新保存的这个值渲染出来，通过上面挂载来调用这个方法
        }
    }
    componentDidMount() {
        this.textarea.focus()  //获取内容区域的焦点，每次挂载完后都会自动聚焦到内容输入区域
    }
   
    handleBlur(e) {
        this._saveUsername(e.target.value)  //调用下面的方法，获取每次输入的值，在用户名区域用户名持久化的同时让这里失去焦点，在下面的属性onBlur
    }
     _saveUsername(username) {
        localStorage.setItem('username',username)  //设置保存的值，里面的两个参数是键值对。将变量存到localStorage里
    }

    render() {
        return (
            <div className="comment-input">
                <div className="comment-field">
                    <span className="comment-field-name">用户名：</span>
                    <div className="comment-field-input">
                        <input value={this.state.username} onChange={this.fn.bind(this)} onBlur={this.handleBlur.bind(this)} />
                    </div>
                </div>
                <div className="comment-field">
                    <span className="comment-field-name">评论内容：</span>
                    <div className="comment-field-input">
                        <textarea ref={(textarea) => this.textarea=textarea} value={this.state.content} onChange={this.speed.bind(this)}></textarea>
                    </div>
                </div>
                <div className="comment-field-button">
                    <button onClick={this.handleClick.bind(this)}>发布</button>
                </div>
            </div>
        )
    }
}

export default CommentInput