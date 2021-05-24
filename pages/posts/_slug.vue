<template>
  <section>
    <Post :blok="story.content"/>
  </section>
</template>
 
<script>
import Post from '~/components/Post.vue'
 
export default {
  components: {
    Post
  },
  data () {
    return {
      story: { content: {} }
    }
  },
  mounted () {

  },
  asyncData (context) {
    // Load the JSON from the API
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'
 
    return context.app.$storyapi.get(`cdn/stories/posts/${context.params.slug}`, {
      version: version
    }).then((res) => {
      //console.log(res)
      return res.data
    }).catch((res) => {
      if (!res.response) {
        console.error(res)
        context.error({ statusCode: 404, message: 'Failed to receive content form api' })
      } else {
        console.error(res.response.data)
        context.error({ statusCode: res.response.status, message: res.response.data })
      }
    })
  }
}
</script>