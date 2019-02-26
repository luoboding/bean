/**
 * 更新或者调用ref
 * @param {object|function} ref
 * @param {any} value
 */
export function applyRef(ref, value) {
  if (ref) {
    if (typeof ref === 'function') {
      ref(value);
    } else {
      ref.current = value;
    }
  }
}

/**
 * Copy all properties from `props` onto `obj`.
 */
export function extend(obj, props) {
  for (const key in props) {
    obj[key] = props[key];
  }
  return obj;
}
