…or create a new repository on the command line
echo "# edu" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Lavi-Vu/edu.git
git push -u origin main
…or push an existing repository from the command line
git remote add origin https://github.com/Lavi-Vu/edu.git
git branch -M main
git push -u origin main

//populate 
    //   account.findOne({
    //     firstName: 'Nguyen'
    // })
    // .populate('list_course.course')
    // .then(data=>{
    //     console.log(data)
    // })
    // .catch(err=>{
    //     console.log(err)
    // })

    
<!-- <script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '{your-app-id}',
      cookie     : true,
      xfbml      : true,
      version    : '{api-version}'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script> -->