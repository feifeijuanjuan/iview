/**
 * 扩展表单组件的 option 属性
 */
function controller (h, tag, props) {
  return h(tag, {
    props: Object.assign({}, props, {
      value: props.id  ,
      label: props.name  
    })
  
})
}

function controllerVariation (h, tag, props) {
  return h(tag, {
    props: Object.assign({}, props, {
      key: props.id  ,
      label: props.name  
    })
  }, props.name)
}

export default {
  methods: {
    Select_opt (item) {
      console.log(item)
      return controller(this.$createElement, 'i-option', item)
    },

    RadioGroup_opt (item) {
      return controllerVariation(this.$createElement, 'Radio', item)
    },

    radioButton_opt (item) {
      return controllerVariation(this.$createElement, 'i-radio-button', item)
    },

    CheckboxGroup_opt (item) {
      return controllerVariation(this.$createElement, 'Checkbox', item)
    },

    checkboxButton_opt (item) {
      return controllerVariation(this.$createElement, 'i-checkbox-button', item)
    }
  }
}
