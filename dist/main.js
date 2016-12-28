'use strict';

!function (a, b) {
  function c() {
    var b = f.getBoundingClientRect().width;b / i > 540 && (b = 540 * i);var c = b / 10;f.style.fontSize = c + "px", k.rem = a.rem = c;
  }var d,
      e = a.document,
      f = e.documentElement,
      g = e.querySelector('meta[name="viewport"]'),
      h = e.querySelector('meta[name="flexible"]'),
      i = 0,
      j = 0,
      k = b.flexible || (b.flexible = {});if (g) {
    console.warn("将根据已有的meta标签来设置缩放比例");var l = g.getAttribute("content").match(/initial\-scale=([\d\.]+)/);l && (j = parseFloat(l[1]), i = parseInt(1 / j));
  } else if (h) {
    var m = h.getAttribute("content");if (m) {
      var n = m.match(/initial\-dpr=([\d\.]+)/),
          o = m.match(/maximum\-dpr=([\d\.]+)/);n && (i = parseFloat(n[1]), j = parseFloat((1 / i).toFixed(2))), o && (i = parseFloat(o[1]), j = parseFloat((1 / i).toFixed(2)));
    }
  }if (!i && !j) {
    var p = a.navigator.userAgent,
        q = (!!p.match(/android/gi), !!p.match(/iphone/gi)),
        r = q && !!p.match(/OS 9_3/),
        s = a.devicePixelRatio;i = q && !r ? s >= 3 && (!i || i >= 3) ? 3 : s >= 2 && (!i || i >= 2) ? 2 : 1 : 1, j = 1 / i;
  }if (f.setAttribute("data-dpr", i), !g) if (g = e.createElement("meta"), g.setAttribute("name", "viewport"), g.setAttribute("content", "initial-scale=" + j + ", maximum-scale=" + j + ", minimum-scale=" + j + ", user-scalable=no"), f.firstElementChild) f.firstElementChild.appendChild(g);else {
    var t = e.createElement("div");t.appendChild(g), e.write(t.innerHTML);
  }a.addEventListener("resize", function () {
    clearTimeout(d), d = setTimeout(c, 300);
  }, !1), a.addEventListener("pageshow", function (a) {
    a.persisted && (clearTimeout(d), d = setTimeout(c, 300));
  }, !1), "complete" === e.readyState ? e.body.style.fontSize = 12 * i + "px" : e.addEventListener("DOMContentLoaded", function () {
    e.body.style.fontSize = 12 * i + "px";
  }, !1), c(), k.dpr = a.dpr = i, k.refreshRem = c, k.rem2px = function (a) {
    var b = parseFloat(a) * this.rem;return "string" == typeof a && a.match(/rem$/) && (b += "px"), b;
  }, k.px2rem = function (a) {
    var b = parseFloat(a) / this.rem;return "string" == typeof a && a.match(/px$/) && (b += "rem"), b;
  };
}(window, window.lib || (window.lib = {}));
'use strict';

var getcolor = function getcolor(option) {
    var defaults = {
        ele: $("#cav")
    };
    this.opt = $.extend({}, option, defaults);
    this.ctx = this.opt.ele[0].getContext('2d');
    this.radio = 40;
    this.color = 270;
    this.init();
};
$.extend(getcolor.prototype, {
    init: function init() {
        var winW = $(window)[0].innerWidth;
        this.opt.ele.attr({
            'width': winW * 1,
            'height': winW * 1
        });
        this.opt.ele.css({
            'width': winW * 0.5,
            'height': winW * 0.5,
            'border-radius': winW * 0.3
        });
        // this.opt.ele.css("border","1px solid hsla("+this.color+", 100%, 50%, 1.0)");
        this._render();
        this.touchEvent();
    },
    _render: function _render(x, y) {
        this.renderbg();
        this.renderspot(x, y);
    },
    renderbg: function renderbg() {
        this.ctx.save();
        var centerx = this.opt.ele.attr("width") / 2;
        var centery = this.opt.ele.attr("height") / 2;
        var color = 0;
        var i = 0.1;
        var r = i * Math.PI / 180;
        var range = 0;
        this.ctx.save();
        this.ctx.translate(centerx, centery);
        for (; color < 360; color += i) {
            this.ctx.beginPath();
            range++;
            if (range < 18) {
                this.ctx.strokeStyle = 'hsla(' + color + ', 100%, 50%,0)';
            } else if (range >= 18 && range <= 120) {
                this.ctx.strokeStyle = 'hsla(' + color + ', 100%, 50%,1)';
                if (range == 120) {
                    range = 0;
                }
            }
            this.ctx.lineWidth = 1;
            this.ctx.rotate(r);
            this.ctx.moveTo(centerx - 15, 0);
            this.ctx.lineTo(centerx - this.radio - 15, 0);
            this.ctx.stroke();
            this.ctx.closePath();
        }
        this.ctx.restore();
    },
    renderspot: function renderspot(x, y) {
        var centerx = this.opt.ele.attr("width") / 2;
        var centery = this.opt.ele.attr("height") / 2;
        var rad = 0;
        this.ctx.save();
        this.ctx.translate(centerx, centery);
        var X = x - this.opt.ele.width() / 2;
        var Y = y - this.opt.ele.height() / 2;
        if (arguments[0] == undefined) {
            this.color = 270;
        } else {
            rad = Math.atan2(Y, X);
            var angle = rad * 180 / Math.PI;
            if (angle < 0) {
                angle = 180 + angle + 180;
            }
            this.color = angle;
            rad += Math.PI / 2;
        }
        this.ctx.rotate(rad);
        this.ctx.beginPath();
        this.ctx.lineWidth = 8;
        this.ctx.arc(0, -centerx + (this.radio / 2 + 18), this.radio / 1.2, 0, 2 * Math.PI, false);
        this.ctx.strokeStyle = '#fff';
        this.ctx.fillStyle = 'hsla(' + this.color + ', 100%, 50%, 1)';
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.restore();
    },
    touchEvent: function touchEvent() {
        var _this = this;
        var elew = this.opt.ele.attr('width');
        var eleh = this.opt.ele.attr('height');
        this.opt.ele[0].addEventListener('touchstart', function (e) {
            var touch = e.touches[0];
            var pagex = touch.pageX || touch.clientX;
            var pagey = touch.pageY || touch.clientY;
            var ofstop = _this.opt.ele.offset().top;
            var ofsleft = _this.opt.ele.offset().left;
            var x = pagex - ofsleft;
            var y = pagey - ofstop;
            _this.ctx.clearRect(0, 0, elew, eleh);
            _this._render(x, y);
        }, false);
        this.opt.ele[0].addEventListener('touchmove', function (e) {
            var touch = e.touches[0];
            var pagex = touch.pageX || touch.clientX;
            var pagey = touch.pageY || touch.clientY;
            var ofstop = _this.opt.ele.offset().top;
            var ofsleft = _this.opt.ele.offset().left;
            var x = pagex - ofsleft;
            var y = pagey - ofstop;
            _this.ctx.clearRect(0, 0, elew, eleh);
            _this._render(x, y);
        }, false);
        this.opt.ele[0].addEventListener('touchend', function () {
            _this.opt.readColor(_this.opt.staur, _this.opt.inten, _this.color, _this.opt.isopen);
        }, false);
    }

});
'use strict';

