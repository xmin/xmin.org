$(document).ready(function()
{
    var stories = $('#gospels S');
    var nStories = stories.length;
    var current = 0;
    var last = nStories - 1;

    function scrollTo(i)
    {
        var story = $(stories[i]);
        var scrollCurrent = $('body').scrollTop(); // XXX cross-browser?
        var scrollTarget = story.offset().top - 100;
        var delta = Math.abs(scrollCurrent - scrollTarget)
        var time = delta / 66.7; // I figured 3 seconds for 200,000 pixels
        time = Math.max(time, 500); // but make it feel like we're scrolling

        $('html, body').animate({ scrollTop: scrollTarget }, time, function() {
            focus(i);
        });
    }

    function focus(i)
    {
        current = i;
        
        $('S.current').removeClass('current');
        var story = $(stories[i]);
        story.addClass('current');

        var o = story.offset();
        $('#previous').css({ top: o.top - 18 
                           , left: o.left - 120
                            });
        $('#next').css({ top: o.top + story.outerHeight(true) - 18
                       , left: o.left + story.outerWidth(true) + 20
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

    function one()
    {
        // Find the current story.
        // =======================
        // I adapted a binary search from:
        //
        //      http://snippets.dzone.com/posts/show/5989

        var attention = 105; // first line after we scroll to 100px from top
        var scrolled = $(window).scrollTop();
        var squish = $('#gospels').offset().top;
        if (scrolled < squish)
            attention = (squish - scrolled)
                      + (Math.ceil(scrolled / squish) * attention);
        attention += scrolled;

        var story = null;
        var t, b;

        var low = 0;
        var mid;
        var high = stories.length - 1;
        
        while (low <= high)
        {
            half = Math.ceil((high - low) / 2);
            mid = low + half;
           
            story = $(stories[mid])
            t = story.offset().top;
            b = t + story.outerHeight(true);
            
            if (t <= attention && attention <= b)   // found it!
                break;                  
            if (attention < t)                      // guessed too low
                high = mid - 1;
            else                                    // guessed too high
                low = mid + 1;
        }

        mask();
        focus(mid);
    }

    function all()
    {
        $('#mask, #previous, #next').hide();
    }

    function mask()
    {
        $('#mask, #previous, #next').show().fadeTo(1000, 0.9);
    }


    $('#previous SPAN:eq(0)').click(random);
    $('#previous SPAN:eq(1)').click(previous);

    $('#next SPAN:eq(0)').click(next);
    $('#next SPAN:eq(1)').click(random);

    $('#show SPAN:eq(0)').click(one);
    $('#show SPAN:eq(1)').click(all);

    mask();
    random();
});
