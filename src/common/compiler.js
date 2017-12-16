const sandboxProxies = new WeakMap();

function has (target, key) {
  return true;
}

function get (target, key) {
  // 忽略with排除的属性
  if (key === Symbol.unscopables) return undefined;
  return target[key];
}

export default function compileJSCode(code) {
  const advancedCode = 'with(sandbox) {' + code + '}';
  const exector = Function('sandbox', advancedCode);
  return function (sandbox) {
    if (!sandboxProxies.has(sandbox)) {
      const sandboxProxy = new Proxy(sandbox, { get, has });
      sandboxProxies.set(sandbox, sandboxProxy);
    }
    return exector(sandboxProxies.get(sandbox));
  }
}
