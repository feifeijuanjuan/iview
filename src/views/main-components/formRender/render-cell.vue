<template>
<div class="item_cell">
    <div class="item_field">
        <div class="item_field_label">
            <strong>{{title}}</strong>
            <i v-if="required" class="required">*</i>
        </div>
        <div class="item_field_value">
            <slot></slot>
        </div>
    </div>
</div>
</template>
<script>
export default {
  name: "RenderCell",
  props: {
    title: {
      type: String,
      default: ""
    },
    required:{
      type: Boolean,
      default: false
    },
  }
}
</script>