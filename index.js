
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.width = 300
canvas.height = 400
let player
let bulletController 
let enemy
let monster
let bullet
let aliens
let alienBullet
let toggle = document.querySelector('#start')
toggle.disabled = false

class Aliens {
    constructor() {
        this.x = canvas.width
        this.y = Math.floor(Math.random() * (1000 - 750))
        this.height = 50
        this.width = 50
        this.speed = 1
        this.bulletX = this.x 
        this.bulletY = this.y 
        this.bulletRadius = 5
        this.bulletSpeed = 1
    }
    draw() {
        let aliens = new Image(this.width, this.height)
        aliens.src = 'images/alien.png'
        ctx.shadowColor = "none"
        ctx.shadowBlur = 0
        ctx.drawImage(aliens, this.x, this.y, this.width, this.height)
        this.x -= this.speed
    }
}

class Alienbullet {
    constructor() {
        this.bulletX = aliens.x + 25
        this.bulletY = aliens.y + aliens.height
        this.bulletRadius = 5
        this.bulletSpeed = 1

    }
    drop() {
        ctx.shadowColor = "lime"
        ctx.shadowBlur = 20
        ctx.beginPath()
        ctx.arc(this.bulletX, this.bulletY, this.bulletRadius, 0, Math.PI * 2)
        ctx.fillStyle = "lime"
        ctx.fill()
        ctx.closePath()

        this.bulletY += this.bulletSpeed

        if (this.bulletX + this.bulletRadius > player.x &&
            this.bulletX < player.x + player.width &&
            this.bulletY + this.bulletRadius > player.y + 10 &&
            this.bulletY + this.bulletRadius < player.y + 20) {
                this.bulletX = canvas.width / 2
                this.bulletY = canvas.height + 50

                player.gameActive = false
                setTimeout(() => {
                    location.reload()
                }, 3000)
        }
        
    }
}

class Monster {
    constructor() {
        this.x = canvas.width / 2 - 50
        this.y = 5
        this.height = 75
        this.width = 100
        this.speed = 1
        this.zoneOne = this.y
        this.zoneTwo = this.y + 25
        this.hits = 100

    }
    draw() {
        let monster = new Image(this.width, this.height)
        monster.src = 'images/monster.png'
        ctx.shadowColor = "none"
        ctx.shadowBlur = 0
        ctx.font = "12.5px Arial"
        ctx.strokeStyle = "lime"
        ctx.strokeText(`${this.hits}`,this.x + 43, this.y + 5)
        ctx.drawImage(monster, this.x, this.y, this.width, this.height)

        this.x += this.speed

        if (this.x + this.width === canvas.width) {
            this.speed = -this.speed
        } else if (this.x === 0) {
            this.speed = -this.speed
        }
        
    }
}

class Bullet {
    constructor() {
        this.x = player.x + (player.width / 2) - 2.5
        this.y = player.y
        this.speed = 4
        this.width = 5
        this.height = 15
        this.color = "red"
    }
    draw() {
        ctx.shadowColor = "orange"
        ctx.shadowBlur = 30
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        this.y -= this.speed
    }
    collideWithEnemy() {
        if (this.x < enemy.x + enemy.width &&
            this.x + this.width > enemy.x &&
            this.y < enemy.y + enemy.height + enemy.direction &&
            this.y > enemy.shield) {
                player.score += 5
                this.y = -50
                this.speed = 0
                enemy = new Enemy()
                enemy.draw()
        }
    }
    collideWithMonster() {
        if (this.x < monster.x + monster.width &&
            this.x + this.width > monster.x &&
            this.y < monster.zoneTwo &&
            this.y > monster.zoneOne) {
                player.score++
                monster.hits--
                this.y = -50
                this.speed = 0
                if (monster.hits === 0) {
                    player.gameActive = false
                    setTimeout(() => {
                        location.reload()
                    }, 4000)
                }
            }
    }
    collideWithAliens() {
        if (this.x < aliens.x + aliens.width &&
            this.x + this.width > aliens.x &&
            this.y < aliens.y + (aliens.height / 2) &&
            this.y > aliens.y) {
                player.score += 5
                this.y = -50
                this.speed = 0
                aliens = new Aliens()
                aliens.draw()
        }
    }
    collideWithAlienBullet() {
        if (this.x < alienBullet.bulletX + alienBullet.bulletRadius &&
            this.x + this.width > alienBullet.bulletX &&
            this.y < alienBullet.bulletY + alienBullet.bulletRadius &&
            this.y > alienBullet.bulletY) {
                player.score += 1
                this.y = -50
                this.speed = 0
                alienBullet.bulletY = canvas.height + 50
        }
    }
}

class BulletController {
    bullets = []
    constructor() {
    }
    shoot() {
        this.bullets.push(new Bullet())
    }
    draw() {
        this.bullets.forEach(function (bullet) {
            bullet.draw()
            bullet.collideWithEnemy()
            bullet.collideWithMonster()
            bullet.collideWithAliens()
            bullet.collideWithAlienBullet()
        })
    }
}

