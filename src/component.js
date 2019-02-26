import { FORCE_RENDER } from './constants';
import { extend } from './util';
import { renderComponent } from './vdom/component';
import { enqueueRender } from './render-queue';

/**
 * Base Component class.
 * Provides `setState()` and `forceUpdate()`, which trigger rendering.
 * @typedef {object} Component
 * @param {object} props The initial component props
 * @param {object} context The initial context from parent components' getChildContext
 * @public
 *
 * @example
 * class MyFoo extends Component {
  *   render(props, state) {
  *     return <div />;
  *   }
  * }
  */
export function Component(props, context) {
  this._dirty = true;
  this.context = context;
  this.props = props;
  this.state = this.state || {};
  this._renderCallbacks = [];
}

Object.assign(Component.prototype, {
  setState(state, callback) {
    if (!this.prevState) this.prevState = this.state;
    this.state = extend(extend({}, this.state), typeof state === 'function' ? state(this.state, this.props) : state);
    if (callback && typeof callback === 'function') {
      this._renderCallbacks.push(callback);
    }
    // TODO: 更新组建
  },
  forceUpdate(callback) {
    if (callback && typeof callback === 'function') {
      this._renderCallbacks.push(callback);
    }
    // TODO: 更新组建
  },
  // 构建虚拟dom树
  render() {
  }
})
