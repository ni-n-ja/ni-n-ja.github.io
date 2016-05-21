$(document).ready(function() {
    $(".moji").hover(function() {
        $("#" + $(this).attr("id") + "svg").stop().velocity({
            "fill-opacity": 1,
            "stroke-opacity": 0
        }, 100);
        $("#" + $(this).attr("id") + "svg2").stop().velocity({
            "fill-opacity": 0,
            "stroke-opacity": 1
        }, 100);
    }, function() {
        $("#" + $(this).attr("id") + "svg").stop().velocity({
            "fill-opacity": 0,
            "stroke-opacity": 1
        }, 100);
        $("#" + $(this).attr("id") + "svg2").stop().velocity({
            "fill-opacity": 1,
            "stroke-opacity": 0
        }, 100);
    });

    $("html").bind("click", function(e) {
        if ($("#srkn").offset().left <= -90 && $("#onigiri").offset().left <= -90) {
            var rand = Math.floor(Math.random() * 100);
            if (rand < 80) {
                $("#srkn").css("top", (e.clientY - 40) + 'px');
                $("#srkn").velocity({
                    "translateX": $(window).width() + 90,
                    "easing": "easeOutQuad"
                }, 800).velocity({
                    "translateX": 0
                }, 0);
            } else {
                $("#onigiri").css("top", (e.clientY - 40) + 'px');
                $("#onigiri").velocity({
                    "translateX": $(window).width() + 90,
                    "easing": "easeOutQuad"
                }, 1200).velocity({
                    "translateX": 0
                }, 0);
            }
        }

    });
});
