import { observer } from './../common/observer';
import Controller from "./../common/controller";
import './assets/login.css'

export default class LoginController extends Controller {
  data = {}
  constructor(params) {
    super(params);
    this.model = observer({});
  }
  viewDidLoad() {
      super.viewDidLoad();
  }
  viewWillAppear() {
      super.viewWillAppear();
  }
  viewDidAppear() {
      super.viewDidAppear();
  }
  login = (e) => {
    e.preventDefault();
      alert('登录成功');
  }
  userNameChange = (e) => {
    e.preventDefault();
    console.log('userNameChange e', e.target.value);
    this.model.username = e.target.value;
  }
  passwordChange = (e) => {
    e.preventDefault();
    console.log('passwordChange e', e);
    this.model.password = e.target.value;
  }
  render({ username, password }) {
    return `
      <div class='page-login'>
        <h1 class='login-title'>login page</h1>
        <div>
          <label>用户名:</label>
          <input type='text' value='${username || ''}' placeholder='用户名' @change="userNameChange" />
        </div>
        <div>
          <label>密码:</label>
          <input type='password' value='${password || ''}' placeholder='密码' @change="passwordChange" />
        </div>
        <input bean-bind='this.model.password' />
        <div style="height: 20px; width: 100px; background: red;" bean-bind="username" bean-show="username.length"></div>
        <div style="height: 20px; width: 100px; background: blue;" bean-bind="password" bean-show="password.length"></div>
        <div>
          <button @Click="login">登录</button>
        </div>
      </div>
    `;
  }
};
