//???Is this true?do a require fs whenever you require a file
var fs = require('fs');


//require the keys.js file
var keys = require('./keys.js');

//do this because you are requiring to use the twitter npm package
//twitter npm package info https://www.npmjs.com/package/twitter
var twitter = require ("twitter");

var spotify = require("spotify");



//Request is designed to be the simplest way possible to make http 
//calls. It supports HTTPS and follows redirects by default.
var request = require('request');

//prompt is designed to put user's input
var prompt = require ('prompt')

//process.argv is whatever your type in, so you would require the prompt 
var command = process.argv[2];

var argument = process.argv[3];
//do this to match the twitter syntax, from (https://www.npmjs.com/package/twitter) 
//keys is the name of the file and twitterkeys is the name 
//of the export

//?? How do you test this out to make sure this works?
var angelTwitter = new twitter (keys.twitterKeys)


//build switch case
switch (command){
   case "my-tweets":
   		

        //testing out on console for my-tweets if this function works
        //console.log('my-tweets');
   			lookFormytweets()
			 break;
   
   case "spotify-this-song":
   //tested out spotify-this-song by console.log("spotifysong"), which is the function below
   			//console.log("spotifysong")
        //you do argument here because the command is set up to Blink182 as default
        spotifySong(argument) 

   			break;

   case "movie-this":
   			//test this by typing in console.log("movie-this")
        //console.log("movie-this")
   			movie(argument)
   			break;
   
	case "do-what-it-says":
			//name of function do-what
			console.log("do-what-it-says")
      doWhat()

			break;
  default:
  //this console.log for "Error in Your Request" will pop up if none of the cases pop up
    console.log("Error in your request")
    break;
} 

function lookFormytweets(){

//how do you test this if it this is running properly?
//To test this you run the twitter switch statement, which woudld be  node liri.js my-tweets 
//because you are calling the function
//to test the specific process.argv to the respective function (twitter, spotify, movie) it calls 
//user repsonse for process.argv, which is what the user types in

var params = {screen_name: 'trinhangel'};
angelTwitter.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {

  	for (var i =0; i<tweets.length; i++){
  	   console.log(tweets[i].text);
    }
    
  }
});
  
}




 
// How do you check if this is correct?
//search for spotify for a user selecting a song, if no input type in "Whats my Age Again by Blink 182"
function spotifySong(argument){
  var songtopass;

      //set this up to undefined if the user doesn't input anything
      if(argument=== undefined){

            songtopass = "whats my age again"; 

      } else {
            songtopass = argument;

      }

      console.log(songtopass);

      spotify.search({ type: 'track', query: songtopass}, function(error, data) {
        console.log('"whats  my age again" by blink 182');
        //do you add a for loop here to make it keep going and going? 
        //How do you check if this is correct? Just Psuedo coded here
        //var music = JSON.parse(data);
console.log(data)
          for (var i =0; i<data.tracks.items.length; i++){
                   //This console.log is for the artists. You put 0 here because it is 
                   //always going to be the first artists
                   console.log(data.tracks.items[i].artists[0].name);
                    //This console.log is for the song name
                    console.log(data.tracks.items[i].name);
                    //preview link of the song from spotify
                    console.log(data.tracks.items[i].preview_url);
                    //album name
                    console.log(data.tracks.items[i].album.name);


              }

    })
        // console.log("Artists " + music.Artists);
        // console.log("Song Name " + music.songname);
        // console.log("Preview Link from Spotify " + music.preview);
        // console.log("Album " + music.Album);



    // Do something with 'data' 
};



function movie(argument){
console.log("hi");

var movieTitle;

      //set this up to undefined if the user doesn't input anything
      if(argument=== undefined){

            movieTitle = "Mr.Nobody"; 

      } else {
            movieTitle = argument;

      }

//to test if this works with a movie type in liri.js movie-this "The Dark Knight"

    request("http://www.omdbapi.com/?t="+movieTitle+"&y=&plot=short&r=json", function(err, response, body){
        //the purpose of 200 is to tell  you if the server is down and that you got a good 
        //reponse from the server but unfortuantely it is not loading
        if(!err && response.statusCode == 200){
            body = JSON.parse(body);
            console.log("Title: " + body.Title);
            console.log("Year: " + body.Year); 
            console.log("IMDB RATING: " + body.imdbRating);
            console.log("Country: " + body.Country); 
            console.log("Plot " + body.Plot);
            console.log("Actors: "+ body.Actors);


        };
    });
};







function doWhat(){
	fs.readFile('random.txt', "utf8", function(error, data){
		console.log(data);

    textArray = data.split(',');
	
    spotifySong(textArray[1])
})
};


