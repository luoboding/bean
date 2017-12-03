import { Bean } from "./bean";
export default class Controller {
    constructor(params) {
        console.log('super params', params);
        console.log('super', this.model);
    }
    Model(a) {
        const self = this;
        return {
            ...a,
            updateModel(data) {
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const newValue = data[key];
                        const oldValue = this[key];
                        if (newValue !== oldValue) {
                            Object.assign(this, {
                                [key]: newValue,
                            });
                        }
                    }
                }
                Bean.compile(self.render());
            },
        };
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