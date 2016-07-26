var fs = require('fs');
var twitter = require ("twitter");
var spotify = require("spotify");
var request = require('request');
var prompt = require ('prompt');

//process.argv is whatever your type in, so you would require the prompt 
var command = process.argv[2];
var argument = process.argv[3];
var angelTwitter = new twitter (keys.twitterKeys)

//build switch case
switch (command){
   case "my-tweets":
   			lookFormytweets()
			 break;
   
   case "spotify-this-song":
        spotifySong(argument) 
   			break;

   case "movie-this":
   			movie(argument)
   			break;
   
	case "do-what-it-says":
			console.log("do-what-it-says")
      doWhat()
			break;

  default:
    console.log("Error in your request")
    break;
} 

function lookFormytweets(){

var params = {screen_name: 'trinhangel'};
angelTwitter.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
  	for (var i =0; i<tweets.length; i++){
  	console.log(tweets[i].text);
    }; 
  };
});  
};

function spotifySong(argument){
  var songtopass;
    if(argument=== undefined){
      songtopass = "whats my age again"; 
      } else {
        songtopass = argument;
      };
      console.log(songtopass);

      spotify.search({ type: 'track', query: songtopass}, function(error, data) {
        console.log('"whats  my age again" by blink 182');
        console.log(data)
        
        for (var i =0; i<data.tracks.items.length; i++){
          console.log(data.tracks.items[i].artists[0].name);
          console.log(data.tracks.items[i].name);
          console.log(data.tracks.items[i].preview_url);
          console.log(data.tracks.items[i].album.name);
        };
      });
};

function movie(argument){
console.log("hi");

var movieTitle;

  if(argument=== undefined){

    movieTitle = "Mr.Nobody"; 

    } else {
      movieTitle = argument;
    };

  request("http://www.omdbapi.com/?t="+movieTitle+"&y=&plot=short&r=json", function(err, response, body){
        //the purpose of 200 is to tell  you if the server is down and that you got a good 
        //reponse from the server but unfortunately it is not loading
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


