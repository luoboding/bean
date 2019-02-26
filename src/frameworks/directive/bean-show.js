import $ from 'jquery';
import { } from '../compiler';

export default function(target, key, model) {
  const value = target[key];
  const elements = $(` [bean-show]`);
  const expression = elements.attr('bean-show');
  if (expression) {
    /**
     * 解析表达式， 获取表达式的计算结果
     */
    const compileExpression = compiler(`return ${expression}`)(model);
    const display = compileExpression ? 'block' : 'none';
    elements.css({
      display,
    });
  }
}
