import Vue from 'vue';
import store from '@/store';

/**
 * Action 权限指令
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
 *    <i-button v-action:add >添加用户</a-button>
 *    <a-button v-action:delete>删除用户</a-button>
 *    <a v-action:edit @click="edit(record)">修改</a>
 *
 *  - 当前用户没有权限时，组件上使用了该指令则会被隐藏
 *  - 当后台权限跟 pro 提供的模式不同时，只需要针对这里的权限过滤进行修改即可
 *
 *  @see https://github.com/vueComponent/ant-design-vue-pro/pull/53
 */
const action = Vue.directive('action', {
  inserted: function(el, binding, vnode) {
    const actionName = binding.arg;
    console.log('actionName=' + actionName);
    const permissions = store.getters.permissions;
    const elVal = vnode.context.$route.meta.permission;
    const permissionId = (elVal instanceof String && [elVal]) || elVal;
    console.log(permissionId);
    permissions.forEach(p => {
      if (p.type !== 1 || !permissionId.includes(p.code)) {
        return;
      }
      const actionList = permissions.filter(i => i.type === 2 && i.parent && i.parent.id === p.id);
      if (actionList && !actionList.some(a => a.code === actionName)) {
        (el.parentNode && el.parentNode.removeChild(el)) || (el.style.display = 'none');
      }
    });
  }
});

export default action;
