<template>
  <section class="container">

    <h2 class="">This are published posts</h2>

    <div class="grid-container">
      <div class="grid-item" v-for="post in posts" :key="post.id">
        <img :src="post.content.image.filename" alt="">
        <h2>{{post.content.title}}</h2>
        <p>{{post.content.content}}</p>
      </div>
    </div>
    
  <!-- <pre>{{posts}}</pre> -->
  </section>
</template>
 
<script>
//https://github.com/storyblok/storyblok-js-client
import StoryblokClient from '~/node_modules/storyblok-js-client'


export default {
  data () {
    return {
      posts:[],
      findWord: '',
      replaceWord: '',
      showSuccessMessage: false,
      showErrorMessage: false
    }
  },

  created(){   
    // Populate the posts model
    this.getAllStories();
  },

  methods:{

    //Initial loading of posts
    getAllStories(){
      this.$storyapi.get('cdn/stories', {
        starts_with: 'posts/', //Name of the folder
        version: 'published'
      }).then((res) => {
       //console.log(res.data.stories)
       this.posts = res.data.stories
      }).catch((res) => {
        if (!res.response) {
          console.error(res)
        } else {
          console.error(res.response.data)
        }
      })
    },

  }


}
</script>



<style>
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
</style>