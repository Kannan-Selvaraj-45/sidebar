import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { TbEngine } from "react-icons/tb";
import "./style.css";

const ListGroup = ({ listDetails, searchTerm }) => {
  const { text, subList } = listDetails;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMainChecked, setIsMainChecked] = useState(true);
  const [sublistChecked, setSublistChecked] = useState(
    new Array(subList.length).fill(true)
  );

  const [filteredSubList, setFilteredSubList] = useState(subList);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleMainCheckboxChange = () => {
    const newCheckedState = !isMainChecked;
    setIsMainChecked(newCheckedState);
    setSublistChecked(new Array(subList.length).fill(newCheckedState));
  };

  const handleSublistCheckboxChange = (index) => {
    const updatedChecked = [...sublistChecked];
    updatedChecked[index] = !updatedChecked[index];
    setSublistChecked(updatedChecked);

    setIsMainChecked(updatedChecked.every(Boolean));
  };

  useEffect(() => {
    const filtered = subList.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubList(filtered);
  }, [searchTerm, subList]);

  const renderMainList = () => {
    return (
      <li className="list-item">
        <input
          type="checkbox"
          className="checkBox"
          checked={isMainChecked}
          onChange={handleMainCheckboxChange}
        />
        <div
          className={`list-text-container ${
            isDropdownOpen ? "list-text-active" : ""
          }`}
          onClick={toggleDropdown}
        >
          {text}
        </div>

        <FontAwesomeIcon
          icon={isDropdownOpen ? faMinus : faPlus}
          className={`icon-plus ${isDropdownOpen ? "icon-active" : ""}`}
          onClick={toggleDropdown}
        />
        <FontAwesomeIcon icon={faEllipsisVertical} className="icon-dot" />
      </li>
    );
  };

  const renderSublistItems = (sublist) => {
    return (
      <div className="dropdown-content">
        <ul>
          {sublist.map((item, index) => (
            <li key={index} className="list-item-sub">
              <input
                type="checkbox"
                className="checkBox"
                checked={sublistChecked[index]}
                onChange={() => handleSublistCheckboxChange(index)}
              />
              <div className="list-text-container list-item-text">{item}</div>
              <TbEngine className="icon-plus" />
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className="icon-new-dot"
              />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      {searchTerm ? (
        filteredSubList.length > 0 && (
          <>
            {renderMainList()}
            {isDropdownOpen && renderSublistItems(filteredSubList)}
          </>
        )
      ) : (
        <>
          {renderMainList()}
          {isDropdownOpen && renderSublistItems(subList)}
        </>
      )}
    </>
  );
};

export default ListGroup;
