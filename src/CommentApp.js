import React,{Component} from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

class CommentApp extends React.Component {
    constructor(...args) {
        super(...args);
        this.state={comments: []}
    }
    handleSubmitComment(comment) {
        if(!comment) return
        if(!comment.username) return alert('请输入用户名')
        if(!comment.content) return alert('请输入内容')
        const comments=this.state.comments
        comments.push(comment) 
        this.setState({comments})
        this._saveComments(comments)
    }
    _saveComments(comments) {
        localStorage.setItem('comments', JSON.stringify(comments)) //保存发布的内容，并把JSON数据转为字符串数据保存到变量里,                                                  
    }                                                       //这里要注意传参，把保存数据的变量当参数传进来,不然会报错,变量未定义
    _loadComments() {
        let comments = localStorage.getItem('comments')  //读取内容
        if(comments) {
            comments=JSON.parse(comments)   //把保存在变量中的字符串数据转化为JSON数据
            this.setState({comments})
        }
    }
    componentWillMount() {
        this._loadComments()    //每次挂载之前，也就是页面刷新之后，会调用读取数据的方法，把上次保存的数据持久化。
    }
    handleDelete(index) {
        const comments = this.state.comments
        comments.splice(index,1)
        this.setState({comments})
        this._saveComments(comments)
    }
    render() {
        return (
            <div className="wrapper">
                <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
                <CommentList comments={this.state.comments} onDelete={this.handleDelete.bind(this)} />
            </div>
        )
    }
}

export default CommentApp