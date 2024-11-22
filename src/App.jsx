import Sidebar from "./components/Sidebar";
const tabContentList = [
  {
    listId: 0,
    category: "OBJECTS",
    text: "MAHARASTRA (3)",
    subList: ["TS06UB7174", "TN52B5812", "MH40CM0912"],
  },
  {
    listId: 1,
    category: "OBJECTS",
    text: "SANKARI",
    subList: ["TN06UB8526", "KL07CA4142", "TS06UB8966"],
  },
];
const App = () => <Sidebar tabContentList={tabContentList} />;
export default App;
