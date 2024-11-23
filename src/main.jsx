/* eslint-disable react/prop-types */
import { createRoot } from "react-dom/client";
import "./index.css";
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
import { FaTruckMonster } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { GripHorizontal } from "lucide-react";

const tabsList = [
  { tabId: "ALL", displayText: "All" },
  { tabId: "OBJECTS", displayText: "GROUP" },
];

const tabContentList = [
  {
    listId: 0,
    category: "OBJECTS",
    text: "MAHARASTRA",
    subList: ["TS06UB7174", "TN52B5812", "MH40CM0912"],
  },
  {
    listId: 1,
    category: "OBJECTS",
    text: "SANKARI",
    subList: ["TN06UB8526", "KL07CA4142", "TS06UB8966"],
  },
  {
    listId: 2,
    category: "ALL",
    subList: ["TL05UB8526"],
  },
  {
    listId: 3,
    category: "ALL",
    subList: ["AP02UB8526"],
  },{
    listId: 4,
    category: "ALL",
    subList: ["KL01EB8526"],
  },{
    listId: 5,
    category: "ALL",
    subList: ["MP02TW526"],
  },
];

const ListGroupItem = ({ listDetails, searchTerm, isAllCategory }) => {
  const { category, text, subList } = listDetails;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredSubList, setFilteredSubList] = useState(subList);

  const toggleDropdown = () => {
    if (!isAllCategory || category === "OBJECTS") {
      setIsDropdownOpen((prevState) => !prevState);
    }
  };

  useEffect(() => {
    const filtered = subList.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubList(filtered);
  }, [searchTerm, subList]);

  const renderMainList = () => {
    if (isAllCategory) return null;  
    
    const isVisible =
      text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      filteredSubList.length > 0;

    if (!isVisible) return null;

    return (
      <li className="list-item">
        <div
          className={`list-text-container ${
            isDropdownOpen ? "list-text-active" : ""
          }`}
          onClick={toggleDropdown}
        >
          {text}
        </div>

        {category === "OBJECTS" && (
          <FontAwesomeIcon
            icon={isDropdownOpen ? faMinus : faPlus}
            className={`icon-plus ${isDropdownOpen ? "icon-active" : ""}`}
            onClick={toggleDropdown}
          />
        )}
        <FontAwesomeIcon icon={faEllipsisVertical} className="icon-dot" />
      </li>
    );
  };

  const renderSublistItems = () => {
    return (
      <div className="dropdown-content">
        <ul>
          {filteredSubList.map((item, index) => (
            <li key={index} className="list-item-sub">
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

  const renderAllSublistItems = () => {
    return (
      <ul>
        {filteredSubList.map((item, index) => (
          <li key={index} className="list-item">
            <div className="list-text-container list-item-text">{item}</div>
            <FaTruckMonster className="truck-icon" />
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="icon-new-dot"
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      {isAllCategory ? (
        renderAllSublistItems()
      ) : (
        <>
          {renderMainList()}
          {isDropdownOpen && renderSublistItems()}
        </>
      )}
    </>
  );
};


const ModernDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".modern-dropdown")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="modern-dropdown">
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {options.find((option) => option.tabId === value)?.displayText}{" "}
        <FontAwesomeIcon icon={isOpen ? faAngleUp : faAngleDown} />{" "}
      </div>

      {isOpen && (
        <ul className="dropdown-options">
          {options.map((option) => (
            <li
              key={option.tabId}
              className={`dropdown-option ${
                option.tabId === value ? "active" : ""
              }`}
              onClick={() => handleOptionClick(option.tabId)}
            >
              {option.displayText}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Sidebar = () => {
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
    <Draggable>
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
        <div className="search-filter-container">
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
          <ModernDropdown
            options={tabsList}
            value={activeTab}
            onChange={changeTabId}
          />
        </div>

        {activeTab === "OBJECTS" && (
          <ul className="list-group-container">
            <ul className="scroll-container">
              {filterTabDetails.map((eachGroup) => (
                <ListGroupItem
                  key={eachGroup.listId}
                  listDetails={eachGroup}
                  searchTerm={searchTerm}
                  isAllCategory={false}
                />
              ))}
            </ul>
          </ul>
        )}
        {activeTab === "ALL" && (
          <ul className="list-group-container">
            <ul className="scroll-container">
              {tabContentList.map((eachGroup) => (
                <ListGroupItem
                  key={eachGroup.listId}
                  listDetails={eachGroup}
                  searchTerm={searchTerm}
                  isAllCategory={true}
                />
              ))}
            </ul>
          </ul>
        )}
      </div>
    </Draggable>
  );
};

createRoot(document.getElementById("sidebar-map")).render(<Sidebar />);
