<style>


    .value_category_select .mod_category {
        float: left;
        padding-right: 30px;
        word-break: break-all;
    }

    .mod_category.catcolor_o {
        padding: 0 12px;
        height: 30px;
        line-height: 30px;
        border-radius: 3px;
        -webkit-border-radius: 3px;
        overflow: hidden;
    }

    .mod_category {
        display: inline-block;
        margin-right: 5px
    }

    .value_category_select .mod_category .drop {
        margin-right: -18px;
    }

    .value_category_select .mod_category span {
        word-break: break-all;
    }

    .mod_category .drop {
        margin: 0 -18px 0 10px;
        float: right;

        padding-left: 1px;
        cursor: pointer;
        background: hsla(0, 0%, 100%, .1);
        width: 28px;
        text-align: center;
    }

    .ivu-dropdown-menu li.current {
        background: #cfeeff;
    }

    .ivu-dropdown-item .current:after {
        content: "\F383";
        display: inline-block;
        font-family: Ionicons;

        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        text-rendering: auto;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
        padding-left: 1px;
        color: #008ed2;
        margin-right: -20px;
        float: right;

    }
</style>
<template>
    <div style="display:inline-block;">
        <template v-if="display_mode=='select'">

            <Dropdown trigger="click" @on-click="changeValue">

                <div class="value_category_select">
             <span :class="'mod_category catcolor_o color_'+cvalue.color">
                   <span style="color:#fff">{{cvalue.name}}</span><span class="drop"><Icon type="arrow-down-b"
                                                                                           color="#fff"></Icon></span>
                 </span>
                </div>
                <DropdownMenu slot="list">
                    <DropdownItem v-for="(item, index) in _options" :key="index" :name="item.name"
                                  :class="item.status=='selected'?'current':''">
                        <Row type="flex" align="middle">

                            <span><Icon :size="14" type="record" :class="'color_f'+item.color"/>{{item.name}} </span>
                        </Row>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </template>

        <template v-else>
            <div class="value_category_select">
                <span :class="item.status=='selected'?'mod_category catcolor_o color_'+item.color : 'mod_category catcolor_o' "
                      v-for="(item, index) in _options" :key="index" :name="item.name" style=""
                      @click="changeValue(item.name)"><span
                        :style="item.status=='selected'?' cursor: pointer;color:#fff':' cursor: pointer;'">{{item.name}}</span></span>
            </div>
        </template>


    </div>
</template>
<script>
    export default {
        name: 'myCategory',
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            colorful: {
                type: Boolean,
                default: false
            },

            options:
                {
                    type: Array,
                    default: function () {
                        return new Array();
                    }
                }
            , display_mode:
                {
                    type: String,
                    default: 'list',
                }
            , type:
                {
                    type: String,
                    default: '',
                }

        },
        data() {
            return {
                cvalue: {name: '请选择', color: 'b'}
                // _options:this.options
            }
        },
        computed: {
            _options() {

                return this.options;
            }

        },
        methods: {
            changeValue(_name) {
                let _this = this;
                this.options.forEach(element => {
                    //单选
                    if (_this.type == 'single') {

                        if (element.name == _name)
                            element.status = 'selected';
                        else {
                            if (element.status == 'selected')
                                element.status = 'active'
                        }
                    } else {
                        if (element.name == _name) {

                            if (element.status == 'selected')
                                element.status = 'active';
                            else if (element.status == 'active')
                                element.status = 'selected';

                            console.log(element);
                        }
                    }
                });
                let result = _this.options.filter(function (item, index, array) {   //返回数组，filter函数获取满足条件的项
                    return (item.status == 'selected');
                });
                this.cvalue = _this.options.find(item => item.name === _name);
                this.$emit('input', result);
            }

        },
        created() {

        }
    }
</script>
