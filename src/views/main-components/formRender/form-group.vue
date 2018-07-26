<template>
  <div :class="classes" style="margin-bottom:30px">
       <div :class="HeadClasses">
            <div :class="HeadLayoutClasses">
               <!--<img :src="getIcon"> -->
                <span :title="s_title">{{s_title}}</span>
            </div>
        </div>
  
    <div   :style="bodyStyles">
        <slot></slot>
    </div>
  </div >
</template>
<script>
const prefixCls = "itw-card";
const padding = 0;
export default {
  name: "ToolsCard",
  props: {
    title: {
      type: String,
      default: ""
    },
    icon: {
       type: String,
       default: ""
    },
    borderBottomColor: {
      type: String,
      default: "red"
    },
    /**head是否加鼠标手形效果 */
    hand: {
      type: Boolean,
      default: false
    },
    isShoWBorder:{
      type: Boolean,
      default: false
    },
    /**更多跳转 */
    morePath: {
      type: String,
      default: ""
    },
    bodyPadding: {
      type: Number,
      default: padding
    },
    bodyPaddingLeft: {
      type: Number,
      default: padding
    },
    bodyPaddingRight: {
      type: Number,
      default: padding
    },
    bodyPaddingTop: {
      type: Number,
      default: padding
    },
    bodyPaddingBottom: {
      type: Number,
      default: padding
    },
    bodyHeight: {
      type: [Number, String],
      default: 'auto'
    },
    titleBold: {
      type: Boolean,
      default: false
    },
    /**type==style3时有效 */
    titleFontSize: {
      type: Number,
      default: 14
    }
  },
  data() {
    return {
      s_title: this.title,
    };
  },
  methods: {
    headClickEvent() {
      if (this.hand && this.morePath) {
        this.$router.push({ path: this.morePath });
      }
    }
  },
  computed: {
    classes() {
      return `${prefixCls}`;
    },
    bodyClasses() {
      return `${prefixCls}-body`;
    },
    bodyStyles() {
      let _styles = {};
      if (this.bodyPadding == padding) {
        _styles.paddingTop = `${this.bodyPaddingTop}px`;
        _styles.paddingRight = `${this.bodyPaddingRight}px`;
        _styles.paddingBottom = `${this.bodyPaddingBottom}px`;
        _styles.paddingLeft = `${this.bodyPaddingLeft}px`;
      } else {
        _styles.padding = `${this.bodyPadding}px`;
      }
      
      if (this.bodyHeight) {
        if (this.bodyHeight === "auto") {
        } else {
          _styles.height = `${this.bodyHeight}px`;
        }
      }
      if(this.isShoWBorder)
      {
        _styles.border="#c5edfd solid 1px";

      }
      return _styles;
    },
    HeadClasses() {
      return [
        `${prefixCls}-style1-head`,
        {
          [`${prefixCls}-style1-head-hand`]: !!this.hand,
          [`${prefixCls}-title-bold`]: this.titleBold
        }
      ];
    },
    HeadLayoutClasses() {
      return `${prefixCls}-style1-head-layout`;
    },
    HeadMoreClasses() {
      return `${prefixCls}-style1-head-more`;
    },
    HeadBorderBottomColor() {
      let _styles = {};
      _styles.fontSize = `${this.titleFontSize}px`;
      _styles.borderBottomColor = `${this.borderBottomColor}`;
      return _styles;
    },
    getIcon() {
       return this.s_icon ;
    }
  }
};
</script>

<style lang="less" scoped>
.itw-card {
  width: 100%;
}

 

.itw-card-title-bold {
  font-weight: bold;
}

.itw-card-style1-head {
  height: 32px;
  position: relative;
}

.itw-card-style1-head-hand {
  cursor: pointer;
}

.itw-card-style1-head-layout {
  float: left;
  border-bottom: #2d8cf0 solid 3px;
  padding: 0 10px 0 5px;
  position: absolute;
  left: 0;
  bottom: 0;
}

.itw-card-style1-head-layout img {
  width: 30px;
  height: 25px;
  margin-bottom: -3px;
}

.itw-card-style1-head-layout span {
  font-size: 18px;
}

</style>
