<template>
    <div>
        <Input v-model="value"  icon="search" @on-click="modal1=true" ></Input>
        <!--<Button type="primary" @click="modal1 = true">显示对话框</Button>-->
        <Modal
                v-model="modal1"
                title="对话框标题"
                @on-ok="ok"
                @on-cancel="cancel">
            <Row>
                <Input v-model="searchConName1" icon="search" @on-change="handleSearch1" style="width: 200px"/>
            </Row>
            <Row class="margin-top-10 searchable-table-con1">
                <Table highlight-row :columns="columns1" :data="data1"
                       @on-current-change="handleRowChange"></Table>
            </Row>
        </Modal>
    </div>

</template>
<script>
    import * as table from './data/table_data';

    export default {
        name: 'searchable-table',
        data() {
            return {
                modal1: false,
                value: '',
                searchConName1: '',
                columns1: table.columns1,
                data1: []
            }
        },
        methods: {
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
            handleRowChange(currentRow, oldCurrentRow) {
                this.value = currentRow.name;
            },
            ok() {
                // this.$options.methods.handleRowChange()
            },
            cancel() {

            }
        },
        mounted() {
            this.init();
        }
    }
</script>
