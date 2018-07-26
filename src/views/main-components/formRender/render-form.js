import RenderFormCtrl from './components/render-form-ctrl' 
import {
  Form
} from 'iview'
import FormGroup from './form-group'
import RenderCell from './render-cell'
export default {
  render(h) {
    console.log('this.field_layout');
    console.log(this.field_layout);
    // this.content.forEach(this.initItemValue) // handle default value
    return h(
      'i-form', {
        props: Object.assign({}, this._props, {
          model: this.value // 用于校验
        }),
        ref: 'iForm'
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
      .concat(this.$slots.default))


  },
  components: {
    RenderFormCtrl, 
    FormGroup,
    RenderCell
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

    getFieldsData(id)
    {
      let field  = this.fields.find(field => field.field_id === id);
     // let fieldValue  = this.fields_value.find(field => field.field_id === id);
      
      return {
        title:field.name,
        props: 
        {
          key: id ,
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
          title:data.title,
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