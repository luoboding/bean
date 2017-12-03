import $ from 'jquery';
import pathToRegexp from 'path-to-regexp';

export const Bean = {
    compile(template) {
        $([this.rootElement]).html(template);
    },
    handleRouteChange(hash) {
        const configMapping = this.configMapping;
        const hashPath = hash.substring(1, ((hash.indexOf('?') === -1) ? hash.length : hash.indexOf('?')) );
        const keys = Object.keys(configMapping);
        if (keys.indexOf('/') === -1) {
            throw new Error('you must have a root route in your route config');
        }
        if (!hashPath) {
            window.location.hash = "/";
            return;
        }
        if (keys.indexOf(hashPath) === -1) {
            throw new Error(`no matched route: ${hashPath}`);
        }
        for (let i = 0; i < keys.length; i++) {
            const path = keys[i];
            let namedKeys = [];
            const reg = pathToRegexp(path, namedKeys)
            const re = reg.exec(hashPath);
            if (re) {
                const routeParam = {};
                namedKeys.forEach((key, idx) => {
                    Object.assign(routeParam, {
                        [key.name]: re[idx+1],
                    });
                });
                const component = configMapping[path];
                const { controller } = component;
                const pageInstance = new controller({ routeParam });
                Object.assign(pageInstance, {
                    routeParam,
                });
                pageInstance.viewDidLoad();
                pageInstance.viewWillAppear();
                pageInstance.viewDidAppear();
                const template = pageInstance.render();
                // TODO: 解析模板
                $([this.rootElement]).off('click').on('click', (e) => {
                    const eventTarget = e.target;
                    const hasClickEvent = eventTarget.hasAttribute('@click');
                    if (hasClickEvent) {
                        const clickMethod = eventTarget.getAttribute('@click');
                        try {
                            window.pageInstance = pageInstance;
                            if (!pageInstance.hasOwnProperty(clickMethod)) {
                                throw new Error(`no method ${clickMethod} founded in current controller`);
                            }
                            pageInstance[clickMethod].apply(pageInstance, [e]);
                        } catch (e) {
                            throw e;
                        }
                    }
                });
                $([this.rootElement]).off('change').on('change', (e) => {
                    const eventTarget = e.target;
                    const hasClickEvent = eventTarget.hasAttribute('@change');
                    if (hasClickEvent) {
                        const clickMethod = eventTarget.getAttribute('@change');
                        try {
                            if (!pageInstance.hasOwnProperty(clickMethod)) {
                                throw new Error(`no method ${clickMethod} founded in current controller`);
                            }
                            pageInstance[clickMethod].apply(pageInstance, [e]);
                        } catch (e) {
                            throw e;
                        }
                    }
                });
                this.compile(template);
                break;
            }
        }
    },
    render(rootElement, configMapping) {
        this.rootElement = rootElement;
        this.configMapping = configMapping;
        const currentLocation = window.location;
        const hash = currentLocation.hash;
        this.handleRouteChange(hash);
        window.addEventListener('hashchange', (evt) => {
            const newURL = evt.newURL;
            const urlObject = new URL(newURL);
            const hash = urlObject.hash;
            this.handleRouteChange(hash);
        }, true);
        
    }
}