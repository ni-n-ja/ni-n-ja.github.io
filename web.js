    var mouseY = 1,
        surikenTimer,
        surikenPosition = -90;

    $(document).ready(function() {

        $("#srkn").velocity({
            rotateZ: "360deg"
        }, {
            loop: true,
            dulation: 20,
            easing: "linear"
        });

        $("#saw").velocity({
            rotateZ: "360deg"
        }, {
            loop: true,
            dulation: 4000,
            easing: "linear"
        });

        $("#onigiri").velocity({
            rotateZ: "360deg"
        }, {
            loop: true,
            dulation: 20,
            easing: "linear"
        });

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
            if ($("#srkn").offset().left <= -90 && $("#saw").offset().left <= -90 && $("#onigiri").offset().left <= -90) {
                var rand = Math.floor(Math.random() * 100);
                if (96 <= rand) {
                    mouseY = e.pageY;
                    shuriken2();
                }
                else if (80 <= rand) {
                    mouseY = e.pageY;
                    shuriken3();
                }
                else {
                    mouseY = e.pageY;
                    shuriken();
                }

            }
        });
    });

    function shuriken() {
        if ($("#srkn").css("left") == "-90px") {
            $("#srkn").css("top", (mouseY - 40) + "px");
            surikenTimer = setInterval(move, 1);
        }
    }

    function move() {
        surikenPosition += 15;
        $("#srkn").css("left", surikenPosition + "px");
        if ($("body").width() < surikenPosition) {
            surikenPosition = -90;
            $("#srkn").css("left", surikenPosition + "px");
            clearInterval(surikenTimer);
        }
    }

    function shuriken2() {
        if ($("#saw").css("left") == "-90px") {
            $("#saw").css("top", (mouseY - 40) + "px");
            surikenTimer = setInterval(move2, 1);
        }
    }

    function move2() {
        surikenPosition += 15;
        $("#saw").css("left", surikenPosition + "px");
        if ($("body").width() < surikenPosition) {
            surikenPosition = -90;
            $("#saw").css("left", surikenPosition + "px");
            clearInterval(surikenTimer);
        }
    }

    function shuriken3() {
        if ($("#onigiri").css("left") == "-90px") {
            $("#onigiri").css("top", (mouseY - 40) + "px");
            surikenTimer = setInterval(move3, 1);
        }
    }

    function move3() {
        surikenPosition += 10;
        $("#onigiri").css("left", surikenPosition + "px");
        if ($("body").width() < surikenPosition) {
            surikenPosition = -90;
            $("#onigiri").css("left", surikenPosition + "px");
            clearInterval(surikenTimer);
        }
    }