$(document).ready(function()
{
    var stories = $('#gospels S');
    var nStories = stories.length;
    var current = 0;
    var last = nStories - 1;

    function scrollTo(i)
    {
        $('S.current').removeClass('current');

        var story = $(stories[i]);
        var scrollCurrent = $('body').scrollTop(); // XXX cross-browser?
        var scrollTarget = story.offset().top - 100;
        var delta = Math.abs(scrollCurrent - scrollTarget)
        var time = delta / 66.7; // I figured 3 seconds for 200,000 pixels
        time = Math.max(time, 750); // but make it feel like we're scrolling

        $('html, body').animate({ scrollTop: scrollTarget }, time, function() {
            story.addClass('current');
            current = i;
        });
    }
  
    function previous()
    {
        if (current > 0)
            scrollTo(current - 1);
    }

    function next()
    {
        if (current < last)
            scrollTo(current + 1);
    }

    function random()
    {
        var i = Math.floor(Math.random() * nStories);
        scrollTo(i);
    }

    $('#controls SPAN:eq(0)').click(previous);
    $('#controls SPAN:eq(1)').click(next);
    $('#controls SPAN:eq(2)').click(random);

    $('#mask').show().fadeTo(1000, 0.9);
    $('#controls').show();
    random();

});
