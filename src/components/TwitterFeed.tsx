const TwitterFeed = () => {
  return (
    <>
      <a
        className="twitter-timeline"
        href="https://twitter.com/DevlinDuldulao?ref_src=twsrc%5Etfw"
        data-tweet-limit="5"
      >
        Tweets by DevlinDuldulao
      </a>
      <script async src="https://platform.twitter.com/widgets.js"></script>
    </>
  );
};

export default TwitterFeed;
