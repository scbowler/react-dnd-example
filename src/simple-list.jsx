import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const defaultList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function SimpleList() {
  const [itemList, setItemList] = useState(defaultList);

  const handleDrop = droppedItem => {
    if (!droppedItem.destination) return;

    const updatedList = [...itemList];

    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    
    setItemList(updatedList);
  };

  return (
    <div className="container">
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId='list-container'>
          {
            provided => (
              <div
                className="list-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {
                  itemList.map((item, index) => (
                    <Draggable key={item} draggableId={item} index={index}>
                      {
                        provided => (
                          <div 
                            className="item-container"
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                          >
                            {item}
                          </div>
                        )
                      }
                    </Draggable>
                  ))
                }
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default SimpleList;
