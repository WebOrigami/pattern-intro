// Copy the source map into the target map
export default function copy(source, target) {
  for (const [key, sourceValue] of source.entries()) {
    if (sourceValue instanceof Map) {
      // Subtree; recurse to copy
      let targetValue = target.get(key);
      if (targetValue === undefined) {
        // Target key doesn't exist; create empty subtree
        const empty = target.constructor.EMPTY ?? new target.constructor();
        target.set(key, empty);
        targetValue = target.get(key);
      }
      copy(sourceValue, targetValue);
    } else {
      // Copy the value from the source to the target.
      target.set(key, sourceValue);
    }
  }
  return target;
}
