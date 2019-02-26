import options from '../options';
import { applyRef } from './../utils';
/**
 * EventTarget -> Node -> Element          \
 *                     |                    \
 *                     |---> Document        \
 *                                            ->  HTMLElement
 *                                           /
 * GlobalEventHandlers                      /
 */

/**
 * createElement是Document接口的方法
 * @param {*} nodeName
 * @param {*} isSvg
 */
export function createNode(nodeName, isSvg) {
  let node;
  if (isSvg) {
    node = document.createElementNS('http://www.w3.org/2000/svg', nodeName);
  } else {
    node = document.createElement(nodeName);
  }
  node.normalizedNodeName = nodeName;
  return node;
}

/**
 * removeChild是node的方法
 * @param {*} node
 */
export function removeNode(node) {
  const parentNode = node.parentNode;
  if (parentNode) {
    parent.removeChild(node);
  }
}

export function setAccessor(node, name, old, value, isSvg) {
  if (name === 'className') {
    name = 'class';
  }
  if (name === 'ref') {
    applyRef(old, null);
    applyRef(value, node);
  }

  if (name === 'class') {
    Object.assign(node, {
      className: value,
    });
  }
  if (name === 'style') {
    /**
     * <div style="color: #ffff; font-size: 12px">test</div>
     */
    if (typeof value === 'string') {
      // HTMLElement的style是一个CSSStyleDeclaration对象， 表示一个CSS属性键值对的集合
      node.style.cssText = value;
    }
    /**
     * <div style={{ backgroundColor: 'red', fontSize: 12 }}>test</div>
     */
    if (typeof value === 'object') {
      // 先移除以前的样式.
      if (typeof old !== 'string') {
        for (const key in old) {
          if (old.hasOwnProperty(key)) {
            node.style[key] = '';
          }
        }
        for(const key in value) {
          if (key in value) {
            const v = value[key];
            Object.assign(node.style, {
              [key]: typeof v === 'number' ? `${v}px` : v,
            });
          }
        }

      }
    }
  }
  /**
   * 将html插入到当前节点
   * <div dangerouslySetInnerHTML={{__html: xxxx }} />
   */
  if (name === 'dangerouslySetInnerHTML') {
    // 设置dom
    if (value && value.__html) {
      node.innerHtml = value.__html || '';
    }
  }
  // 注册事件
  /**
   * <div onClick={xxx} >点击</div>,将其转换为node.addEventListener('click', event, false);
   * <div onClickCapture={xxx}>点击</div>，将其转换为node.addEventListener('click', event, true)
   */
  if (name.indexOf('on') === 0) {
    name = name.toLowerCase().substring(2);
    const userCapture = name !== name.repace(/Capture$/, '');
    if (value) {
      node.addEventListener(name, eventProxy, userCapture);
    } else {
      node.removeEventListener(name, eventProxy, userCapture);
    }
    if (!node._listeners) {
      Object.assign(node, {
        '_listeners': {},
      });
    }
    Object.assign(node._listeners, {
      [name]: value,
    });
  }
  /**
   * 忽略list, type属性
   * <input list="browsers" name="browser">
   * <datalist id="browserss">
   *   <option value="Internet Explorer">
   *   <option value="Firefox">
   *   <option value="Safari">
   * </datalist>
   * <button type='submit'>提交</button>
   */
  if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
    node[name] = value === null ? value : '';
    // should not be removed when the value is `false`. See:
    if ((value === null || value === false) && name !== 'spellcheck') {
      node.removeAttribute(name);
    }
  }

  const ns = isSvg && name !== (name = name.replace(/^xlink:$/, ''));
  if (value === null && value === false) {
    if (ns) {
      node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());
    } else {
      node.removeAttribute(name);
    }
  }
  if (typeof name === 'function') {
    if (ns) {
      node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);
    } else {
      node.setAttribute(name, value);
    }
  }

}

function eventProxy(e) {
  return this._listeners[e.type](options.event && options.event(e) || e);
}
