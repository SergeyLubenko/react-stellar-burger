import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import draggableStyles from './draggable-ingredient.module.css';
import { deleteIngredient } from "../../services/constructorSlice";


const DraggableIngredient = ({ item, moveItem }) => {
    
    const dispatch = useDispatch();

    const { ingredients } = useSelector(
        (store) => store.userBurgerIngredients,
    );

    const { _id, name, price, image } = item


    const ref = useRef(null);
    const index = ingredients.indexOf(item);

    // Перетаскивание  --- drag
    const [{ isDragging }, drag] = useDrag({
        type: 'constructor',
        item: () => ({ id: item._id, index }),
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    const opacity = isDragging ? .5 : 1;

    // Перетаскивание --- drop
    const [{ handlerId }, drop] = useDrop({
        accept: 'constructor',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top);
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    })


    const dragDropRef = drag(drop(ref));

    return (
        <>
            <div
                className={draggableStyles.item}
                style={{ opacity }}
                ref={dragDropRef}
                data-handler-id={handlerId}
            >
                <DragIcon type="primary" />
                <ConstructorElement
                    text={name}
                    price={price}
                    thumbnail={image}
                    handleClose={() => dispatch(deleteIngredient(item.id))}
                />
            </div>
        </>
    )
}

export default DraggableIngredient