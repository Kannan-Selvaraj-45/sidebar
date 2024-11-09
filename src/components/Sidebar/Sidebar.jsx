import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { GiTruck } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import "./Sidebar.css";
import { GripHorizontal } from "lucide-react";
import { Scrollbars } from "react-custom-scrollbars";
const tabsList = [
  { tabId: "OBJECTS", displayText: "Objects" },
  { tabId: "EVENTS", displayText: "Events" },
  { tabId: "HISTORY", displayText: "History" },
];

const tabContentList = [
  {
    listId: 0,
    category: "OBJECTS",
    text: "UNGROUPED (3)",
    subList: ["CONCRETE MIXER", "GD-1", "Service VAN"],
  },
  {
    listId: 1,
    category: "OBJECTS",
    text: "DOZER (3)",
    subList: ["DZ-1", "DZ-2", "DZ-3"],
  },
  {
    listId: 2,
    category: "OBJECTS",
    text: "EXCAVATOR (7)",
    subList: [
      "JCB-01",
      "JCB-02",
      "SANY EX-4",
      "SANY EX-5",
      "VOLVO EX-1",
      "VOLVO EX-2",
      "	VOLVO EX-3",
    ],
  },
  {
    listId: 3,
    category: "OBJECTS",
    text: "LMV (4)",
    subList: ["HR55TP0738", "LMV-1 BM2694", "LMV-2 BL5835", "LMV-3 BN3022"],
  },
  {
    listId: 4,
    category: "OBJECTS",
    text: "OTHER (1)",
    subList: ["DB-KA34C5140"],
  },
  {
    listId: 5,
    category: "OBJECTS",
    text: "PENDING (6)",
    subList: [
      "863719061453974",
      "864636061988966",
      "863719061454691",
      "864636061988966",
      "864636061988966",
      "863719061453974",
    ],
  },
  {
    listId: 6,
    category: "OBJECTS",
    text: "SANY DUMPER (10)",
    subList: [
      "SY-61",
      "SY-62",
      "SY-63",
      "SY-64",
      "SY-65",
      "SY-66",
      "SY-67",
      "SY-68",
      "SY-69",
      "SY-70",
    ],
  },
  {
    listId: 7,
    category: "OBJECTS",
    text: "SANY EXCAVATOR 870 (2)",
    subList: ["SANY-870-14", "SANY-870-16"],
  },
  {
    listId: 8,
    category: "OBJECTS",
    text: "TIPPERS (15)",
    subList: [
      "VE-01",
      "VE-02",
      "VE-03",
      "VE-04",
      "VE-05",
      "VE-06",
      "VE-07",
      "VE-08",
      "VE-09",
      "VE-10",
      "VE-11",
      "VE-12",
      "VE-13",
      "VE-14",
      "VE-15",
      "VE-16",
      "VE-17",
      "VE-18",
    ],
  },
  {
    listId: 9,
    category: "EVENTS",
    subList: {
      time: "10:00 AM - 11:00 AM",
      object: "Train",
      event: "Chennai",
    },
  },
  {
    listId: 10,
    category: "EVENTS",
    subList: {
      time: "11:00 AM - 12:00 PM",
      object: "Bus",
      event: "Delhi",
    },
  },
  {
    listId: 11,
    category: "EVENTS",
    subList: {
      time: "12:00 PM - 01:00 PM",
      object: "Truck",
      event: "Kerala",
    },
  },
  {
    listId: 12,
    category: "HISTORY",
    subList: [
      "CONCRETE MIXER",
      "GD-1",
      "Service VAN",
      "VE-01",
      "VE-02",
      "VE-03",
      "VE-04",
      "VE-05",
      "VE-06",
      "VE-07",
      "VE-08",
      "VE-09",
      "VE-10",
      "VE-11",
      "VE-12",
      "VE-13",
      "VE-14",
      "VE-15",
      "VE-16",
      "VE-17",
      "VE-18",
      "863719061453974",
      "864636061988966",
      "863719061454691",
      "864636061988966",
      "864636061988966",
      "863719061453974",
      "HR55TP0738",
      "LMV-1 BM2694",
      "LMV-2 BL5835",
      "LMV-3 BN3022",
    ],
  },
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

const EventGroup = (props) => {
  const { eventData } = props;
  console.log(eventData.subList.time);
  return (
    <ul className="events-ul">
      <li className="event-item">
        <p className="item-data"> {eventData.subList.time}</p>
        <p className="item-data"> {eventData.subList.object}</p>
        <p className="item-data"> {eventData.subList.event}</p>
      </li>
    </ul>
  );
};

const HistoryGroup = (props) => {
  const { historyData } = props;

  const defaultTime = "12:30";
  const [time, setTime] = useState(defaultTime);

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  return (
    <div className="history-container">
      <div className="device-container">
        <p className="history-text">Device:</p>
        <select className="select">
          {historyData.subList.map((eachItem) => (
            <option key={eachItem}>{eachItem}</option>
          ))}
        </select>
      </div>
      <div className="from-container">
        <div className="from-para">
          <p className="history-text">From:</p>
        </div>
        <div className="input-container">
          <input
            className="input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            className="input"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>
      <div className="from-container">
        <div className="from-para">
          <p className="history-text">To:</p>
        </div>
        <div className="input-container">
          <input
            className="input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            className="input"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>
      <div className="button-container">
        <button className="show-history-button">Show History</button>
        <button className="show-history-button">Reset</button>
      </div>
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

  return (
    <div className="background">
      <Draggable>
        <div className="nav-container" handle=".drag-handle">
          <div className="drag-handle" aria-label="Drag to move sidebar">
            <GripHorizontal size={20} />
          </div>
          <ul className="nav-bar">
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

          {activeTab === "EVENTS" && (
            <ul className="list-group-container" style={{ color: "black" }}>
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
              <div className="event-data-container">
                <ul className="event-data-ul">
                  <li className="event-data-head">Time</li>
                  <li className="event-data-head">Object</li>
                  <li className="event-data-head">Event</li>
                </ul>
              </div>
              {filterTabDetails.map((eachItem) => (
                <EventGroup key={eachItem.listId} eventData={eachItem} />
              ))}
            </ul>
          )}

          {activeTab === "HISTORY" && (
            <ul className="list-group-container" style={{ color: "black" }}>
              {filterTabDetails.map((eachItem) => (
                <HistoryGroup key={eachItem.listId} historyData={eachItem} />
              ))}
            </ul>
          )}
        </div>
      </Draggable>
    </div>
  );
};

export default Sidebar;
