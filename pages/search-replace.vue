<template>
  <section>
    <h2 class="">This is a search and replace page</h2>
    <p>Here you can search and replace inside all stories on Storyblok</p>
    <input type="text" placeholder="Enter word you want to replace" v-model="findWord">
    <input type="text" placeholder="Enter word to replace word entered above" v-model="replaceWord">
    <p v-if="showSuccessMessage">Word has been replaced</p>
    <p v-if="showErrorMessage">No matched words</p>
    <button @click="searchAndReplace">Replace</button>

    
    <pre>{{posts}}</pre>


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
  methods:{

    //Initial loading of posts
    getAllStories(){
      this.$storyapi.get('cdn/stories', {
        starts_with: 'posts/',
        version: 'draft'
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



    searchAndReplace(){
   
      var findWord = this.findWord;
      var replaceWord = this.replaceWord;
 
       this.posts.forEach(post => {
        // post is a single object
        // RegExp will also work for phraze
        // Search only inside content

        var regexp = new RegExp(findWord, "gi");

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

        var managementApiKey =  this.$config.managementApiKey;

       

        // Initialize the client with the oauth token
        //https://www.storyblok.com/docs/api/management#topics/authentication
        const Storyblok = new StoryblokClient({
          oauthToken: ''

   
        });
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
                  //"publish": 1

                }).then(response => {
                  //console.log(response)
                  this.getAllStories();
                }).catch(error => { 
                  console.log(error)
                })
     }

  )}
  },
 
  created(){     
    this.getAllStories();
    console.log(this.$config.managementApiKey)
  }


}
</script>