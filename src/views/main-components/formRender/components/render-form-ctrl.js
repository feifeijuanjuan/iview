import mixinOptionExtensions from './mixin-package-option'
import mixinEnableWhen from './mixin-enable-when'
import {toCamelCase, isObject} from '../utils'
import MySelect from '../MyCategory.vue'
// import Dialog from '../../../my-components/dialog/main.vue'
import Modal from '../../../my-components/modal/modal.vue'
import File from '../../../my-components/file-upload/file.vue'
import Linkage from '../../../my-components/linkage/linkage.vue'
import Tree from '../../../my-components/tree/tree.vue'

function validator(data) {
    if (!data) {
        throw new Error('item data must be an Object.')
    } else if (!data.field_id) {
        throw new Error('item field_id is unvalidated.')
    }
    else if (!data.type) {
        throw new Error('item $type is unvalidated.')
    }
}

export default {
    mixins: [mixinOptionExtensions, mixinEnableWhen],
    props: {
        data: Object,
        prop: {
            type: String,
            default() {
                return '' + this.data.field_id
            }
        },
        itemValue: {},
        value: Object,
        disabled: Boolean
    },
    components: {
        MySelect,
        Modal,
        File,
        Linkage,
        Tree
    },
    computed: {
        // 是否显示
        _show() {
            return this.getEnableWhenSatatus()
        }
    },
    render(h) {
        validator(this.data) // 对数据进行简单校验
        let displayW = 'margin-bottom:0px;    padding-top: 4px;'
        if (this.data.type == 'text') {
            displayW += 'width: 100%;';
        }
        return h(
            'FormItem', {

                props: {
                    prop: this.prop,
                    rules: this._show && Array.isArray(this.data.rules) ? this.data.rules : []
                },
                attrs: this.data.$attrs,
                style: !this._show ? 'display: none;' : displayW// 使用 v-show 减少 dom 操作
            },
            [
                this.renderFormItemContent(h, this.data, this.itemValue)
            ]
        )
    },
    methods: {
        /**
         * 渲染表单项的内容
         * @param  {Object} data 表单属性定义
         * @param  {All} value 单项表单数据值
         */
        renderFormItemContent(h, data, value) {
            let obj = {}
            let props = Object.assign({}, obj, {value})
            this.disabled && (props.disabled = this.disabled) // 只能全局禁用, false时不处理
            let elType = data.type;
            switch (elType) {
                case "input":
                    return this.renderText(h, data, value, props);
                    break;
                case  "date":
                    return this.renderDate(h, data, value, props);
                    break;
                case "number":
                case 'calculation':
                    return this.renderNumber(h, data, value, props);

                    break;
                case "category":
                    return this.renderCategory(h, data, value, props);
                    break;
                case "relation":
                    return h(
                        'Modal'
                        , {
                            attrs: props, // 用于支持placeholder等原生属性(同时造成dom上挂载一些props)
                            props,
                            on: {
                                // 手动更新表单数据
                                input: (value) => {
                                    this.$emit('updateValue', {id: data.field_id, value})
                                }
                            }
                        }, [])

                    break;
                case "file":
                    return h(
                        'File'
                        , {
                            attrs: props, // 用于支持placeholder等原生属性(同时造成dom上挂载一些props)
                            props,
                            on: {
                                // 手动更新表单数据
                                input: (value) => {
                                    this.$emit('updateValue', {id: data.field_id, value})
                                }
                            }
                        }, [])

                    break;
                case "image":

                    break;
                case "linkage":
                    return h(
                        'Linkage'
                        , {
                            attrs: props, // 用于支持placeholder等原生属性(同时造成dom上挂载一些props)
                            props,
                            on: {
                                // 手动更新表单数据
                                input: (value) => {
                                    this.$emit('updateValue', {id: data.field_id, value})
                                }
                            }
                        }, [])
                case "tree":
                    return h(
                        'Tree'
                        , {
                            attrs: props, // 用于支持placeholder等原生属性(同时造成dom上挂载一些props)
                            props,
                            on: {
                                // 手动更新表单数据
                                input: (value) => {
                                    this.$emit('updateValue', {id: data.field_id, value})
                                }
                            }
                        }, [])
                case "select":
                    props = Object.assign({}, data.config);
                    return h(
                        'Select',
                        {
                            attrs: props, // 用于支持placeholder等原生属性(同时造成dom上挂载一些props)
                            props,
                            on: {
                                // 手动更新表单数据
                                input: (value) => {
                                    this.$emit('updateValue', {id: data.field_id, value})
                                }
                            }
                        },
                        //循环生成多个option
                        props.options.map((item)=>{return h('Option', {
                        props: {
                            value:item.value,
                            label: item.label
                        }
                    })})
                )
                //复选组
                case "checkbox-group":
                    props = Object.assign({}, data.config);
                    return h(
                        'CheckboxGroup'
                        , {
                            attrs: props, // 用于支持placeholder等原生属性(同时造成dom上挂载一些props)
                            props,
                            on: {
                                // 手动更新表单数据
                                input: (value) => {
                                    this.$emit('updateValue', {id: data.field_id, value})
                                }
                            },

                        },
                        props.options.map((item)=>{return h('Checkbox', {
                            props: {
                                label: item.label
                            }

                        })
                        })
                    )

                //单选组
                case "radio-group":
                    props = Object.assign({}, data.config);
                    return h(
                        'RadioGroup'
                        , {
                            attrs: props, // 用于支持placeholder等原生属性(同时造成dom上挂载一些props)
                            props,
                            on: {
                                // 手动更新表单数据
                                input: (value) => {
                                    this.$emit('updateValue', {id: data.field_id, value})
                                }
                            },

                        },
                        props.options.map((item)=>{return h('Radio', {
                            props: {
                                label: item.label
                            }

                        })
                        })
                    )

            }

        },

        renderText(h, data, value, props) {
            props = Object.assign({}, data.config);
            return h(
                'Input'
                , {
                    attrs: props, // 用于支持placeholder等原生属性(同时造成dom上挂载一些props)
                    props,
                    // type: data.config.type === 'textarea' ? 'textarea' : '',
                    on: {
                        // 手动更新表单数据
                        input: (value) => {
                            this.$emit('updateValue', {id: data.field_id, value})
                        }
                    }
                }, [])
        }

        , renderDate(h, data, value, props) {

            return h(
                'DatePicker'
                , {
                    attrs: props, // 用于支持placeholder等原生属性(同时造成dom上挂载一些props)
                    props,
                    type: data.config.type,
                    on: {
                        // 手动更新表单数据
                        input: (value) => {
                            this.$emit('updateValue', {id: data.field_id, value})
                        }
                    }
                }, [])
        }

        , renderNumber(h, data, value, props) {
            //千分符
            let forMatter = {
                "formatter": function (value) {
                    if (!/^(\+|-)?\d+(\.\d+)?$/.test(value)) {
                        return value;
                    }
                    let re = new RegExp().compile("(\\d)(\\d{3})(,|\\.|$)");
                    value += "";
                    while (re.test(value))
                        value = value.replace(re, "$1,$2$3");
                    return value;
                }
            };
            props = Object.assign({}, data.config);
            //判断需要进行哪种格式化
            if (props.fmt == "per") {
                props = Object.assign({}, data.config, forMatter);
            }
            return h('div', [
                h(
                    'InputNumber', {
                        attrs: props, // 用于支持placeholder等原生属性(同时造成dom上挂载一些props)
                        props,
                        // 手动更新表单数据
                        input: (value) => {
                            this.$emit('updateValue', {id: data.field_id, value})
                        },
                        on: {
                            'on-change': () => {

                            },

                        },
                        style: {
                            marginRight: '5px'
                        },
                    },
                ),
                h('span', data.config.unit_name)]
            )
        }
        /*,renderCategory(h, data, value,props)
        {
           //
           let itype
          if(data.config.display_mode=="select")
            itype ='Select';

          if(data.config.display_mode=="list")
            if(data.config.type == 'multi')
            itype ='CheckboxGroup';
            else
            itype ='RadioGroup';
          return h(
            itype
          , {
            attrs: props, // 用于支持placeholder等原生属性(同时造成dom上挂载一些props)
            props,
            multiple : data.config.type === 'multi' ? true : false,
            on: {
              // 手动更新表单数据
              input: (value) => {
                this.$emit('updateValue', { id: data.field_id, value })
              }
            }
          }, [
            (() => {
              let optRenderer = this[`${itype}_opt`]
              if (typeof optRenderer === 'function' && Array.isArray(data.config.options)) {
                return data.config.options.map(optRenderer)
              }
            })()
        ])
        }

        }
        */

        , renderCategory(h, data, value, props) {
            props = Object.assign(props, data.config)
            return h(
                'MySelect'
                , {
                    attrs: props, // 用于支持placeholder等原生属性(同时造成dom上挂载一些props)
                    props,
                    on: {
                        // 手动更新表单数据
                        input: (value) => {
                            this.$emit('updateValue', {id: data.field_id, value})
                        }
                    }
                }, []);


        }
    }
}

