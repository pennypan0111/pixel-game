$(document).keydown(function (e) {

    // console.log(e.keyCode);

    if(e.keyCode == 40){ //向下鍵
        $('.arrow').css('top','150px')

        let left = parseInt($('.rock').css('left'))
    }
    else if(e.keyCode == 38){ //向上鍵
        $('.arrow').css('top','30px')
    }
    else if(e.keyCode == 13){
        $('.title , .players').css('display','none')
        $('.rock').css('display','block')
    }
});