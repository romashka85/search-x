/* eslint-disable react/prop-types */
const RemoveButton = ({
  index,
  highlightedIndex,
  removeSearchHistory,
  item,
}) => {
  return (
    <a
      href="#"
      className={`remove-search ${
        index === highlightedIndex ? "highlighted" : ""
      }`}
      onClick={() => removeSearchHistory(item)}
    >
      Remove
    </a>
  );
};

export default RemoveButton;
