<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },

  data() {
    return {
      isRouterAlive: true
    }
  },
  mounted() {
    document.oncontextmenu = function () { return false; };
    document.onselectstart = function () { return false; };
  },
  updated() {
    // 失焦屏蔽
    /**/
    window.onblur = function () {
      document.getElementById('app').style.display = 'none';
    };
    window.onfocus = function () {
      document.getElementById('app').style.display = 'block';
    };

  },

  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  height: 100vh;
}

.el-submenu__title:focus,
.el-submenu__title:hover,
.el-submenu__title:active {
  background-color: rgba(255, 255, 255, 0.15) !important;
}

.el-switch__label--left.is-active {
  color: #F56c6c !important;
}

.el-scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}

/*上面隐藏横向滚动条会导致下拉框底部遮盖问题*/
.el-select-dropdown .el-scrollbar {
  padding-bottom: 17px;
}
</style>
