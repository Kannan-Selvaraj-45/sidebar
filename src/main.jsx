/* eslint-disable react/prop-types */
import { createRoot } from "react-dom/client";
import "./index.css";
import { useState, useEffect } from "react";

import { Rnd } from "react-rnd";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { LuGripHorizontal } from "react-icons/lu";
import { MdLabelOutline, MdOutlineLabelOff } from "react-icons/md";
import { RiTruckLine } from "react-icons/ri";
import { TbTruckOff } from "react-icons/tb";
import { MdOutlineLocationOn, MdOutlineLocationOff } from "react-icons/md";
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
      {
        vehicle: "VP06UB8966",
        status: "ACTIVE",
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

        {isOpen ? (
          <FaAngleUp className="angle" />
        ) : (
          <FaAngleDown className="angle" />
        )}
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
  const [filterdot, setFilterDot] = useState(false);
  const [labeldot, setLabelDot] = useState(false);
  const [size, setSize] = useState({ width: 300, height: 700 });
  const [position, setPosition] = useState({ x: 0, y: 25 });

  return (
    <Rnd
      resizeHandleStyles={{
        bottomRight: {
          width: "10px",
          height: "10px",
          backgroundColor: "#ccc",
          position: "absolute",
          right: "0",
          bottom: "0",
          cursor: "se-resize",
        },
      }}
      enableResizing={{
        bottomRight: true,
      }}
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      onDragStop={(e, data) => {
        setPosition({ x: data.x, y: data.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        });
        setPosition(position);
      }}
      className={`nav-container ${collapse ? "collapsed" : ""}`}
      bounds="window"
    >
      <div className="drag-hand">
        <div className="drag-handle hv" onClick={handleCollapse}>
          {collapse ? <FaAngleUp /> : <FaAngleDown />}
        </div>

        <div className="drag-handle" aria-label="Drag to move sidebar">
          <LuGripHorizontal size={20} />
        </div>
      </div>
      <div className="show-hide-container">
        <div className="dot-handle">
          {!filterdot ? (
            <RiTruckLine
              className="dot"
              onClick={() => setFilterDot(!filterdot)}
            />
          ) : (
            <TbTruckOff
              className="dot"
              onClick={() => setFilterDot(!filterdot)}
            />
          )}
        </div>
        <div className="dot-handle">
          {labeldot ? (
            <MdLabelOutline
              className="dot"
              onClick={() => setLabelDot(!labeldot)}
            />
          ) : (
            <MdOutlineLabelOff
              className="dot"
              onClick={() => setLabelDot(!labeldot)}
            />
          )}
        </div>

        <div className="dot-handle">
          {dot ? (
            <MdOutlineLocationOn className="dot" onClick={() => setDot(!dot)} />
          ) : (
            <MdOutlineLocationOff
              className="dot"
              onClick={() => setDot(!dot)}
            />
          )}
        </div>
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
              {!filterdot ? (
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
              ) : (
                ""
              )}

              <div className="list-container">
                <div className="list-text-container ">
                  <p className="sub-text">{sub.vehicle}</p>
                  <div className="address-location-container">
                    {sub.address && labeldot && (
                      <span className="sub-address">{sub.address}</span>
                    )}
                  </div>
                  {sub.location && dot && (
                    <span className="sub-location">{sub.location}</span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </ul>
    </Rnd>
  );
};

createRoot(document.getElementById("sidebar-map")).render(<Sidebar />);
