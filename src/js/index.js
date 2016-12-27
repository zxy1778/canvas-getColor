var isWhite = true;
var isopen = false;
var intensity = 60;
var saturation = 0.8;
var colour_int = 60;
var colour_satur = 0.8;
var changeLight = function (intensity, saturation, color,isopen) {
    if (color!="#fff"){
        $('.lamp_btm, .lamp_top, .lamp_mid').css({
            'background': '#fff',
            'box-shadow': '0 0 '+saturation+'px 3px hsla('+color+', 100%, 50%, '+intensity+')'
        })
    }else if (color=="#fff"){
        if (isopen){
            $('.lamp_btm, .lamp_top, .lamp_mid').css({
                'background': 'rgba(255, 255, 255, '+intensity+')',
                'box-shadow': '0 0 '+saturation+'px 3px rgba(255, 255, 255, '+intensity+')'
            })
        }else{
            $('.lamp_btm, .lamp_top, .lamp_mid').css({
                'background': '#10042e',
                'box-shadow': 'none'
            })
        }
    }

};
var option = {
    readColor:changeLight,
    staur:colour_satur,
    inten:colour_int,
    isopen:isopen
};
var colorPicker = new getcolor(option);
$("#cav").hide();
$(".switch").click(function () {
    $(this).children(".swt").toggleClass("swt_close");
    $(this).children(".swt").toggleClass("swt_open");
});
$('.container').css("height",$(window).width()*0.5);
$('#cav').css("margin-left",-$('#cav').width()*0.5);
//开灯
$(".lamp").click(function () {
    isopen = !isopen;
    changeLight(saturation,intensity,"#fff",isopen);
    $(".control").toggleClass("control_in");
});
// 白灯
$("#intensity").change(function () {
    if (isopen){
        intensity = $(this).val()
        changeLight(saturation,intensity,"#fff",isopen);
    }
});
$("#saturation").change(function () {
    if (isopen){
        saturation = $(this).val()/100;
        changeLight(saturation,intensity,"#fff",isopen);
    }
});
$(".white_light .light_close").click(function () {
    $(".infor").toggleClass("info_close");
    $(".control").toggleClass("control_in");
    $(".white_light").addClass("white_light_close");
});
$(".cont_item").eq(0).click(function () {
    isWhite = true;
    $(".infor").toggleClass("info_close");
    $(".control").toggleClass("control_in");
    $(".white_light").toggleClass("white_light_open");
});
$(".cont_item").eq(1).click(function () {
    $("#cav").show();
});
// 彩灯
$(".colour_light .light_close").click(function () {
    $(".infor").toggleClass("info_close");
    $(".control").toggleClass("control_in");
    $(".colour_light").addClass("white_light_close");
});
$(".cont_item").eq(1).click(function () {
    isWhite = false;
    $(".infor").toggleClass("info_close");
    $(".control").toggleClass("control_in");
    $(".colour_light").toggleClass("white_light_open");
    changeLight(colour_satur,colour_int,0,isopen);
});
$("#colour_intensity").change(function () {
    if (isopen){
        colour_int = $(this).val()
        changeLight(colour_satur,colour_int,0,isopen);
    }
});
$("#colour_saturation").change(function () {
    if (isopen){
        colour_satur = $(this).val()/100;
        changeLight(colour_satur,colour_int,0,isopen);
    }
});

