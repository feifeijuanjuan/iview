<template>
    <Tree :data="data3" show-checkbox :load-data="loadData"></Tree>
</template>
<script>
    import * as tree from './data/tree_data';

    export default {
        data() {
            return {
                data3: tree.treeParentDara
            }
        },
        methods: {
            loadData(item, callback) {
                setTimeout(() => {
                    const data = tree.treeChildData;
                    callback(data);
                }, 1000);
            }
        }
    }
</script>


<style scoped>

</style>