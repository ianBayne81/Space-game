

let start

class Canvas {
    constructor() {
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.width = 350
        this.height = 450
    } 
}

class Newgame extends Canvas {
    constructor() {
        super()
        this.score = 0
        this.bullets = 100
        this.obstacleX = Math.floor(Math.random() * (1000 - 655))
        this.obstacleY = 0
        this.obstacleWidth = 25
        this.obstacleHeight = 50
        this.obstacleDirection = 4
        this.playerWidth = 30
        this.playerHeight = -50
        this.x = (this.width - this.playerWidth) / 2
        this.y = this.height - 20
        this.dx = 20
        this.dy = -20
        this.enemyX = this.width / 2
        this.enemyY = 0
        this.enemyRadius = 75
        this.enemyHits = 0
        this.bulletRadius = 5
        this.bulletX = this.x + this.playerWidth / 2
        this.bulletY = this.y + this.playerHeight
        this.bulletDirection = 4
        this.padding = 15
    }

    drawScore() {
        this.ctx.font = "18px Arial"
        this.ctx.fillStyle = "white"
        this.ctx.fillText(`Score: ${this.score}`, 8, 20)
    }

    drawAmmunition() {
        this.ctx.font = "18px Arial"
        this.ctx.fillStyle = "white"
        this.ctx.fillText(`Ammo: ${this.bullets}`, this.canvas.width - 100, 20)
    }
    
    drawObstacle() {
        this.ctx.beginPath()
        this.ctx.rect(this.obstacleX, this.obstacleY, this.obstacleWidth, this.obstacleHeight)
        this.ctx.fillStyle = "lime"
        this.ctx.fill()

        if (this.obstacleY > this.height) {
            this.obstacleY = 0
            this.obstacleX = Math.floor(Math.random() * (1000 - 655))
            this.drawObstacle()
            
        }

        this.obstacleY += this.obstacleDirection
    }

    drawPlayer() {
        this.ctx.beginPath()
        this.ctx.rect(this.x, this.y, this.playerWidth, this.playerHeight);
        this.ctx.fillStyle = "gray"
        this.ctx.strokeStyle = "white"
        this.ctx.lineWidth = 5
        this.ctx.stroke()
        this.ctx.fill()
    }

    drawEnemy() {
        this.ctx.beginPath()
        this.ctx.arc(this.enemyX, this.enemyY, this.enemyRadius, 0, Math.PI)
        this.ctx.fillStyle = "lime"
        this.ctx.fill()
        this.ctx.closePath()
    }
    
    drawBullet() {
        this.ctx.beginPath()
        this.ctx.arc(this.bulletX, this.bulletY - 2, this.bulletRadius, 0, Math.PI * 2)
        this.ctx.fillStyle = "yellow"
        this.ctx.fill()
        this.ctx.closePath()
        
        if (this.bulletY === 0) {
            this.bulletX = this.x + this.playerWidth / 2
            this.bulletY = this.y + this.playerHeight
        }

        this.bulletY -= this.bulletDirection
    }

    playerBeingHit() {
        if (this.obstacleY + this.obstacleHeight + this.obstacleDirection >= this.y + this.playerHeight &&
            this.obstacleX + this.obstacleWidth >= this.x &&
            this.obstacleX <= this.x + this.playerWidth) {
                this.obstacleDirection = 0
                alert("Game over, you've been hit!")
                location.reload()
        }
    }
    
    enemyBeingHit() {
        if (this.bulletX  > this.enemyX - this.enemyRadius &&
            this.bulletX < this.enemyX + this.enemyRadius &&
            this.bulletY <= this.enemyY + this.enemyRadius) {

            this.score += 1
            this.enemyHits++
            this.bulletX = this.x + this.playerWidth / 2
            this.bulletY = this.y + this.playerHeight
        }
    }

    bulletCollision() {
        if (this.bulletY - this.bulletRadius < this.obstacleY + this.obstacleHeight &&
            this.bulletX >= this.obstacleX &&
            this.bulletX <= this.obstacleX + this.obstacleWidth) {
                this.score++
                this.obstacleY = 0
                this.obstacleX = Math.floor(Math.random() * (1000 - 655))
                this.bulletX = this.x + this.playerWidth / 2
                this.bulletY = this.y + this.playerHeight
        }
    }
    
    render() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.drawScore()
        this.drawAmmunition()
        this.drawObstacle()
        this.drawPlayer()
        this.drawEnemy()
        this.playerBeingHit()
        this.enemyBeingHit()
        this.bulletCollision()
        this.drawBullet()
        
        requestAnimationFrame(() => this.render())
    }
}

//eventlisteners for the buttons
document.querySelector("#start").addEventListener("click", function (e) {
    e.preventDefault()
    start = new Newgame
    start.render()
})

document.querySelector("#forward").addEventListener("click", function (e) {
    e.preventDefault()
    if ((start.y + start.dy) + start.playerHeight < 0) {
        return
    } else {
        start.y += start.dy
    }
})

document.querySelector("#backward").addEventListener("click", function (e) {
    e.preventDefault()
    if ((start.y + start.dy) - start.playerHeight > start.height) {
        return
    } else {
        start.y -= start.dy
    }
    
})

document.querySelector("#left").addEventListener("click", function (e) {
    e.preventDefault()
    if ((start.x + start.dx) - start.playerWidth <= 0) {
        return
    } else {
        start.x -= start.dx
    }
    
})

document.querySelector("#right").addEventListener("click", function (e) {
    e.preventDefault()
    if ((start.x + start.dx) + start.playerWidth > start.width) {
        return
    }
    start.x += start.dx
})

document.querySelector("#fire").addEventListener("click", function (e) {
    e.preventDefault()
    if (start.bullets > 0) {
        start.bulletX = start.x + start.playerWidth / 2
        start.bulletY = start.y + start.playerHeight
        start.drawBullet()
        start.bullets--
    } else {
        alert("You have no bullets left")
    }
    
})






  


    
    
    