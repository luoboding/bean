import $ from 'jquery';

export default function(target, key) {
  const value = target[key];
  const elements = $(` [bean-bind='${key}']`);
  elements.text(value);
  // or input, if input has bean-bind property, the value will be readOnly.
  // not be two-way bind.
  elements.val(value);
}
