import { observable, action } from "mobx";
import axios, { AxiosResponse } from "axios";
import History from "../history";

export default class UserStore {
  @observable
  isLogin: boolean = false;
    
  @action.bound
  login(payload: { username: string; password: string }) {
    axios
      .post("https://api.crazymad.top/api/auth/login/submit", payload)
      // .post("http://localhost:8089/api/auth/login/submit", payload)
      .then((res: AxiosResponse) => {
        this.isLogin = true;
        if (res.status === 201) {
          History.history && History.history.push("/");
        }
      });
  }
  
  @action.bound
  register(payload: { username: string, email: string, password: string }) {
    axios.post("https://api.crazymad.top/api/auth/register/submit", payload).then((res: AxiosResponse) => {
    // axios.post("http://localhost:8089/api/auth/register/submit", payload).then((res: AxiosResponse) => {
      if (res.status === 201) {
        History.history && History.history.push("/auth/login");
      }
    });
  }

}
