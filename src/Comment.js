import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import CommentInput from './CommentInput'

class Comment extends Component {
    static propTypes = {
        comment: PropTypes.object.isRequired,  //propTypes用来验证传入的数据类型。数据类型和验证的不同就报错，后面加isRequired是强调必须传入一个这种类型的参数
        onDelete: PropTypes.func,
        index: PropTypes.number
    }
    constructor(...args) {
        super(...args);
        this.state = {timer: ''}
    }
    handleDelete() {
        if(this.props.onDelete) {
            this.props.onDelete(this.props.index)
        }
    }
    _UpdateTimer() {
        
        const comment = this.props.comment
        const duration = (+Date.now() - comment.createdTime) / 1000
        this.setState({
            timer: duration > 60 ? `${Math.round(duration / 60)} 分钟前` : `${Math.round(Math.max(duration,1))} 秒前`
        })   //这里用的是反单引号，特别要注意，es6里面的新特性，是为了更好的添加值
   
    }
    componentWillMount() {
        this._UpdateTimer()
        this._timer = setInterval(this._UpdateTimer.bind(this),5000)
    }
    componentWillUnmount() {
        clearInterval(this._timer)
    }
    render() {
        return (
            <div className="comment">
                <div className="comment-user">
                    <span>{this.props.comment.username}</span> ：
                </div>
                <p>{this.props.comment.content}</p>
                <span className="comment-createdtime">{this.state.timer}</span>
                <span className="comment-delete" onClick={this.handleDelete.bind(this)}>删除</span>
            </div>
        )
    }
}


export default Comment