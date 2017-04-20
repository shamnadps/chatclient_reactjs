import React from 'react';

const ChatGroup = ({name, isSelected, onClick}) => {
  const className = isSelected ? "ChatGroupList-item ChatGroupList-item-selected" : "ChatGroupList-item";
  return (
    <div onClick={onClick} className={className}>{name}</div>
  )
};

const ChatGroupList = ({chatMembers, selectedChatId, onSelect}) => (
  <div className="ChatGroupList">
  {
    chatMembers.map(({id,name}) => {
      const is_selected = selectedChatId === id;
      const onChatSelect = () => onSelect(id);
      return <ChatGroup key={id} name={name} isSelected={is_selected} onClick={onChatSelect} />
    })
  }
  </div>
);

export default ChatGroupList;
