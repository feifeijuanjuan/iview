<template>
    <al-cascader v-model="res1" level="2"/>
</template>

<script>
    import alCascader from '../area-linkage/components/al-cascader.vue';
    export default {
        name: "linkage",
        data(){
            return{
                res1: [],
            }
        },
        components:{
            alCascader
        }

    }
</script>

<style scoped>
    @import '../area-linkage/area-linkage.less';
    @import '../../../styles/common.less';
</style>