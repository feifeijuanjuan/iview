<template>
    <div class="dialog" v-show="showMask">
        <div class="dialog-container">
            <div class="dialog-title">{{title}}</div>
                <Row>
                    <Input v-model="searchConName1" icon="search" @on-change="handleSearch1" style="width: 200px"/>
                </Row>
                <Row class="margin-top-10 searchable-table-con1">
                    <Table highlight-row  :columns="columns1" :data="data1"
                           @on-current-change="handleRowChange"></Table>
                </Row>
            <div class="btns">
                <div v-if="type == 'confirm'" class="confirm-btn" @click="confirmBtn">
                    {{confirmText}}
                </div>
                <div v-if="type != 'default'" class="default-btn" @click="closeBtn">
                    {{cancelText}}
                </div>
            </div>
            <div class="close-btn" @click="closeMask"><i class="iconfont icon-close"></i></div>
        </div>

    </div>
</template>
<script>
    import * as table from './data/table_data';

    export default {
        name: 'searchable-table',
        // props用于父组件向子组件传值
        props: {
            value: {},
            // 类型包括 defalut 默认， danger 危险， confirm 确认，
            type: {
                //定义传值的类型
                type: String,
                default: 'default'
            },
            title: {
                type: String,
                default: ''
            },
            cancelText: {
                type: String,
                default: '取消'
            },
            confirmText: {
                type: String,
                default: '确认'
            },
        },
        data() {
            return {
                showMask: false,
                tit: "lll",
                searchConName1: '',
                columns1: table.columns1,
                data1: []

            }
        },
        methods: {
            closeMask() {
                this.showMask = false;
            },
            closeBtn() {
                this.$emit('cancel');
                this.closeMask();
            },
            confirmBtn() {
                this.$emit('confirm',this.tit);
                this.closeMask();
            },
            init() {
                this.data1 = this.initTable1 = table.searchTable1
            },
            search(data, argumentObj) {
                let res = data;
                let dataClone = data;
                for (let argu in argumentObj) {
                    if (argumentObj[argu].length > 0) {
                        res = dataClone.filter(d => {
                            return d[argu].indexOf(argumentObj[argu]) > -1;
                        });
                        dataClone = res;
                    }
                }
                return res;
            },
            handleSearch1() {
                this.data1 = this.initTable1;
                this.data1 = this.search(this.data1, {name: this.searchConName1});
            },
            //获取选中行的数据
            handleRowChange(currentRow, oldCurrentRow){
                this.$emit('confirm',currentRow);
                this.closeMask();
            }
        },
        mounted() {
            this.showMask = this.value;
            this.init();
        },
        watch: {
            value(newVal, oldVal) {
                this.showMask = newVal;
            },
            showMask(val) {
                this.$emit('input', val);
            }
        },
    }
</script>
<style lang="less" scoped>
    @import '../../tables/components/table.less';

    .dialog {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 9999;
        .dialog-container {
            width: 500px;
            /*height: 380px;*/
            background: #ffffff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 8px;
            position: relative;
            .dialog-title {
                width: 100%;
                height: 60px;
                font-size: 18px;
                color: #696969;
                font-weight: 600;
                padding: 16px 50px 0 20px;
                box-sizing: border-box;
            }
            .content {
                color: #797979;
                line-height: 26px;
                padding: 0 20px;
                box-sizing: border-box;
            }
            .inp {
                margin: 10px 0 0 20px;
                width: 200px;
                height: 40px;
                padding-left: 4px;
                border-radius: 4px;
                border: none;
                background: #efefef;
                outline: none;
                &:focus {
                    border: 1px solid #509EE3;
                }
            }
            .btns {
                width: 100%;
                height: 60px;
                margin-top: 20px;
                // line-height: 60px;
                /*position: absolute;*/
                bottom: 0;
                left: 0;
                text-align: right;
                padding: 0 16px;
                box-sizing: border-box;
                & > div {
                    display: inline-block;
                    height: 40px;
                    line-height: 40px;
                    padding: 0 14px;
                    color: #ffffff;
                    background: #f1f1f1;
                    border-radius: 8px;
                    margin-right: 12px;
                    cursor: pointer;
                }
                .default-btn {
                    color: #787878;
                    &:hover {
                        color: #509EE3;
                    }
                }
                .danger-btn {
                    background: #EF8C8C;
                    &:hover {
                        background: rgb(224, 135, 135);
                    }
                    &:active {
                        background: #EF8C8C;
                    }
                }
                .confirm-btn {
                    color: #ffffff;
                    background: #509EE3;
                    &:hover {
                        background: #6FB0EB;
                    }
                }
            }
            .close-btn {
                position: absolute;
                top: 16px;
                right: 16px;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: 18px;
                cursor: pointer;
                &:hover {
                    font-weight: 600;
                }
            }
        }
    }
</style>
