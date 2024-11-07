import "./style.css";
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

export default TabItem;
