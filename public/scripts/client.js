$(document).ready(() => {
  const $tweetsContainer = $('.all-tweets');

  // make a request to /tweets and receive the array of tweets as JSON
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
      .then((tweets) => {
        renderTweets(tweets)
      });
  };

  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $tweetsContainer.prepend(tweetElement);
    }
  };

  const createTweetElement = function(tweetObj) {
    let $tweet = $(`
  <article class="tweet">
  <div class=tweet-profile><img src="${tweetObj.user.avatars}">${tweetObj.user.name}</img><span>${tweetObj.user.handle}</span></div>
  <div class="tweet-text">${tweetObj.content.text}</div>
  <footer>
    ${timeago.format(tweetObj.created_at)}
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

  // listen for the form to submit
  const $form = $('#form');
  $form.on('submit', (event) => {
    // prevents browser from default action
    event.preventDefault();
    // get + serialize the data from form
    const newTweet = $form.serialize();
    // send info to server with POST request
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: newTweet
    });
  });

  loadTweets();
});