import RenderFormCtrl from './components/render-form-ctrl'
import {
    Form
} from 'iview'
import FormGroup from './form-group'
import RenderCell from './render-cell'
import Tab from './tab.vue'

export default {
    render(h) {
        /* 这里的render（h）其实对应render(creatElement),createElement(tag,{},String)第一个参数是标签名。后面两个参数是可选的。第二个参数是
          是一个数据对象,代表用在该节点的属性，class,style,props,on等，第三个参数表示该节点下还有其他节点*/
        console.log('this.field_layout');
        console.log(this.field_layout);
        console.log(this.tabs);
        // this.content.forEach(this.initItemValue) // handle default value
        return h(
            'i-form', {
                props: Object.assign({}, this._props, {
                    model: this.value // 用于校验
                }),
                ref: 'iForm'
            },
            [h('Tabs',{value:"tab"},[
                this.tabs.map((item,index)=>{
                    return h('TabPane', {
                            props: {
                                label: `${item.label}`,
                                name: `${item.name}`
                            }
                        },
                        this.field_layout.map((item, index) => {
                            return h('FormGroup', {
                                    props: {
                                        title: `${item.title}`,
                                    }
                                },
                                item.rows.map((row, index) => {
                                    return this.renderRows(h, row);
                                }))
                        })
                    )
                })
            ])])

              //this.$slots.default 子组件中的阵列


    },
    components: {
        RenderFormCtrl,
        FormGroup,
        RenderCell,
        Tab
    },
    mounted() {
        this.$nextTick(() => {
            // proxy

            Object.keys(Form.methods).forEach((item) => {
                this[item] = this.$refs.iForm[item]
            })
        })
    },
    props: Object.assign({}, Form.props, {
        fields: {
            type: Array,
            required: true
        },
        fields_value: {
            type: Array,
            required: true
        },
        field_layout: {
            type: Array,
            required: true
        },
        tabs: {
            type: Array,
            required: true
        },
        // 禁用所有表单
        disabled: {
            type: Boolean,
            default: false
        }
    }),
    data() {
        return {
            value: {} // 表单数据对象
        }
    },
    methods: {

        getFieldsData(id) {
            //判断field_id是否与row id相同
            let field = this.fields.find(field => field.field_id === id);
            // let fieldValue  = this.fields_value.find(field => field.field_id === id);

            return {
                title: field.name,
                props:
                    {
                        key: id,
                        data: field,
                        value: this.value,
                        itemValue: undefined,
                        disabled: this.disabled
                    },
                on: {
                    updateValue: this.updateValue
                }
            }
        }
        ,
        renderCells(h, cell) {
            const data = this.getFieldsData(cell);
            return h('RenderCell', {
                props: {
                    title: data.title,
                }
            }, [
                h('render-form-ctrl', data)
            ])
        },
        renderRows(h, row) {

            return h('div', {
                    'class': 'item_row cl item_row_field',
                },
                row.map((item, index) => {
                    return this.renderCells(h, item);
                })
            );

        },
        /**
         * 初始化每个表单原子的默认值
         * @param  {Object} item 表单原子描述
         */
        initItemValue(item) {

        },
        /**
         * 更新表单数据
         * @param  {String} options.id 表单ID
         * @param  {All} options.value 表单数据
         */
        updateValue({
                        id,
                        value
                    }) {
            this.value = Object.assign({}, this.value, {
                [id]: value
            })
        },
        // 对外提供获取表单数据的函数
        getFormValue() {
            return this.value
        }
    }
}