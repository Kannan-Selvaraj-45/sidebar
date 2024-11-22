/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faEllipsisVertical,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { GiTruck } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import "./Sidebar.css";
import { GripHorizontal } from "lucide-react";

const tabsList = [
  { tabId: "OBJECTS", displayText: "Objects" },
  { tabId: "EVENTS", displayText: "Events" },
  { tabId: "HISTORY", displayText: "History" },
];

const TabItem = (props) => {
  const { tabDetails, isActiveTab, changeTabId } = props;

  const onChangeTab = () => {
    changeTabId(tabDetails.tabId);
  };

  return (
    <li className="tab-item">
      <button
        className={`tab-button ${isActiveTab ? "active-item" : ""}`}
        onClick={onChangeTab}
      >
        {tabDetails.displayText}
      </button>
    </li>
  );
};

const ListGroup = (props) => {
  const { listDetails, searchTerm } = props;
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

              <GiTruck className="truck-icon" />
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

const Sidebar = ({ tabContentList }) => {
  const [activeTab, setActiveTab] = useState(tabsList[0].tabId);
  const [searchTerm, setSearchTerm] = useState("");

  const changeTabId = (id) => {
    setActiveTab(id);
  };

  const filterTabDetails = tabContentList.filter(
    (eachList) => eachList.category === activeTab
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const [collapse, setCollapse] = useState(false);
  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <div className="background">
      <Draggable bounds="parent">
        <div
          className={`nav-container ${collapse ? "collapsed" : ""}`}
          style={{
            minHeight: collapse ? "" : "49px",
          }}
        >
          <div className="drag-handle hv" onClick={handleCollapse}>
            {!collapse ? (
              <FontAwesomeIcon icon={faAngleDown} />
            ) : (
              <FontAwesomeIcon icon={faAngleUp} />
            )}
          </div>
          <div className="drag-handle" aria-label="Drag to move sidebar">
            <GripHorizontal size={20} />
          </div>
          <ul className="nav-bar" style={{ display: "none" }}>
            {tabsList.map((eachTab) => (
              <TabItem
                key={eachTab.tabId}
                tabDetails={eachTab}
                isActiveTab={eachTab.tabId === activeTab}
                changeTabId={changeTabId}
              />
            ))}
          </ul>

          {activeTab === "OBJECTS" && (
            <ul className="list-group-container">
              <div className="search-input-container">
                <FaSearch className="search" />
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <ul className="scroll-container">
                {filterTabDetails.map((eachGroup) => (
                  <ListGroup
                    key={eachGroup.listId}
                    listDetails={eachGroup}
                    searchTerm={searchTerm}
                  />
                ))}
              </ul>
            </ul>
          )}
        </div>
      </Draggable>
    </div>
  );
};

export default Sidebar;
