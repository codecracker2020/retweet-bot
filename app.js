let Twit = require("twit");

//Create an Instance of Twitter API and Authenticate using App Keys 
let T = new Twit(require("./config"));
//Our Search Object 
let searchHashtag = { q: "#javascript", count: 1, result_type: "recent" };
//We will use #coding hashtag just because we like coding :)
//The main function to search and retweet
function retweet() {
    console.log('RETWEET')
   //Send a GET Request to search/tweets inorder to get the tweets with the Query 
   T.get("search/tweets", searchHashtag, (err, data) => {
           //Check for any errors 
           if (err) {
               console.log("Cannot Grab Latest Tweet On Hashtag: ", err);
               return; ///< exit function
           }
           console.log("Data: ", data); ///< Quick Test
           if (data && data.statuses.length > 0) {
            //Tweets are on an array on the searched object (data.statuses)
            let tweet = data.statuses[0];
            //We want to retweet only one tweet so we access the first one (0 index)
            console.log(tweet); ///< LOG IT 
            //Retweet using the tweet's ID 
            T.post("statuses/retweet/" + tweet.id_str, { status: 'Experimental BOT from India Retweeted this' },(e, res) => {
                //Any Errors?
                if (e) {
                    console.log("Cannot Retweet your Tweet!",e);
                    return;
                }
                //Success
                if (res) {
                    console.log("Success, Check your Account for the Retweet!");
                }
            });
        } else {
            //Empty Statuses Array (Hashtag has no tweets!)
            console.log("No Tweets on the Hashtag: ", searchHashtag.q);
        }
    })
}
//Use SetInterval function for running the retweet function each hour 
// setInterval(retweet, 3600 * 1000); 
setInterval(retweet, 10000); 
//Hour = 3600 second and each second has 1000 ms => 3600 * 1000 ms
