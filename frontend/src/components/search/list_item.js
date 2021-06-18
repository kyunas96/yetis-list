import React from "react";

const ListItem = (props) => {
  let imageSrc = props.item.image.small ? props.item.image.small : "music-solid.svg";

  console.log(props);
  return (
    <li
      className="list-item"
      onClick={() => props.action(props.item.id, props.item.name)}
      key={props.id}
    >
      <img src={imageSrc}></img>
      <span>{props.item.name}</span>
    </li>
  );
};

export default ListItem;
