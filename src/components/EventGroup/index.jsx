import "./style.css";

const EventGroup = ({ eventData }) => {
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

export default EventGroup;
