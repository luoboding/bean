import Controller from "./../common/controller";
export default class IndexController extends Controller {
    render() {
        return `
            <div class='page-login'>
                <h1>首页</h1>
                <div>
                    这是一个学习用的前端框架，他的名字叫bean, 还有很多么有添加，譬如模板引擎,指令集
                </div>
                <div>huhu <a href="/#/login">登录</a></div>
            </div>
        `;
    }
};