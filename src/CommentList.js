import React, {Component} from 'react'
import Comment from './Comment'
// import PropTypes from 'prop-types'

class CommentList extends React.Component {
   // static propTypes = {
   // comments: PropTypes.array,  //可以不要这个代码块的代码，加上这个只是为了验证prop的参数类型，这里就是数组
    //onDelete: PropTypes.func    //加了验证之后输入数据的地方就不能输入其他类型的数据，方便告诉别人这里的数据类型
 // }                              //下面的defaultProps可以配置参数，我们下面已经配置了是数组，这里还验证必须是数组，多此一举，直接注释不要了。
    static defaultProps={    //配置可选参数，使其在不传入的时候有默认值
        comments: []
    }
    
    handleDelete(index) {
        if(this.props.onDelete) {
            this.props.onDelete(index)
        }
    }
    render() {
        return (
            <div>{this.props.comments.map((comment,i) => 
                <Comment comment={comment} key={i} index={i} onDelete={this.handleDelete.bind(this)} />)}
            </div>
        )
       
    }
}

export default CommentList