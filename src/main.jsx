/* eslint-disable react/prop-types */
import { createRoot } from "react-dom/client";
import "./index.css";
import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { GripHorizontal } from "lucide-react";

const tabContentList = [
  {
    listId: 0,
    group: "MAHARASTRA",
    subList: [
      {
        vehicle: "TS06UB7174",
        status: "Active",
        address: "MAHARASTRA",
        location: "NH48, Vajarahalli, Dabaspete, Bangalore Rural, KA",
      },
      {
        vehicle: "TN52B5812",
        status: "InActive",
        address: "MAHARASTRA",
        location: "Nileri, Devanahalli TK ,Banglore Rural, KA",
      },
      {
        vehicle: "MH40CM0912",
        status: "Disconneted",
        address: "MAHARASTRA",
        location: "Old Madras Rd, Tavarekere, Hosakote TK, Kolar Dt, KA",
      },
    ],
  },
  {
    listId: 1,
    group: "SANKARI",
    subList: [
      {
        vehicle: "TN06UB8526",
        status: "InActive",
        address: "SANKARI",
        location: "Nileri, Devanahalli TK, Banglore Rural, KA",
      },
      {
        vehicle: "KL07CA4142",
        status: "Active",
        address: "SANKARI",
        location: "Old Madras Rd, Tavarekere, Hosakote TK, Kolar Dt, KA",
      },
      {
        vehicle: "TS06UB8966",
        status: "Disconneted",
        address: "SANKARI",
        location: "Nileri, Devanahalli TK, Banglore Rural, KA",
      },
    ],
  },
  {
    listId: 2,
    subList: [
      {
        vehicle: "TL05UB8526",
        status: "Active",
        location: "NH48,Vajarahalli, Dabaspete, Bangalore Rural, KA",
      },
    ],
  },
  {
    listId: 3,
    subList: [
      {
        vehicle: "AP02UB8526",
        status: "InActive",
        location: "NH48, Vajarahalli, Dabaspete, Bangalore Rural, KA",
      },
    ],
  },
  {
    listId: 4,
    subList: [
      {
        vehicle: "KL01EB8526",
        status: "Active",
        location: "Old Madras Rd, Tavarekere, Hosakote TK, Kolar Dt, KA",
      },
    ],
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
    { tabId: "ALL", displayText: "ALL" },
    ...tabContentList
      .filter((item) => item.group)
      .map((item) => ({
        tabId: item.group,
        displayText: item.group,
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
            sub.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      : tabContentList
          .filter((item) => item.group === selectedText)
          .flatMap((item) =>
            item.subList.filter((sub) =>
              sub.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case "Active":
        return "#49A74D";
      case "InActive":
        return "#808080";
      case "Disconneted":
        return "#E23D43";
      default:
        return "#6c757d";
    }
  };

  const [dot, setDot] = useState(false);

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
                <div
                  className="speed-background"
                  style={{
                    backgroundColor: getStatusBackgroundColor(sub.status),
                  }}
                >
                  <img
                    src="https://app.ktt.io/images/AssetIcons/TRAILER/8W%20Trailer%20S2.svg"
                    width={50}
                    height={50}
                  />
                  <p
                    style={{
                      color: "white",
                      fontSize: "11px",
                    }}
                  >
                    {sub.status.toUpperCase()}
                  </p>
                </div>
                <div className="list-container">
                  <div className="list-text-container ">
                    <p className="sub-text">{sub.vehicle}</p>
                    <div className="address-location-container">
                      {sub.address && (
                        <span className="sub-address">{sub.address}</span>
                      )}
                    </div>
                    {sub.location && dot && (
                      <span className="sub-location">{sub.location}</span>
                    )}
                  </div>
                </div>
                {!dot ? (
                  <CiCircleChevDown
                    className="dot"
                    onClick={() => setDot(!dot)}
                  />
                ) : (
                  <CiCircleChevUp
                    className="dot"
                    onClick={() => setDot(!dot)}
                  />
                )}
              </li>
            ))}
          </ul>
        </ul>
      </div>
    </Draggable>
  );
};

createRoot(document.getElementById("sidebar-map")).render(<Sidebar />);
