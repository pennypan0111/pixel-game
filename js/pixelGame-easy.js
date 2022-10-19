// 定義玩家火箭
const shooter = document.getElementById('player-box')



// 往上的函式
function moveUp(){
    let topPosition = window.getComputedStyle(shooter).getPropertyValue('top')
    if(shooter.style.top === '0px'){
        return
    }
    else{
        let position = parseInt(topPosition)
        position -= 4
        shooter.style.top = `${position}px`
    }
}



// 往下的函式
function moveDown(){
    let topPosition = window.getComputedStyle(shooter).getPropertyValue('top')
    if(shooter.style.top === '800px'){
        return
    }
    else{
        let position =parseInt(topPosition)
        position += 4
        shooter.style.top = `${position}px`
    }
}



// 發射子彈
function fireLaser(){
    let laser = createLaserElement()
    background.appendChild(laser)
    let shoot = new Audio('./music/shoot.mp3')
    shoot.play()
    moveLaser(laser)
}



// 設定子彈樣式及位置
function createLaserElement(){
    let xPosition = parseInt(window.getComputedStyle(shooter).getPropertyValue('left'))
    let yPosition = parseInt(window.getComputedStyle(shooter).getPropertyValue('top'))
    let newLaser = document.createElement('img')
    newLaser.src = './img/bullet.png'
    newLaser.classList.add('laser')
    newLaser.style.left = `${xPosition + 200}px`
    newLaser.style.top = `${yPosition - 5}px`
    return newLaser
}



// 子彈射出的移動及時間
const scoreCounter = document.querySelector('#score span')
let killMonster = new Audio('./music/kill.mp3')

function moveLaser(laser){
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left)
        let monsters = document.querySelectorAll('.monster')
        monsters.forEach(monster => {
            if(checkLaserCollision(laser, monster)){ //子彈、怪物偵測碰撞時
                monster.classList.remove('monster') //移除怪物
                monster.classList.add('dead-monster') //怪物透明度變0，即消失
                killMonster.play() //消滅怪物時的音效
                laser.remove() //移除子彈
                scoreCounter.innerText = parseInt(scoreCounter.innerText) + 10 //分數增加
            }
        })
        if(xPosition === 1600){
            laser.style.display = 'none'
            laser.remove()
        }
        else{
            laser.style.left = `${xPosition + 4}px`
        }
    }, 10)
}



// 火箭移動及發射的函式
function letShipFly(event){
    if(event.key === 'ArrowUp'){
        event.preventDefault()
        moveUp()
    }
    else if(event.key === 'ArrowDown'){
        event.preventDefault()
        moveDown()
    }
    else if(event.key === ' '){
        event.preventDefault()
        fireLaser()
    }
}
window.addEventListener('keydown',letShipFly)



// 設定怪物的樣式及位置
const monsterImgs = ['./img/alien-01.png', './img/alien-02.png', './img/alien-03.png', './img/alien-04.png']

function createMonster(){
    let newMonster = document.createElement('img')
    let monsterSpriteImg = monsterImgs[Math.floor(Math.random()*monsterImgs.length)]
    newMonster.src = monsterSpriteImg
    newMonster.classList.add('monster')
    newMonster.style.left = '100%'
    newMonster.style.top = `${Math.floor(Math.random() * 600 ) + 30}px`
    background.appendChild(newMonster)
    moveMonster(newMonster)
}



// 重複生成怪物
let timer = window.setInterval(function(){
    createMonster()
}, 3000)



// 怪物的移動及時間
function moveMonster(monster){
    let moveMonsterInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(monster).getPropertyValue('left'))
        let monsters = document.querySelectorAll('.monster')
        monsters.forEach(monster => {
            if(checkShooterCollision(shooter, monster)){
                gameOver()
                window.clearTimeout(timer) //停止生成怪物
                window.clearTimeout(bgrun) //停止背景循環
            }
        })
        if(xPosition <= 0){
            monster.remove() //怪物到視窗最左邊時移除
        }
        else{
            monster.style.left = `${xPosition - 4}px`
        }
    },20)
}



// 子彈、怪物碰撞偵測
function checkLaserCollision(laser, monster){
    if(laser.offsetLeft<monster.offsetLeft+monster.offsetWidth&&
        laser.offsetLeft+laser.offsetWidth>monster.offsetLeft&&
        laser.offsetTop<monster.offsetTop+monster.offsetHeight&&
        laser.offsetHeight+laser.offsetTop>monster.offsetTop
     ){
      return true
     }
     else{
        return false
     }
}



// 玩家、怪物碰撞偵測
function checkShooterCollision(shooter, monster){
    if(shooter.offsetLeft<monster.offsetLeft+monster.offsetWidth&&
        shooter.offsetLeft+shooter.offsetWidth>monster.offsetLeft&&
        shooter.offsetTop<monster.offsetTop+monster.offsetHeight&&
        shooter.offsetHeight+shooter.offsetTop>monster.offsetTop
     ){
      return true
     }
     else{
        return false
     }
}



// 遊戲結束
function gameOver(){
    window.removeEventListener('keydown', letShipFly)

    let monsters = document.querySelectorAll('.monster')
    monsters.forEach(monster => monster.remove())

    let lasers = document.querySelectorAll('.laser')
    lasers.forEach(laser => laser.remove())

    gameOverAlert() //遊戲結束提示框
    musicStart.pause() //背景音樂關閉

}



// 遊戲結束提示框
let gameOverMusic = new Audio('./music/game-over.mp3') //設定玩家死亡的音效

function gameOverAlert(){
    gameOverMusic.play() //啟動玩家死亡的音效
    Swal.fire({
        title: 'Game Over!',
        text: '你已被外星人綁架',
        imageUrl: './img/rip.png',
        imageWidth: 200,
        imageHeight: 200,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
    }).then((result) => {
        window.location.reload(); //頁面刷新重整
        gameOverMusic.pause(); //關閉玩家死亡的音效
    });
}



// 離開遊戲回到上一頁
function esc(e){
    if(e.keyCode == 27){
        window.location.href = "pixelGame-start.html";
    }
}
window.addEventListener('keydown',esc)



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



// 背景音樂開關設定
let musicStart = new Audio('./music/bg-music.mp3') //設定背景音效

$('.music .fa-volume-xmark').click(function() {
    
    $('.fa-volume-xmark').css('display', 'none');
    $('.fa-volume-high').css('display', 'block');
    musicStart.play(); //啟動背景音效
})

$('.music .fa-volume-high').click(function() {
    $('.fa-volume-high').css('display', 'none');
    $('.fa-volume-xmark').css('display', 'block');
    musicStart.pause(); //關閉背景音效
})