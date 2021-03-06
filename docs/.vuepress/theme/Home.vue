<template>
  <div>
    <div class="home">
      <div class="hero">
        <img v-if="data.heroImage" :src="$withBase(data.heroImage)" alt="hero">
        <h1>{{ data.heroText || $title || 'Hello' }}</h1>
        <p class="description">
          {{ data.tagline || $description || 'Welcome to your VuePress site' }}
        </p>
        <img :src="$withBase('/profile.jpg')" alt="Nakamu" class="author-image">

        <a v-if="data.authorLink" :href="data.authorLink" class="author-title" target="_blank">{{ data.authorTitle || 'Hello' }}</a>
        <p v-else class="author-title">{{ data.authorTitle || 'Hello' }}</p>


        <p class="action" v-if="data.actionText && data.actionLink">
          <NavLink class="action-button" :item="actionLink"/>
        </p>
      </div>
      <div class="features" v-if="data.features && data.features.length">
        <div class="feature" v-for="feature in data.features">
          <h2>{{ feature.title }}</h2>
          <p>{{ feature.details }}</p>
        </div>
      </div>
      <div v-if="data.blogs && data.blogs.length">
        <h2>{{ data.blogTitle }}</h2>
        <div class="columns">
          <div class="column is-4" v-for="blog in data.blogs">
            <Card :item="blog" />
          </div>
        </div>
        <p class="action" style="text-align: center;" v-if="data.blogText && data.blogLink">
          <NavLink class="action-button" :item="blogLink"/>
        </p>
      </div>
      <Content custom/>
    </div>
    <div class="footer" v-if="data.footer">
      <p v-html="data.footer"></p>
      <p class="sns">
        <a v-if="data.githubUrl" :href="data.githubUrl" target="_blank" class="button is-circle"><i class="fab fa-github"></i></a>
        <a v-if="data.twitterUrl" :href="data.twitterUrl" target="_blank" class="button is-circle"><i class="fab fa-twitter"></i></a>
        <a v-if="data.email" :href="`mailto:${data.email}`" target="_blank" class="button is-circle"><i class="far fa-envelope"></i></a>
      </p>
    </div>
  </div>
</template>

<script>
import NavLink from './NavLink.vue'
import Card from '../components/Card.vue'

export default {
  components: { NavLink, Card },
  computed: {
    data () {
      return this.$page.frontmatter
    },
    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    },
    blogLink () {
      return {
        link: this.data.blogLink,
        text: this.data.blogText
      }
    }
  }
}
</script>

<style lang="stylus">
@import './styles/config.styl'

.home
  padding $navbarHeight 2rem 0
  max-width 960px
  margin 0px auto
  .hero
    padding: 1rem
    text-align center
    img:not(.author-image)
      max-height 280px
      display block
      margin 3rem auto 1.5rem
    h1
      font-size 3rem
      font-family: Lobster,cursive;
    h1, .description, .action
      margin 1.8rem auto
    img.author-image
      border-radius: 50%;
      width: 10rem;
      border: 3px solid #ff5f5f
    .author-title
      font-size 2rem
      margin-top 1rem
      display block
      color #2c3e50
      
    .description
      max-width 35rem
      font-size 1.6rem
      line-height 1.3
      color lighten($textColor, 40%)
  .action-button
    display inline-block
    font-size 1.2rem
    color #fff
    background-color $accentColor
    padding 0.8rem 1.6rem
    border-radius 4px
    transition background-color .1s ease
    box-sizing border-box
    border-bottom 1px solid darken($accentColor, 10%)
    &:hover
      background-color lighten($accentColor, 10%)
  .features
    border-top 1px solid $borderColor
    padding 1.2rem 0
    margin-top 2.5rem
    display flex
    flex-wrap wrap
    align-items flex-start
    align-content strech
    justify-content space-between
  .feature
    flex-grow 1
    flex-basis 30%
    max-width 30%
    h2
      font-size 1.4rem
      font-weight 500
      border-bottom none
      padding-bottom 0
      color lighten($textColor, 10%)
    p
      color lighten($textColor, 25%)
.footer
  padding 2.5rem
  border-top 1px solid $borderColor
  text-align center
  color lighten($textColor, 25%)
  .sns
    margin-top: 2rem
    margin-bottom 0
    & > a
      margin 0 .4rem

@media (max-width: $MQMobile)
  .home
    .features
      flex-direction column
    .feature
      max-width 100%
      padding 0 2.5rem

@media (max-width: $MQMobileNarrow)
  .home
    padding-left 1.5rem
    padding-right 1.5rem
    .hero
      img:not(.img.author-image)
        max-height 210px
        margin 2rem auto 1.2rem
      h1
        font-size 2rem
      h1, .description, .action
        margin 1.2rem auto
      .description
        font-size 1.2rem
      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem
    .feature
      h2
        font-size 1.25rem
</style>
