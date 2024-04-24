

let start

class Canvas {
    constructor() {
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.width = 350
        this.height = 500
    } 
}

class Newgame extends Canvas {
    constructor() {
        super()
        this.score = 0
        this.bullets = 10
        this.obstacleX = this.width / 2
        this.obstacleY = 0
        this.obstacleWidth = 10
        this.obstacleHeight = 75
        this.obstacleDirection = 2.5
        this.playerWidth = 50
        this.playerHeight = -100
        this.x = (this.width - this.playerWidth) / 2
        this.y = this.height - 20
        this.dx = 50
        this.dy = -50
        this.enemyX = this.width / 2
        this.enemyY = 0
        this.enemyRadius = 75
        this.enemyHits = 0
        this.bulletRadius = 5
        this.bulletX = this.x + this.playerWidth / 2
        this.bulletY = this.y + this.playerHeight
        this.bulletDirection = 5
    }

    drawScore() {
        this.ctx.font = "18px Arial"
        this.ctx.fillStyle = "white"
        this.ctx.fillText(`Score: ${this.score}`, 8, 20)
    }

    drawAmmunition() {
        this.ctx.font = "18px Arial"
        this.ctx.fillStyle = "white"
        this.ctx.fillText(`Ammo: ${this.bullets}`, this.canvas.width - 90, 20)
    }

    drawObstacle() {
        this.ctx.beginPath()
        this.ctx.rect(this.obstacleX - (this.obstacleWidth / 2), this.obstacleY, this.obstacleWidth, this.obstacleHeight)
        this.ctx.fillStyle = "lime"
        this.ctx.fill()
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
        
        this.bulletY -= this.bulletDirection
        
    }

    render() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.drawScore()
        this.drawAmmunition()
        this.drawObstacle()
        this.drawPlayer()
        this.drawEnemy()
        this.drawBullet()
    
        this.obstacleY += this.obstacleDirection
    
        //repeat draw obstacle randomly
        if (this.obstacleY > this.height) {
            this.score++
            this.obstacleY = 0
            this.obstacleX = Math.random() * (1000 - 655)
            this.drawObstacle()
            this.obstacleY += this.obstacleDirection
        }
    
        //collision detection of player being hit by obstacle
        if (this.obstacleY + this.obstacleHeight + this.obstacleDirection > (this.y + this.playerHeight) - this.obstacleDirection &&
            this.obstacleX > this.x &&
            this.obstacleX < this.x + this.playerWidth ) {
                this.obstacleDirection = 0
                alert("Game over, you've been hit!")
                location.reload()
        }
    
        //hitting the enemy with bullets
        if (this.bulletX  > this.enemyX - this.enemyRadius &&
            this.bulletX < this.enemyX + this.enemyRadius &&
            this.bulletY + this.bulletDirection === this.enemyY) {
            
            this.score += 2
            this.enemyHits++
            console.log(this.enemyHits)
            
        }

        //bullet collides with obstacle
        if (this.bulletX + this.bulletRadius >= this.obstacleX && 
            this.bulletX - this.bulletRadius <= this.obstacleX + this.obstacleWidth && 
            this.bulletY + this.bulletRadius + this.bulletDirection === this.obstacleY + this.obstacleHeight) {
                this.score++
                this.obstacleY = 0
                this.obstacleX = Math.random() * (1000 - 655)
                this.drawObstacle()
                this.obstacleY += this.obstacleDirection
        }

        requestAnimationFrame(() => this.render())
        
    }
    
}



//eventlisteners for the buttons
document.querySelector("#start").addEventListener("click", function (e) {
    e.preventDefault()
    start = new Newgame
    start.render()
    requestAnimationFrame(() => start.render())
    
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
    //shoot bullet

    if (start.bullets > 0) {
        start.bulletX = start.x + start.playerWidth / 2
        start.bulletY = start.y + start.playerHeight
        start.bullets--
    } else {
        alert("You have no bullets left")
    }
    
    requestAnimationFrame(() => start.drawBullet())
    
})






  


    
    
    