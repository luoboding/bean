import Controller from "./../common/controller";
import './assets/login.css'

export default class LoginController extends Controller {
    data = {}
    constructor(params) {
        super(params);
        this.model = this.Model({})
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
    login = () => {
        this.model.updateModel(this.data);
    }
    userNameChange = (e) => {
        Object.assign(this.data, {
            username: e.target.value,
        });
        this.model.username = e.target.value;
    }
    passwordChange = (e) => {
        Object.assign(this.data, {
            password: e.target.value,
        });
    }
    render() {
        console.log('routeParam', this.routeParam)
        return `
            <div class='page-login'>
                <h1 class='login-title'>login page</h1>
                <div>
                    <label>用户名:</label>
                    <input type='text' value='${this.model.username || ''}' placeholder='用户名' @change="userNameChange" />
                </div>
                <div>
                    <label>密码:</label>
                    <input type='password' value='${this.model.password || ''}' placeholder='密码' @change="passwordChange" />
                </div>
                <div class=''>name is ${this.model.username || ''} password: ${this.model.password || ''}</div>
                <button @Click="login">登录</button>
            </div>
        `;
    }
};