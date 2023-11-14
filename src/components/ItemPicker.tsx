import React from "react";
import { items } from "../items";
import { useDispatch } from "react-redux";
import { actions } from "../store/itemSlice";
import globalStyles from "../theme/globalStyles";
import { actions as celebrityActions } from "../store/celebritySlice";

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
    <>
      <button
        style={globalStyles.backButton}
        onClick={() => dispatch(celebrityActions.setCelebrityName(null))}
      >
        Back
      </button>
      <div style={globalStyles.container}>
        {items.map((item) => {
          return (
            <button onClick={() => handleItemClick(item)}>
              {item.name} {item.price}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default ItemPicker;
