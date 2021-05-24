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

    getAllStories(){
      this.$storyapi.get('cdn/stories', {
        starts_with: 'posts/',
        version: 'draft'
      }).then((res) => {
        console.log(res.data.stories)



      }).catch((res) => {
        if (!res.response) {
          console.error(res)
        } else {
          console.error(res.response.data)
        }
      })
    },

    searchAndReplace(){
      this.$storyapi.get('cdn/stories', {
        starts_with: 'posts/',
        version: 'draft'
      }).then((res) => {
        console.log(res.data.stories)

        this.posts = res.data.stories;
        var findWord = this.findWord;
        var replaceWord = this.replaceWord;

       /* var originalMsg = JSON.stringify(res.data.stories);
        
        var regexp = new RegExp(findWord, "gi");
        var updatedMsg = originalMsg.replace(regexp, replaceWord);
        var newObj = JSON.parse(updatedMsg); 
        console.log(newObj);
       */ 


       res.data.stories.forEach(post => {
          // post is a single object
          var originalPost= JSON.stringify(post);
          var regexp = new RegExp(findWord, "gi");
          var replacedPost = originalPost.replace(regexp, replaceWord);
          let updatedPost = JSON.parse(replacedPost); 

          //console.log(updatedPost)

                var id = updatedPost.id;
                var slug = updatedPost.slug;
                var name = updatedPost.name;
                var content = updatedPost.content.content

          //https://www.storyblok.com/docs/api/management#core-resources/stories/update-story
                //const StoryblokClient = require('storyblok-js-client')

      // Initialize the client with the oauth token
      const Storyblok = new StoryblokClient({
        oauthToken: 'vHAbQz5zhR6Hzb2BmuzV1Att-87915-4g4D7EWkuarXzGL5whDr'
      })

        Storyblok.put('spaces/115389/stories/' + id, {

                  "story": {
                    "name": name,
                    "slug": slug,
                    "id": id,
                    "content": {
                      "component": "post",
                      "content": content
                    }
                  },
                  "force_update": 1,
                  //"publish": 1

                }).then(response => {
                  console.log(response)
                }).catch(error => { 
                  console.log(error)
                })
         

       })







      }).catch((res) => {
        if (!res.response) {
          console.error(res)
        } else {
          console.error(res.response.data)
        }
      })
    },

  },
 
  created(){     
    this.getAllStories();
  }

}
</script>