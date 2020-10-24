<template>
  <div class="content">
    <div id="my-slider3" :se-min="min3Threshold" :se-step="step" :se-min-value="min3" :se-max-value="max3" :se-max="max3Threshold" class="slider">
      <div class="slider-touch-left">
        <span></span>
      </div>
      <div class="slider-touch-right">
        <span></span>
      </div>
      <div class="slider-line">
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
import ZbRangeSlider from './ZbRangeSlider'
export default {
  props: {
    min3Threshold: {
      type: Number,
      default: -100
    },
    max3Threshold: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    min3: {
      type: Number,
      required: true
    },
    max3: {
      type: Number,
      required: true
    }
  },
  data: function () {
    return {
      instance: undefined
    }
  },
  mounted: function () {
    this.instance = new ZbRangeSlider('my-slider3')
    this.instance.onChange = (min3, max3) => this.updateValues(min3, max3)
  },
  destroyed: function () {
  },
  methods: {
    updateValues: function (min3, max3) {
      this.$emit('update:min3', min3)
      this.$emit('update:max3', max3)
    }
  }
}
</script>

<style>
.slider {
  display: block;
  position: relative;
  height: 36px;
  width: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.slider .slider-touch-left,
.slider .slider-touch-right {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: block;
  position: absolute;
  height: 36px;
  width: 36px;
  padding: 6px;
  z-index: 2;
}
.slider .slider-touch-left span,
.slider .slider-touch-right span {
  display: block;
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  border: 1px solid #a4a4a4;
  border-radius: 50%;
}
.slider .slider-line {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  width: calc(100% - 36px);
  left: 18px;
  top: 16px;
  height: 4px;
  border-radius: 4px;
  background: #f0f0f0;
  z-index: 0;
  overflow: hidden;
}
.slider .slider-line span {
  display: block;
  height: 100%;
  width: 0%;
  background: #00b5ad;
}
</style>