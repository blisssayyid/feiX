<template>
    <el-container id='wrapper' style="direction: vertical">
        <el-header style="height: 55px">
            <SearchHeader/>
        </el-header>

        <el-container id='container' style="direction: horizontal">
            <el-aside style="width: 226px">

            </el-aside>

            <el-main>
                <img id='empty-pic' src='~@/assets/coding.png'/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import SearchHeader from './header/SearchHeader.vue'

    export default {
        components: {
            SearchHeader
        },
        mounted: function () {
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
        min-height: 503px;
        flex-direction: column;
        background-color: #FFFFFF;
    }

    .el-main {
        min-height: 503px;
        width: 100%;
        align-items: center;
        justify-content: center;
        border-left: 1px solid rgba(64, 158, 255, 0.1);
        flex-direction: column;
        background-color: #FFFFFF;
    }

    #empty-pic {
        height: 100px;
        width: 100px;
        opacity: 0.7;
    }
</style>
