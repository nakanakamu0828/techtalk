<template>
  <div class="frame-wrapper__video">
    <youtube :video-id="videoId"></youtube>
  </div>
</template>

<script>
import Vue from 'vue'
import VueYouTubeEmbed from 'vue-youtube-embed'
Vue.use(VueYouTubeEmbed)
export default {
    props: ['videoId']
}
</script>

<style>
.frame-wrapper__video {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  overflow: hidden;
  margin-bottom: 1rem;
  margin-top: 1rem;
}
.frame-wrapper__video iframe {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>

