import React from 'react'
import { Col, Row } from 'react-bootstrap'

const TodoItem = ({ item, deleteItem, toggleComplete }) => {
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${item.isCompleted ? 'item-complete' : ''}`}>
          <div className='todo-content'>{item.task}</div>
          <div className='todo-content'>by {item.author.name}</div>

          <div>
            <button className='button-delete' onClick={() => deleteItem(item._id)}>
              삭제
            </button>
            <button className='button-delete' onClick={() => toggleComplete(item._id)}>
              {item.isCompleted ? `끝남` : `진행중`}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default TodoItem
