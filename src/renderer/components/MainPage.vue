<template>
  <el-container id='wrapper' style="direction: vertical">
    <el-header style="height: 55px">
      <SearchHeader/>
    </el-header>

    <el-container id='container' style="direction: horizontal">
      <el-aside style="width: 226px">
    
      </el-aside>

      <el-main>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import SearchHeader from './header/SearchHeader.vue'
  export default {
    components: {
      SearchHeader
    }
  }
</script>

<style scoped>
* {
  display: flex;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#wrapper {
  width: 100%;
  height: 100%;
}

#container {
  background-color: #FFFFFF;
  width: 100%;
  height: 100%;
}

.el-aside {
  height: 100%;
  flex-direction: column;
  background-color: #FFFFFF;
}

.el-main {
  height: 100%;
  width: 100%;
  border-left:1px solid rgba(64, 158, 255, 0.1);
  flex-direction: column;
  background-color: #FFFFFF;
}
</style>
