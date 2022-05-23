// 邮箱验证
export function validateEmail(rule, value, callbackFn) {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (value !== undefined && value !== '' && !reg.test(value)) {
    callbackFn('请输入正确的邮箱');
    return;
  }
  callbackFn();
}
export function validateClientId(rule, value, callbackFn) {
  const reg = /^[A-Za-z]+$/;
  if (!reg.test(value)) {
    callbackFn('只可输入英文字母');
    return;
  }
  callbackFn();
}
