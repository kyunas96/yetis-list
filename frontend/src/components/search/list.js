import React from 'react'
import ListItem from './list_item';

const List = props => {
  // console.log(props, 'List logger')
  return props.items.length > 0 ? (
  <ul className='list'>
    {props.items.map(item => (
      <ListItem item={item} action={props.action} setSeed={props.setSeed}/>
    ))}
  </ul>
  ) : (null);
}

export default List;

