// ensure the size of the window
$(window).bind("resize",function(){
    adjustWindow();
});

// draggable.js

$.fn.extend({
    draggable : function(params){
        var _this = $(this);
        var dragStartPosition = {
            x: 0,
            y: 0
        },
        elementStartPosition = {
            x: 0,
            y: 0
        },
        offset = {
            x: 0,
            y: 0
        };
        _this
            .on("mousedown",onDragStart)
            .on("mouseup",onDragEnd);
        _this.find("img").on("dragstart",function(){
            // Here fix a bug when drag on img element, the browser will appears a "not-allows" cursor.
            return false;
        });
        $("body").on("selectstart",function(){
            return false;
        });
        function onDragStart(e){
            dragStartPosition.x = e.clientX;
            dragStartPosition.y = e.clientY;
            elementStartPosition.x = parseInt(_this.css("left"));
            elementStartPosition.y = parseInt(_this.css("top"));
            $("body").on("mousemove",onDrag);
            _this.addClass("dragging");
        }
        function onDrag(e){
            offset = {
                x:e.clientX - dragStartPosition.x,
                y:e.clientY - dragStartPosition.y
            }
            _this.css({
                left: elementStartPosition.x + offset.x,
                top: elementStartPosition.y + offset.y
            });
        }
        function onDragEnd(e){
            $("body").off("mousemove",onDrag);
            _this.removeClass("dragging");
        }
    }
});


$(".level1").draggable();
$(".level2").draggable();



//zoom.js
(function(jQuery){
    jQuery.fn.zoom = function(params){
        $(this)
            .bind("mousewheel",doZoom)
            .bind("dblclick",doZoom);
        function doZoom(e){
            var firePosition = {
                x : e.clientX,
                y : e.clientY
            };
            // if判断中的方法存在bug，目前仅兼容Chrome，详情参见：
            // http://www.w3help.org/zh-cn/causes/SD9015
            if(e.originalEvent.wheelDelta<0){
                //缩小
                if ($(".level1").css("display")=="none") {
                    _zoomOut();
                    console.log();
                }
            }else{
                //放大
                if ($(".level2").css("display")=="none") {
                    _zoomIn();
                }

            }
            function _zoomIn(){
                var $indecator = $(".zoomIndicator");
                $indecator.removeClass("zoomOut").addClass("zoomIn").css({
                    width: 30,
                    height: 20,
                    left: firePosition.x-15,
                    top: firePosition.y-10,
                    opacity: .7
                }).show();
                console.log(firePosition.y/2);
                function animate(){
                    $indecator.animate({
                        width: 111,
                        height: 74,
                        left: firePosition.x-55,
                        top: firePosition.y-37,
                        opacity: .2
                    },500,function(){
                        $indecator.hide();
                    });
                }
                animate();
                var offset = {
                    left : parseInt($(".level1").css("left")),
                    top: parseInt($(".level1").css("top"))
                };
                $(".level1").hide();
                $(".level2").show().css({
                    left: parseInt(-(firePosition.x)+offset.left*2),
                    top: parseInt(-(firePosition.y)+offset.top*2)
                });
            }
            function _zoomOut(){
                $(".level1").show().css({
                    left : parseInt($(".level2").css("left")/2),
                    top : parseInt($(".level2").css("top")/2)
                }).removeClass("scale2");
                var $indecator = $(".zoomIndicator");
                $indecator.removeClass("zoomIn").addClass("zoomOut").css({
                    width: 111,
                    height: 74,
                    left: firePosition.x-55,
                    top: firePosition.y-37,
                    opacity: .7
                }).show();
                function animate(){
                    $indecator.animate({
                        width: 30,
                        height: 20,
                        left: firePosition.x-15,
                        top: firePosition.y-10,
                        opacity: .2
                    },500,function(){
                        $indecator.hide();
                        $(".level2").hide();
                    });
                }
                animate();
            }

        }
    }
})(jQuery);




$("#container").zoom();

