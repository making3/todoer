import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { moveTodo } from './todosSlice';

const DRAG_TYPE = 'TODO';
const useDraggableTodo = ({ id, index }) => {
    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: DRAG_TYPE,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                //  Same refernce
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                // Dragging downwards
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                // Dragging upwards
                return;
            }

            moveTodo(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag, previewRef] = useDrag({
        type: DRAG_TYPE,
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    drag(drop(ref));

    return [ref, previewRef, isDragging, handlerId];
};

export default useDraggableTodo;
