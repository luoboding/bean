export function observer(target, registerReactionForKey) {
  function invariant (key, action) {
    if (key[0] === '_') {
        throw new Error(`Invalid attempt to ${action} private "${key}" property`)
    }
  }
  const handler = {
    set(target, key, value, receiver) {
      invariant(key, 'set');
      if (typeof key === 'symbol') {
          return Reflect.set(target, key, value, receiver);
      }
      /**
       * array can update length;
       * value must be changed
       */
      if (key === 'length' || target[key] !== value) {
          const result = Reflect.set(target, key, value, receiver);
          registerReactionForKey(target, key);
          return result;
      }
      return Reflect.set(target, key, value, receiver);
    },
    get(target, key, receiver) {
        invariant(key, 'set');
        return Reflect.get(target, key, receiver);
    },
    defineProperty(target, key, descriptor) {
        if (typeof key !== 'symbol') {
          const result = Reflect.defineProperty(target, key, descriptor);
          registerReactionForKey(target, key);
          return result;
        }
        return Reflect.defineProperty(target, key, descriptor);
    },
    deleteProperty (target, key) {
        /**
         * only queue reactions for non symbol keyed property delete which resulted in an actual change
         * it will be ignored when delete a property
         */
        if (typeof key !== 'symbol' && key in target) {
          const result = Reflect.deleteProperty(target, key)
          registerReactionForKey(target, key);
          return result;
        }
        return Reflect.deleteProperty(target, key)
    }
  };
  return new Proxy(target, handler);
}
