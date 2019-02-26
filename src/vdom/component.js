import { SYNC_RENDER, NO_RENDER, FORCE_RENDER, ASYNC_RENDER, ATTR_KEY } from '../constants';
import options from '../options';
import { extend, applyRef } from '../util';
import { enqueueRender } from '../render-queue';
import { getNodeProps } from './index';
import { diff, mounts, diffLevel, flushMounts, recollectNodeTree, removeChildren } from './diff';
import { createComponent, recyclerComponents } from './component-recycler';
import { removeNode } from '../dom/index';

/**
 * Set a component's `props` and possibly re-render the component
 * @param {import('../component').Component} component The Component to set props on
 * @param {object} props The new props
 * @param {number} renderMode Render options - specifies how to re-render the component
 * @param {object} context The new context
 * @param {boolean} mountAll Whether or not to immediately mount all components
 */
export function setComponentProps(component, props, renderNode, context, mountAll) {
  if (component._disable) return;
  component._disable = true;
  component.__ref = props.ref;
  component.__key = props.key;
  delete props.ref;
  delete props.key;
  if (typeof component.constructor.getDerivedStateFromProps === 'undefined') {
    // 首次挂载
    if (!component.base || mountAll) {
      if (component.componentWillMount) {
        component.componentWillMount();
      }
    }
    // 属性变化
    if (component.componentWillReceiveProps) {
      componentWillReceiveProps(props, context);
    }
  }
  if (context && context !== component.context) {
    if (!component.prevContext) component.prevContext = component.context;
    component.context = context;
  }
  if (!component.prevProps) component.prevProps = component.props;
  component.props = props;
  component._disable = false;
  if (renderMode !== NO_RENDER) {
    // 开始重新渲染. 第一次渲染
    if (renderMode === SYNC_RENDER || options.syncComponentUpdates !== false || !component.base) {
      renderComponent(component, SYNC_RENDER, mountAll);
    } else {
      enqueueRender(component);
    }
  }
  applyRef(component.__ref, component);
}

/**
 * Render a Component, triggering necessary lifecycle events and taking
 * High-Order Components into account.
 * @param {import('../component').Component} component The component to render
 * @param {number} [renderMode] render mode, see constants.js for available options.
 * @param {boolean} [mountAll] Whether or not to immediately mount all components
 * @param {boolean} [isChild] ?
 * @private
 */
export function renderComponent(component, renderMode, mountAll, isChild) {
  if (component._disable) return;
  const props = component.props;
  let state = component.state;
  const context = component.context;
  const previousProps = component.prevProps || props;
  const previousState = component.prevState || state;
  const previousContext = component.prevContext || context;
  const isUpdate = component.base;
  const nextBase = component.nextBase;
  const initialBase = isUpdate || nextBase;
  const initialChildComponent = component._component;
  const skip = false;
  const snapshot = previousContext;
  let rendered;
  let inst;
  let cbase;
  if (component.constructor.getDerivedStateFromProps) {
    state = extend(extend({}, state), component.constructor.getDerivedStateFromProps(props, state));
    component.state = state;
  }
  if (isUpdate) {
    component.state = previousState;
    component.props = previousProps;
    component.context = previousContext;
    if (renderMode !== FORCE_RENDER && component.shouldComponentUpdate && !component.shouldComponentUpdate(props, state, context)) {
      skip = true;
    }
    if (component.componentWillUpdate) {
      component.componentWillUpdate(props, state, context);
    }
    component.props = props;
		component.state = state;
		component.context = context;
  }

  if (!skip) {

  }

}
