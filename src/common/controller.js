import { Bean } from "./bean";
import { Reflect } from "core-js/library/web/timers";
export default class Controller {
    constructor(params) {
        console.log('super params', params);
        console.log('super', this.model);
    }
    viewDidLoad() {
        console.log('super view did load');
    }
    viewWillAppear() {
        console.log('super view will appear');
    }
    viewDidAppear() {
        console.log('super view did appear');
    }
    login = () => {
        console.log('login')
    }
}