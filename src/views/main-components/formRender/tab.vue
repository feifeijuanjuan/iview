<template>
    <Tabs value="name1">
        <TabPane  :label="t_label" :name="t_name" >
            <slot></slot>
        </TabPane>
    </Tabs>
</template>

<script>
    export default {
        name: "tab",
        data(){
            return{
                t_label: this.label,
                t_name:this.name
            }
        },
        props:{
            label: {
                type: String,
                default: ""
            },
            name: {
                type: String,
                default: ""
            }
        }
    }
</script>

<style scoped>

</style>