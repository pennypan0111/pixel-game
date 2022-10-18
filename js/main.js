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

// 發射飛彈
function fireLaser(){
    let laser = createLaserElement()
    background.appendChild(laser)
    moveLaser(laser)
}

// 設定子彈樣式及位置
function createLaserElement(){
    let xPosition = parseInt(window.getComputedStyle(shooter).getPropertyValue('left'))
    let yPosition = parseInt(window.getComputedStyle(shooter).getPropertyValue('top'))
    let newLaser = document.createElement('img')
    newLaser.src = './img/bullet.png'
    newLaser.classList.add('laser')
    newLaser.style.left = `${xPosition}px`
    newLaser.style.top = `${yPosition + 35}px`
    return newLaser
}

// 子彈射出的移動及時間
function moveLaser(laser){
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left)
        let monsters = document.querySelectorAll('.monster')
        monsters.forEach(monster => {
            if(checkLaserCollision(laser, monster)){
                monster.classList.remove('monster')
                monster.classList.add('dead-monster')
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
window.setInterval(function(){
    createMonster()
}, 3000)


// 怪物的移動及時間
function moveMonster(monster){
    let moveMonsterInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(monster).getPropertyValue('left'))
        if(xPosition <= 0){
            monster.remove()
        }
        else{
            monster.style.left = `${xPosition - 4}px`
        }
    },20)
}


// 
function checkLaserCollision(laser, monster){
    let laserLeft = parseInt(laser.style.left)
    let laserTop = parseInt(laser.style.top)
    let laserBottom = laserTop - 20

    let monsterLeft = parseInt(monster.style.left)
    let monsterTop = parseInt(monster.style.top)
    let monsterBottom = monsterTop - 30

    if(laserTop != 1600 && laserLeft + 40 >= monsterLeft){
        if((laserTop <= monsterTop && laserTop >= monsterBottom)){
            return true
        }
        else{
            return false
        }
    }
    else{
        return false
    }
}