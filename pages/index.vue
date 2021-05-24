<template>
  <section>
    <h2 class="">This is homepage and also a all posts list page</h2>
    <ul id="posts-list">
      <li v-for="post in stories" :key="post.id">
      <nuxt-link :to="post.full_slug">{{ post.name }}</nuxt-link>
      </li>
    </ul>

  </section>
</template>
 
<script>
export default {
  data () {
    return {
      stories: []
    }
  },
  asyncData (context) {
    return context.app.$storyapi.get('cdn/stories', {
      starts_with: 'posts/',
      version: 'draft'
    }).then((res) => {
      //console.log(res.data)
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