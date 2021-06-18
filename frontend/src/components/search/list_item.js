import React from "react";
import './search.css'

const ListItem = (props) => {
  let imageSrc = props.item.image.hasImage ? props.item.image.small : "/music-solid.svg";

  console.log(props);
  return (
    <li
      className="list-item"
      onClick={() => props.action(props.item.id, props.item.name)}
      key={props.id}
    >
      <img className="album-art-search" src={imageSrc}></img>
      <span className="search-value-name">{props.item.name}</span>
    </li>
  );
};

export default ListItem;
