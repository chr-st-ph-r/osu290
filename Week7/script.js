// news ticker!

var Ticker = {

  base_url: "https://content.guardianapis.com/search?api-key=" + config.key,
  stories: [],

  getStories: function(params) {
    var url = ((params) ? Ticker.base_url + params : Ticker.base_url);

    $.ajax({
      url: url
    })

    .fail(function(xhr, textStatus, errorThrown) {
      console.log(errorThrown);
    })

    .success(function(resp) {
      var data = resp.response.results;
      console.log(data);
      data.forEach(function(article) {
        var story = {
          headline: article.fields.headline,
          trail: article.fields.trailText,
          section: article.sectionName,
          url: article.webUrl
        }
        Ticker.stories.push(story);
      });
      Ticker.buildTape();
    });

  },

  buildTape: function() {
    Ticker.stories.forEach(function(story) {

      var $story = $('<div class="story"></div>');

      var $seperator = $('<span class="seperator"></span>')
        .text(" #")
        .appendTo($story);

      var $section = $('<span class="section"></span>')
        .html(story.section)
        .appendTo($story);

      var $headline = $('<span class="headline"></span>')
        .html(story.headline)
        .appendTo($story);

      var $trail = $('<span class="trail"></span>')
        .html(story.trail)
        .appendTo($story);

      var $body = $('<span class="body"></span>')
        .html(story.body)
        .appendTo($story);

      //console.log(story);

      var $seperator = $('<span class="seperator"></span>')
        .text(" /// ")
        .appendTo($story);

      $story.on('click', function() {
        $(this).find('span.body').css('display', 'block');
      });
      $story.appendTo('#ticker');


    })
  },
}

$(document).ready(function() {
  Ticker.getStories("&page-size=50&type=-liveblog&section=us-news&show-fields=headline,trailText,body");
});
