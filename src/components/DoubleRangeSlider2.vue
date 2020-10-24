<template>
  <div class="content">
    <div id="my-slider2" :se-min="min2Threshold" :se-step="step" :se-min-value="min2" :se-max-value="max2" :se-max="max2Threshold" class="slider">
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
    min2Threshold: {
      type: Number,
      default: -100
    },
    max2Threshold: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    min2: {
      type: Number,
      required: true
    },
    max2: {
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
    this.instance = new ZbRangeSlider('my-slider2')
    this.instance.onChange = (min2, max2) => this.updateValues(min2, max2)
  },
  destroyed: function () {
  },
  methods: {
    updateValues: function (min2, max2) {
      this.$emit('update:min2', min2)
      this.$emit('update:max2', max2)
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