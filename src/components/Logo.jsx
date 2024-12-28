import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

const SearchXLogo = () => {
  const { isSearchOpen } = useContext(SearchContext);
  if (isSearchOpen) return null;
  return (
    <div className="logo">
      <span className="s stretch">S</span>
      <span className="e stretch">e</span>
      <span className="a stretch">a</span>
      <span className="r stretch">r</span>
      <span className="c stretch">c</span>
      <span className="h stretch">h</span>
      <span className="space"> </span>
      <span className="x stretch">X</span>
    </div>
  );
};

export default SearchXLogo;
