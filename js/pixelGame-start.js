$(document).keydown(function (e) {

    // console.log(e.keyCode);

    if(e.keyCode == 40){ //向下鍵
        $('.arrow').css('top','110px')

        let left = parseInt($('.rock').css('left'))
    }
    else if(e.keyCode == 38){ //向上鍵
        $('.arrow').css('top','10px')
    }
    else if(e.keyCode == 13){
        $('.title , .players').css('display','none')
        window.location.href = "pixelGame.html";
    }
});

// 背景無限循環
let background = document.getElementById('background')
let space = {
    x:0
}
let running = true;

let bgrun = setInterval(function(){
    if(running){
        space.x -=3;
        background.style.backgroundPositionX = space.x + 'px';
    }
},30)