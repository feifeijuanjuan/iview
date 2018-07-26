<template>
    <div class="main">
        <input @click="openMask" v-model="input2"></input>
        <dialog-bar v-model="sendVal" type="confirm" title="我是标题"  v-on:cancel="clickCancel"
                    @confirm="clickConfirm" confirmText="确认">
        </dialog-bar>
    </div>
</template>
<script>
    //引用dialog子组件
    import dialogBar from './dialog.vue'

    export default {
        components: {
            //命名的子组件名称
            'dialog-bar': dialogBar,
        },
        data() {
            //在data中定义需要传入的值
            return {
                sendVal: false,
                input2:''
            }
        },
        methods: {
            openMask(index) {
                this.sendVal = true;
            },
            clickCancel() {
                console.log('点击了取消');
            },
            clickConfirm(currentRow) {
                this.input2 =currentRow.name;
            }
        }
    }
</script>
<style lang="less" scoped>

</style>

