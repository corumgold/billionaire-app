import React from "react";
import { items } from "../items";
import { useDispatch } from "react-redux";
import { actions } from "../store/itemSlice";

const ItemPicker: React.FC = () => {
  const dispatch = useDispatch();

  const handleItemClick = (selectedItem: {
    name: string;
    price: number;
    imageUrl: string;
  }) => {
    dispatch(actions.setItem(selectedItem));
  };

  return (
    <div>
      <h2>Please Select an Item</h2>
      {items.map((item) => {
        return (
          <button onClick={() => handleItemClick(item)}>
            {item.name} {item.price}
          </button>
        );
      })}
    </div>
  );
};

export default ItemPicker;
