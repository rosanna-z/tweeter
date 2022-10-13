/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(() => {

  const $tweetsContainer = $('.all-tweets');

  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      console.log('this is tweet', tweetElement)
      $tweetsContainer.append(tweetElement);
    }

  };

  const createTweetElement = function(tweetObj) {
  let $tweet = $(`
  <article class="tweet">
  <div class=tweet-profile><img src="${tweetObj.user.avatars}">${tweetObj.user.name}</img><span>${tweetObj.user.handle}</span></div>
  <div class="tweet-text">${tweetObj.content.text}</div>
  <footer>
    ${tweetObj.created_at}
    <span>
      <i class="fa-sharp fa-solid fa-flag"></i>
      <i class="fa-solid fa-heart"></i>
      <i class="fa-solid fa-retweet"></i>
    </span>
  </footer>
</article>
  `);
  return $tweet;
  };

  renderTweets(data);

});