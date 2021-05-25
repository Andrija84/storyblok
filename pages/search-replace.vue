<template>
  <section class="container">

    <h2 class="">This is a search and replace page</h2>
    <p>Here you can search and replace inside all stories on Storyblok</p>
    <input type="text" placeholder="Enter word you want to replace" v-model="findWord">
    <input type="text" placeholder="Enter word to replace word entered above" v-model="replaceWord">
    <p v-if="showSuccessMessage">Word has been replaced</p>
    <p v-if="showErrorMessage">No matched words</p>
    <button @click="searchAndReplace">Replace</button>

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
    this.getAllStoriesLinks();
  },

  methods:{

    //Initial loading of posts
    getAllStories(){
      this.$storyapi.get('cdn/stories', {
        starts_with: 'posts/', //Name of the folder
        version: process.env.NODE_ENV == 'production' ? 'published' : 'draft'
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

    //https://www.storyblok.com/tp/how-to-generate-sitemap-headless-cms
    //https://www.storyblok.com/docs/api/content-delivery#core-resources/links/links
    getAllStoriesLinks(){
    this.$storyapi.get('cdn/links/', {
        starts_with: 'posts/', //Name of the folder
        version: process.env.NODE_ENV == 'production' ? 'published' : 'draft'
      }).then((res) => {
     //  console.log(res.data)
      // this.posts = res.data.stories
      }).catch((res) => {
        if (!res.response) {
          console.error(res)
        } else {
          console.error(res.response.data)
        }
      })
    },

    //Search & replace 
    searchAndReplace(){
   
      const managementApiKey =  this.$config.managementApiKey;
      //Initialize the client with the oauth token
      //https://www.storyblok.com/docs/api/management#topics/authentication
      const Storyblok = new StoryblokClient({
        oauthToken: managementApiKey
      });

      var findWord = this.findWord;
      var replaceWord = this.replaceWord;
      

        this.posts.forEach(post => {
          // post is a single object
          // RegExp will also work for phraze
          // Search only inside content

          var regexp = new RegExp(findWord, "gi");

          // Replace words only in content and title
          var originalPostContent= JSON.stringify(post.content.content);
          var originalPostTitle= JSON.stringify(post.content.title);
          
          var replacedPostContent = originalPostContent.replace(regexp, replaceWord);
          let updatedPostContent = JSON.parse(replacedPostContent); 

          var replacedPostTitle = originalPostTitle.replace(regexp, replaceWord);
          let updatedPostTitle = JSON.parse(replacedPostTitle); 

          var id = post.id;
          var slug = post.slug;
          var name = post.name;
          var title = updatedPostTitle;
          var imageUrl = post.content.image.filename;
          var content = updatedPostContent;

          //https://www.storyblok.com/docs/api/management#core-resources/stories/update-story
          Storyblok.put('spaces/115389/stories/' + id, {

            "story": {
              "name": name,
              "slug": slug,
              "id": id,
              "content": {
                "component": "post",
                "content": content,
                "title" : title,
                "image":{
                  "filename" : imageUrl
                },
              }
            },
            "force_update": 1,
            //"publish": 1 // Want to publish ?

          }).then(response => {
            this.showSuccessMessage = true;
            this.getAllStories();
          }).catch(error => { 
            this.showErrorMessage = true;
            console.log(error)
          })
     }

  )}
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