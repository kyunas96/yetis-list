import React from 'react';

const ListItem = props => {
  return <li 
    className='list-item' 
    onClick={() => props.action(props.item.id)}
    key={props.id}>

    <img src={props.item.portrait.small}>

    </img>
    <span>{props.item.name}</span>
  </li>
}

export default ListItem;