/* eslint-disable react/prop-types */
import { createRoot } from "react-dom/client";
import "./index.css";
import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FaTruckMoving } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { GripHorizontal } from "lucide-react";

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
  },
  {
    listId: 4,
    category: "ALL",
    subList: ["KL01EB8526"],
  },
  {
    listId: 5,
    category: "ALL",
    subList: ["MP02TW526"],
  },
];

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
        {options.find((option) => option.tabId === value)?.displayText}
        <FontAwesomeIcon
          className="dropdown-control-icon"
          icon={isOpen ? faAngleUp : faAngleDown}
        />
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
  const [selectedText, setSelectedText] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [collapse, setCollapse] = useState(false);

  const dropdownOptions = [
    { tabId: "ALL", displayText: "All" },
    ...tabContentList
      .filter((item) => item.text)
      .map((item) => ({
        tabId: item.text,
        displayText: item.text,
      })),
  ];

  const handleDropdownChange = (tabId) => {
    setSelectedText(tabId);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  const filteredSubLists =
    selectedText === "ALL"
      ? tabContentList.flatMap((item) =>
          item.subList.filter((sub) =>
            sub.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      : tabContentList
          .filter((item) => item.text === selectedText)
          .flatMap((item) =>
            item.subList.filter((sub) =>
              sub.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );

  return (
    <Draggable bounds="html">
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
            options={dropdownOptions}
            value={selectedText}
            onChange={handleDropdownChange}
          />
        </div>

        <ul className="list-group-container">
          <ul className="scroll-container">
            {filteredSubLists.map((sub, index) => (
              <li key={index} className="list-item-sub">
                <div className="list-text-container list-item-text">{sub}</div>
                <FaTruckMoving className="truck-icon" />
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  className="icon-new-dot"
                />
              </li>
            ))}
          </ul>
        </ul>
      </div>
    </Draggable>
  );
};

createRoot(document.getElementById("sidebar-map")).render(<Sidebar />);
