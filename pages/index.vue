<template>
  <section class="container">
    <h2 class="">This is homepage and also a all posts list page</h2>

    <div class="grid-container">
      <div class="grid-item" v-for="post in stories" :key="post.id">
        <a :href="post.full_slug">
          <img :src="post.content.image.filename" alt="">
          <h2>{{post.content.title}}</h2>
          <p>{{post.content.content}}</p>
        </a>
      </div>
    </div>

  </section>
</template>
 
<script>
export default {
  data () {
    return {
      stories: [],
    }
  },
  asyncData (context) {
    return context.app.$storyapi.get('cdn/stories', {
      starts_with: 'posts/',
      version: process.env.NODE_ENV == 'production' ? 'published' : 'draft'
    }).then((res) => {
      //console.log(res.data)
      return res.data
    }).catch((res) => {
      if (!res.response) {
        //console.error(res)
        context.error({ statusCode: 404, message: 'Failed to receive content form api' })
      } else {
        console.error(res.response.data)
        context.error({ statusCode: res.response.status, message: res.response.data })
      }
    })
  }
}
</script>

<style scoped>
.container{max-width:1200px;margin:0 auto;}
.grid-container {
  display: grid;
  grid-template-columns: calc(33.3% - 25px) calc(33.3% - 25px) calc(33.3% - 25px);
  background-color: #f5f5f5;
  padding: 10px;
  gap: 20px 25px;
}
.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;
}
.grid-item img{object-fit:contain;width:100%;height:200px;}
input, button{margin:12px 0;height:32px;}
p{font-size:16px;}
a{text-decoration: none;color:#000;}

</style>