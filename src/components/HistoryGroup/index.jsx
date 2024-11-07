import { useState } from "react";
import "./style.css";

const HistoryGroup = (props) => {
  const { historyData } = props;

  const defaultTime = "12:30";
  const [time, setTime] = useState(defaultTime);

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  return (
    <div className="history-container">
      <div className="device-container">
        <p>Device:</p>
        <select className="select">
          {historyData.subList.map((eachItem) => (
            <option key={eachItem}>{eachItem}</option>
          ))}
        </select>
      </div>
      <div className="from-container">
        <div className="from-para">
          <p className="from">From:</p>
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
          <p className="from">To:</p>
        </div>
        <div className="input-container">
          <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
          <input className="input" type="time" value={time}  onChange={(e) => setTime(e.target.value)}/>
        </div>
      </div>
      <div className="button-container">
        <button className="show-history-button">Show History</button>
        <button className="show-history-button">Reset</button>

      </div>
    </div>
  );
};
export default HistoryGroup;
