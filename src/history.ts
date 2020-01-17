import { createBrowserHistory, createMemoryHistory } from "history";
let History: any = {
  history: null
};

export default History;

export function createHistory(url: string) {
  let history = createBrowserHistory();
  History.history = history;

  return history;
}
