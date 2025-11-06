// Copy the source map into the target map
export default function copy(target, source) {
  for (const [key, sourceValue] of source.entries()) {
    if (sourceValue instanceof Map) {
      // Subtree; recurse to copy
      let targetValue = target.get(key);
      if (targetValue === undefined) {
        // Target key doesn't exist; create empty subtree
        target.set(key, new Map());
        targetValue = target.get(key);
      }
      copy(targetValue, sourceValue);
    } else {
      // Copy the value from the source to the target.
      target.set(key, sourceValue);
    }
  }
  return target;
}
