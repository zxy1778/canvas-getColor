var getcolor=function(option){
   let defaults={
        ele:$("#cav")
    };
    this.opt=$.extend({},option,defaults);
    this.ctx = this.opt.ele[0].getContext('2d');
    this.radio = 40;
    this.color = 0;
    this.init();
};
$.extend(getcolor.prototype, {
    init:function () {
        var winW = $(window)[0].innerWidth;
        this.opt.ele.attr({
            'width':winW*1,
            'height':winW*1
        });
        this.opt.ele.css({
            'width':winW*0.5,
            'height':winW*0.5,
            'border-radius':winW*0.3
        });
        // this.opt.ele.css("border","1px solid hsla("+this.color+", 100%, 50%, 1.0)");
        this._render();
        this.touchEvent();
    },
    _render:function (x,y) {
        this.renderbg();
        this.renderspot(x,y);
    },
    renderbg:function () {
        this.ctx.save();
        var centerx = this.opt.ele.attr("width")/2;
        var centery = this.opt.ele.attr("height")/2;
        var color = 0;
        var i = 0.1;
        var r = i * Math.PI / 180;
        var range = 0;
        this.ctx.save();
        this.ctx.translate(centerx,centery);
        for (; color<360; color+=i){
            this.ctx.beginPath();
            range++;
            if(range<18){
                this.ctx.strokeStyle='hsla('+color+', 100%, 50%,0)';
            }else if (range >= 18 && range<=120){
                this.ctx.strokeStyle='hsla('+color+', 100%, 50%,1)';
                if (range == 120){
                    range = 0;
                }
            }
            this.ctx.lineWidth=1;
            this.ctx.rotate(r);
            this.ctx.moveTo(centerx-15,0);
            this.ctx.lineTo(centerx-this.radio-15,0);
            this.ctx.stroke();
            this.ctx.closePath();
        }
        this.ctx.restore();

    },
    renderspot:function (x,y) {
        var centerx = this.opt.ele.attr("width")/2;
        var centery = this.opt.ele.attr("height")/2;
        var rad = 0;
        this.ctx.save();
        this.ctx.translate(centerx,centery);
        var X = x-this.opt.ele.width()/2;
        var Y = y-this.opt.ele.height()/2;
        if (arguments[0] == undefined){
            this.color = 0;
        }else{
            rad = Math.atan2(Y,X);
            var angle = rad*180/Math.PI;
            if (angle<0){
                angle = 180+angle+180;
            }
            this.color = angle;
        }
        this.ctx.rotate(rad);
        this.ctx.beginPath();
        this.ctx.lineWidth=8;
        this.ctx.arc(centerx-this.radio/2-18,0,this.radio/1.2,0,2*Math.PI,false);
        this.ctx.strokeStyle='#fff';
        this.ctx.fillStyle='hsla('+this.color+', 100%, 50%, 1)';
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.restore();
    },
    touchEvent:function () {
        var _this = this;
        var elew = this.opt.ele.attr('width');
        var eleh = this.opt.ele.attr('height');
       this.opt.ele[0].addEventListener('touchstart',function(e) {
           var touch = e.touches[0];
           var pagex = touch.pageX || touch.clientX;
           var pagey = touch.pageY || touch.clientY;
           var ofstop = _this.opt.ele.offset().top;
           var ofsleft = _this.opt.ele.offset().left;
           var x = pagex-ofsleft;
           var y = pagey-ofstop;
           _this.ctx.clearRect(0,0,elew,eleh);
           _this._render(x, y);
       },false);
        this.opt.ele[0].addEventListener('touchmove',function(e) {
            var touch = e.touches[0];
            var pagex = touch.pageX || touch.clientX;
            var pagey = touch.pageY || touch.clientY;
            var ofstop = _this.opt.ele.offset().top;
            var ofsleft = _this.opt.ele.offset().left;
            var x = pagex-ofsleft;
            var y = pagey-ofstop;
            _this.ctx.clearRect(0,0,elew,eleh);
            _this._render(x, y);
        },false);
        this.opt.ele[0].addEventListener('touchend',function() {
            _this.opt.readColor(_this.opt.staur,_this.opt.inten,_this.color,_this.opt.isopen);

        },false)
    }

});

