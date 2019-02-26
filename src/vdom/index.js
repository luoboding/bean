import { extend } from './../utils';
import { VNode } from '../vnode';

/**
 * 判断两个node是否相同
 * @param {*} node
 * @param {*} vnode
 * @param {*} hydrating
 */
export function isSameNodeType(node, vnode, hydrating) {

}

/**
 * 判断是否为一个自定义nodeName的节点
 * @param {import { Element } from "./../dom";} node
 * @param {String} 非标准的名字
 * @returns {Boolean}
 */
export function isNamedNode(dom, nodeName) {
  return dom.normalizedNodeName === nodeName && dom.nodeName.toLowerCase() === nodeName.toLowerCase();
}

/**
 * 获取VNode的props
 * @param {import { VNode } from "../vnode";} vnode
 * @returns {Object}
 */
export function getNodeProps(vnode) {
  const props = extend({}, vnode.attributes);
  extend(props, {
    children: vnode.children,
  });
  const { defaultProps } = vnode.nodeName;
  if (defaultProps) {
    for(const key in  defaultProps) {
      if (props[key] === undefined) {
        props[key] = defaultProps[key];
      }
    }
  }
  return props;
}