class Player {
    constructor(x, y, bulletController) {
        this.x = x
        this.y = y
        this.bulletController = bulletController
        this.width = 75
        this.height = 50
        this.speed = 15
        this.score = 0
        this.ammo = 50
        this.refillX = Math.floor(Math.random() * (1000 - 715))
        this.refillY = -15
        this.refillRadius = 15
        this.refillDirection = 1
        this.gameActive = true
    }
    draw() {
        ctx.shadowColor = 'none'
        ctx.shadowBlur = 0
        let jet = new Image(this.width, this.height)
        jet.src = 'images/jet.png'
        ctx.drawImage(jet, this.x, this.y, this.width, this.height)
    }
    shoot() {
        bulletController.shoot()
    }
    drawScore() {
        ctx.font = "18px Arial"
        ctx.fillStyle = "white"
        ctx.fillText(`Score: ${this.score}`, 8, 20)
    }
    drawAmmo() {
        ctx.font = "18px Arial"
        ctx.fillStyle = "white"
        ctx.fillText(`Ammo: ${this.ammo}`, canvas.width - 100, 20)
    }
    drawResupply() {
        ctx.shadowColor = "lime"
        ctx.shadowBlur = 20
        ctx.beginPath()
        ctx.arc(this.refillX, this.refillY, this.refillRadius, 0, Math.PI * 2)
        ctx.lineWidth = 1
        ctx.strokeStyle = "lime"
        ctx.stroke() 
        ctx.fillStyle = "black"
        ctx.fill()
        ctx.font = "15px Arial";
        ctx.strokeText("50",this.refillX - 8, this.refillY + 5)
        ctx.closePath()
        this.refillY += this.refillDirection
    }
    gameOver() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.shadowColor = "lime"
        ctx.shadowBlur = 20
        ctx.font = "18px Arial"
        ctx.fillStyle = "lime"
        ctx.fillText(`Game over!`, 100, 110)
        ctx.fillText(`You were hit`, 95, 180)
        ctx.fillText(`Your score is ${player.score}`, 85, 250)
    }
    wins() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.shadowColor = "lime"
        ctx.shadowBlur = 20
        ctx.font = "18px Arial"
        ctx.fillStyle = "lime"
        ctx.fillText(`Game over!`, 100, 110)
        ctx.fillText(`You won`, 110, 180)
        ctx.fillText(`Your score is ${player.score}`, 85, 250)
    }
    
} 

class Enemy {
    constructor() { 
        this.x = monster.x + 50   
        this.y = monster.y + 35
        this.width = 15
        this.height = 45
        this.shield = (this.y + this.height) - 5
        this.direction = 1
    }
    draw() {
        ctx.shadowColor = "lime"
        ctx.shadowBlur = 30
        let bomb = new Image(this.width, this.height)
        bomb.src = 'images/enemy.png'
        ctx.drawImage(bomb, this.x, this.y, this.width, this.height)

        this.y += this.direction
        
        if (this.x + this.width > player.x &&
            this.x < player.x + player.width &&
            this.y + this.height > player.y + 20 &&
            this.y + this.height < player.y + 21) {
                
            player.gameActive = false
            setTimeout(() => {
                location.reload()
            }, 4000)
        }
    }
}

function gameLoop() {
    if (player.gameActive === false) {
        if (monster.hits === 0) {
            player.wins()
        } else {
            player.gameOver()
        }
        
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        bulletController.draw()
        enemy.draw()
        aliens.draw()
        alienBullet.drop()
        monster.draw()
        player.draw()
        player.drawScore()
        player.drawAmmo()
    }
    
    if (enemy.y - enemy.height > canvas.height) {
        enemy = new Enemy()
        enemy.draw()
    }

    if (aliens.x < player.x + 15 &&
        aliens.x > player.x + 10 &&
        alienBullet.bulletY > canvas.height) {
        
        alienBullet.bulletX = aliens.x + 25
        alienBullet.bulletY = aliens.y + aliens.height
        alienBullet.drop()
    }

    if (aliens.x + aliens.width <= 0) {
        aliens = new Aliens()
        aliens.draw()
    }

    if (player.ammo === 0) {
        player.drawResupply()
    }

    if (player.refillY + player.refillRadius > player.y &&
        player.refillY + player.refillRadius < player.y + 2 &&
        player.refillX - player.refillRadius < player.x + player.width &&
        player.refillX + player.refillRadius > player.x) {
        player.ammo = 50
        player.refillY = canvas.height + 50
    } 
    
    if (player.refillY > canvas.height) {
        player.refillX = Math.floor(Math.random() * (1000 - 715))
        player.refillY = -15
        player.drawResupply()
    }

    requestAnimationFrame(() => gameLoop())
    
}

function renderButtonEvents() {

    document.querySelector('#left').addEventListener('click', function(e) {
        e.preventDefault()
        if (player.x <= 0) {
            return
        } else {
            player.x -= player.speed
        }
    })
    
    document.querySelector('#right').addEventListener('click', function(e) {
        e.preventDefault()
        if (player.x + player.width >= canvas.width) {
            return
        } else {
            player.x += player.speed
        }
    })
    
    document.querySelector("#forward").addEventListener("click", function (e) {
        e.preventDefault()
        if (player.y <= monster.y + monster.height) {
            return
        } else {
            player.y -= player.speed
        }
    })
    
    document.querySelector("#backward").addEventListener("click", function (e) {
        e.preventDefault()
        if (player.y + player.height >= canvas.height) {
            return
        } else {
            player.y += player.speed
        }
        
    })
    
    document.querySelector('#fire').addEventListener('click', function(e) {
        e.preventDefault()
        
        if (player.ammo > 0) {
            player.shoot()
            player.ammo--
        } else {
            return
        }
        
    })
}

toggle.addEventListener('click', function(e) {
    e.preventDefault()
    monster = new Monster()
    aliens = new Aliens()
    alienBullet = new Alienbullet()
    enemy = new Enemy()
    player = new Player(canvas.width / 2 - 37.5, canvas.height / 1.2)
    bulletController = new BulletController()
    renderButtonEvents()
    gameLoop()
    toggle.disabled = true
})
