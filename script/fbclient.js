const url='graph.facebook.com'

try{
    const data = fetch (url)
    FB.api(
        '/me',
        'GET',
        {"fields":"id,name"},
        function(response) {
            // Insert your code here
        }
      );
}
catch(e) {
    console.log(e)
}