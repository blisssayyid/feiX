<template>
<div id='wrapper'>
  <div class='title-btns-search'>
    <div class='title-btns'>
      <div class='title-btn title-close' @click='closeSystem'>

      </div>

      <div class='title-btn title-minimize'>

      </div>

      <div class='title-btn title-maximize'>

      </div>
    </div>

    <div class='search'>
      <img id="icon-search"src="~@/assets/title-search.png">
      <input>
    </div>
  </div>
  <div class='menu-items'>
    <img class='menu-item' src='~@/assets/select-discuss.png'>
    <img class='menu-item' src='~@/assets/unselect-group.png'>
    <img class='menu-item' src='~@/assets/unselect-more.png'>
  </div>

  <img id='logo' src='~@/assets/logo.png'>
</div>
</template>

<script>
  export default {
    methods: {
      closeSystem: function (event) {
        console.log('123')
      }
    }
  }
</script>

<style scoped>
* {
  display: flex;
}

.title-btns {
  margin-left: 13px;
  align-items: center;
}

.title-btns-search {
  align-items: center;
}

.title-btn {
  width: 13px;
  height: 13px;
  margin-left: 3px;
  margin-right: 3px;
  border-radius: 90px;
}

.title-close {
  border: 0.5px solid #D25448;
  background-color: #ED6A5E;
}

.title-minimize {
  border: 0.5px solid #D8A244;
  background-color: #F6BF4F;
}

.title-maximize {
  border: 0.5px solid #57A943;
  background-color: #62C554;
}

.menu-items {
  width: 220px;
}

.menu-item {
  height: 26px;
  padding-right: 18px;
  padding-left: 18px;
}

.search {
  margin-left: 6px;
  background-color: #FFFFFF;
  justify-content:space-between;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 12px;
  width: 146px;
  height: 24px;
}

.search input {
  border: 0;
  margin: 0;
  padding: 0;
  outline: none;
  border-radius: 12px;
  width: 100%;
  height: 24px;
}

#icon-search {
  height: 12px;
  width: 12px;
  margin-right: 8px;
  justify-content: center;
}

#wrapper {
  height: 100%;
  width: 100%;
  background-color: #262626;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  -webkit-app-region: drag;
}

#logo {
  height: 16px;
  margin-right: 16px;
  margin-left: 60px;
}
</style>
