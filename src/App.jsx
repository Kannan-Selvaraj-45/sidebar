import { useState } from "react";
import TabItem from "./components/TabItem";
import ListGroup from "./components/ListGroup";
import { FaSearch } from "react-icons/fa";
import "./style.css";
import EventGroup from "./components/EventGroup";
import HistoryGroup from "./components/HistoryGroup";
import Draggable from "react-draggable";

// import { PiLessThanBold, PiGreaterThanBold } from "react-icons/pi";
import "react-resizable/css/styles.css";

const tabsList = [
  { tabId: "OBJECTS", displayText: "Objects" },
  { tabId: "EVENTS", displayText: "Events" },
  { tabId: "HISTORY", displayText: "History" },
];

const tabContentList = [
  {
    listId: 0,
    category: "OBJECTS",
    text: "Ungrouped (3)",
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

const App = () => {
  const [activeTab, setActiveTab] = useState(tabsList[0].tabId);
  const [searchTerm, setSearchTerm] = useState("");
  // const [collapsed, setCollapsed] = useState(false);

  const changeTabId = (id) => {
    setActiveTab(id);
  };

  const filterTabDetails = tabContentList.filter(
    (eachList) => eachList.category === activeTab
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // const toggleCollapse = () => {
  //   setCollapsed(!collapsed);
  // };

  return (
    <div className="background">
      <Draggable>
        {/* <div className={`nav-container ${collapsed ? "collapsed" : ""}`}>
          <div className="hider-bg-container" onClick={toggleCollapse}>
            <div className="hider-container">
              {collapsed ? <PiGreaterThanBold /> : <PiLessThanBold />}
            </div>
          </div> */}
        <div className="nav-container">
          {/* {!collapsed && (
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
          )} */}
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

              {filterTabDetails.map((eachGroup) => (
                <ListGroup
                  key={eachGroup.listId}
                  listDetails={eachGroup}
                  searchTerm={searchTerm}
                />
              ))}
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

export default App;
