
//key variables
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

//obstacle variables
let obstacleX = canvas.width / 2
let obstacleY = 0
let obstacleWidth = 10
let obstacleHeight = 75
let obstacleDirection = 5
//player variables
let playerWidth = 50
let playerHeight = -100
let x = (canvas.width - playerWidth) / 2
let y = canvas.height - 20
let dx = 50
let dy = -50
let score = 0
//enemy variables
let enemyX = canvas.width / 2
let enemyY = 0
let enemyRadius = 75
let enemyLeft = -10
let enemyRight = 10
//bullet variables
let ballRadius = 5
let ballX = x + playerWidth / 2
let ballY = y + playerHeight
let ballDirection = -10

//draw score function
function drawScore() {
    ctx.font = "18px Arial"
    ctx.fillStyle = "white"
    ctx.fillText(`Score: ${score}`, 8, 20)
}

//draw obstacle function
function drawObstacle() {
    ctx.beginPath()
    ctx.rect(obstacleX - (obstacleWidth / 2), obstacleY, obstacleWidth, obstacleHeight)
    ctx.fillStyle = "lime"
    ctx.fill()
}

//draw player function 
function drawPlayer() {
    ctx.beginPath()
    ctx.rect(x, y, playerWidth, playerHeight);
    ctx.fillStyle = "gray"
    ctx.strokeStyle = "white"
    ctx.lineWidth = 5
    ctx.stroke()
    ctx.fill()
}

//draw enemy function
function drawEnemy() {
    ctx.beginPath()
    ctx.arc(enemyX, enemyY, enemyRadius, 0, Math.PI)
    ctx.fillStyle = "lime"
    ctx.fill()
    ctx.closePath()
}

//draw bullet and move bullet
function drawBullet() {
    ctx.beginPath()
    ctx.arc(ballX, ballY - 2, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = "yellow"
    ctx.fill()
    ctx.closePath()

     ballY += ballDirection
}

//render drawing 
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawScore()
    drawObstacle()
    drawPlayer()
    drawEnemy()
    drawBullet()

    obstacleY += obstacleDirection

    //repeat draw obstacle randomly
    if (obstacleY - obstacleHeight === canvas.height) {
        score++
        obstacleY = 0
        obstacleX = Math.random() * (1000 - 655)
        drawObstacle()
        obstacleY += obstacleDirection
    }

    //collision detection
    if (obstacleY + obstacleHeight + obstacleDirection === (y + playerHeight) + 15 &&
        obstacleX > x &&
        obstacleX < x + playerWidth ) {
        alert("Game over!")
        document.location.reload()
    }

    requestAnimationFrame(render)
}


//eventlisteners for the buttons
document.querySelector("#start").addEventListener("click", function (e) {
    e.preventDefault()
    render()
})

document.querySelector("#forward").addEventListener("click", function (e) {
    e.preventDefault()
    if ((y + dy) + playerHeight < 0) {
        return
    } else {
        y += dy
    }
})

document.querySelector("#backward").addEventListener("click", function (e) {
    e.preventDefault()
    if ((y + dy) - playerHeight > canvas.height) {
        return
    } else {
        y -= dy
    }
    
})

document.querySelector("#left").addEventListener("click", function (e) {
    e.preventDefault()
    if ((x + dx) - playerWidth <= 0) {
        return
    } else {
        x -= dx
    }
    
})

document.querySelector("#right").addEventListener("click", function (e) {
    e.preventDefault()
    if ((x + dx) + playerWidth > canvas.width) {
        return
    }
    x += dx
})

document.querySelector("#fire").addEventListener("click", function (e) {
    e.preventDefault()
    //shoot bullet
    if (ballY + ballDirection < 0) {
        ballX = x + playerWidth / 2
        ballY = y + playerHeight
        drawBullet()
    }
    requestAnimationFrame(drawBullet)
    
})




  


    
    
    