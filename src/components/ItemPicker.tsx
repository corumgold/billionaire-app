import React from "react";
import { items } from "../items";
import { useDispatch } from "react-redux";
import { actions } from "../store/itemSlice";
import globalStyles from "../theme/globalStyles";
import { actions as celebrityActions } from "../store/celebritySlice";
import { formatCurrency } from "../helperFuncs";

const ItemPicker: React.FC = () => {
  const dispatch = useDispatch();

  const handleItemClick = (selectedItem: {
    name: string;
    price: number;
    emoji: string;
  }) => {
    dispatch(actions.setItem(selectedItem));
  };

  return (
    <>
      <button
        style={globalStyles.backButton}
        onClick={() => dispatch(celebrityActions.setCelebrity(null))}
      >
        Back
      </button>
      <div style={globalStyles.list}>
        {items?.map((item, index) => {
          return (
            <button
              style={{
                ...globalStyles.listItem,
              }}
              key={index}
              onClick={() => handleItemClick(item)}
            >
              <h3>{item.name}</h3>
              <p style={{fontSize: "3em", margin: 0}}>{item.emoji}</p>
              <p>{formatCurrency(item.price)}</p>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default ItemPicker;
