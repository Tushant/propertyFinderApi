import { OrderedMap, Iterable } from 'immutable';

/**
 * Replaces list of object in JSON to map of object, extracting defined key parameter as map-key.
 *
 * @param  {string} key  The key to extracted to set map-key.
 *
 * @return {function} Returns reviver function
 */
const reviver = (key, forceMapWhenEmpty) => (k, v) => {
  const isKeyed = Iterable.isKeyed(v);
  if (!isKeyed) {
    try {
      if (forceMapWhenEmpty && v.size === 0) {
        return v.toMap();
      }

      if (v.first().has(key)) {
        let newobj = new OrderedMap();
        v.toList().forEach((value) => {
          newobj = newobj.set(value.get(key), value);
        });
        return newobj;
      }
      return v.toList();
    } catch (e) {
      return v.toList();
    }
  }
  return v.toOrderedMap();
};

export default reviver;
