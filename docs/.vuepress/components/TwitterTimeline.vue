<template>
    <div class="tw-timeline">
        <Timeline :id="'nakanakamu0828'" :sourceType="'profile'" :options="{ tweetLimit: '5' }"/>
    </div>
</template>

<script>
import { Tweet, Moment, Timeline } from 'vue-tweet-embed'
export default {
  components: {
    Timeline
  }
}
</script>

<style>
@media (min-width: 719px) {
  .tw-timeline {
      padding: 2rem 10rem;
  }
}
</style>