var isWhite = true;
var isopen = false;
var intensity = 60;
var saturation = 0.8;
var colour_int = 60;
var colour_satur = 0.8;
var changeLight = function changeLight(intensity, saturation, color, isopen) {
    if (color != "#fff") {
        $('.lamp_btm, .lamp_top, .lamp_mid').css({
            'background': '#fff',
            'box-shadow': '0 0 ' + saturation + 'px 3px hsla(' + color + ', 100%, 50%, ' + intensity + ')'
        });
    } else if (color == "#fff") {
        if (isopen) {
            $('.lamp_btm, .lamp_top, .lamp_mid').css({
                'background': 'rgba(255, 255, 255, ' + intensity + ')',
                'box-shadow': '0 0 ' + saturation + 'px 3px rgba(255, 255, 255, ' + intensity + ')'
            });
        } else {
            $('.lamp_btm, .lamp_top, .lamp_mid').css({
                'background': '#10042e',
                'box-shadow': 'none'
            });
        }
    }
};
var option = {
    readColor: changeLight,
    staur: colour_satur,
    inten: colour_int,
    isopen: isopen
};
var colorPicker = new getcolor(option);
$("#cav").hide();
$(".switch").click(function () {
    $(this).children(".swt").toggleClass("swt_close");
    $(this).children(".swt").toggleClass("swt_open");
});
$('.container').css("height", $(window).width() * 0.5);
$('#cav').css("margin-left", -$('#cav').width() * 0.5);
//开灯
$(".lamp").click(function () {
    isopen = !isopen;
    changeLight(saturation, intensity, "#fff", isopen);
    $(".control").toggleClass("control_in");
});
// 白灯
$("#intensity").change(function () {
    if (isopen) {
        intensity = $(this).val();
        changeLight(saturation, intensity, "#fff", isopen);
    }
});
$("#saturation").change(function () {
    if (isopen) {
        saturation = $(this).val() / 100;
        changeLight(saturation, intensity, "#fff", isopen);
    }
});
$(".white_light .light_close").click(function () {
    $(".infor").toggleClass("info_close");
    $(".control").toggleClass("control_in");
    $(".white_light").toggleClass("white_light_close").toggleClass("white_light_open");
});
$(".cont_item").eq(0).click(function () {
    isWhite = true;
    changeLight(saturation, intensity, "#fff", isopen);
    $(".infor").toggleClass("info_close");
    $(".control").toggleClass("control_in");
    $(".white_light").removeClass("white_light_close").addClass("white_light_open");
});
$(".cont_item").eq(1).click(function () {
    $("#cav").show();
});
// 彩灯
$(".colour_light .light_close").click(function () {
    $("#cav").hide();
    $(".infor").toggleClass("info_close");
    $(".control").toggleClass("control_in");
    $(".colour_light").toggleClass("white_light_close").toggleClass("white_light_open");
});
$(".cont_item").eq(1).click(function () {
    isWhite = false;
    $(".infor").toggleClass("info_close");
    $(".control").toggleClass("control_in");
    $(".colour_light").removeClass("white_light_close").addClass("white_light_open");
    changeLight(colour_satur, colour_int, 270, isopen);
});
$("#colour_intensity").change(function () {
    if (isopen) {
        colour_int = $(this).val();
        changeLight(colour_satur, colour_int, 0, isopen);
    }
});
$("#colour_saturation").change(function () {
    if (isopen) {
        colour_satur = $(this).val() / 100;
        changeLight(colour_satur, colour_int, 0, isopen);
    }
});