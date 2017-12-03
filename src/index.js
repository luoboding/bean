import { Bean } from './common/bean';
import IndexController from './index/controller';
import LoginController from './login/controller';
import './index.css';

Bean.render(document.getElementById('root'), {
    '/': {
        title: '首页',
        controller: IndexController,
    },
    '/login': {
        title: '登录',
        controller: LoginController,
    },
});
