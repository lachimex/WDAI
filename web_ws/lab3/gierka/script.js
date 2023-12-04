let score = 30;
let health = 3;
var body = document.getElementById('background');
body.addEventListener('click', clickOnBackground);

document.getElementById('restart').addEventListener('click', function(event){
    event.stopPropagation();
    restart()
})

function clickOnZombie(){
    score += 10;
    document.getElementById('score').innerHTML = score;
}

function clickOnBackground(){
    score -= 3;
    document.getElementById('score').innerHTML = score;
}


function updateHealth(currHealth, interval){
    if (currHealth == 2){
        document.getElementById('heart3').src = 'zdjecia/empty_heart.png';
    }
    else if (currHealth == 1){
        document.getElementById('heart2').src = 'zdjecia/empty_heart.png';
    }
    else if (currHealth == 0){
        document.getElementById('heart1').src = 'zdjecia/empty_heart.png';
        clearInterval(interval);
        clearMap();
        restartButtonShow();
    }
}

function clearMap(){
    var zombies = document.getElementsByClassName('zombie');
    while(zombies.length > 0){
        zombies[0].remove();
    }
}

function checkHealth(interval){
    var zombies = document.getElementsByClassName('zombie');
    for (var i = 0; i < zombies.length; i++){
        var computedStyle = window.getComputedStyle(zombies[i]);
        var leftValue = parseInt(computedStyle.getPropertyValue('left'));
        if (leftValue < 0){
            health -= 1;
            zombies[i].remove();
            updateHealth(health, interval);
        }
    }
}

function run(){
    interval = changeSpeedOfGeneratingZombies(score, null)
    setTimeout( function (){
        interval = changeSpeedOfGeneratingZombies(score, interval);
    }, 5000)
    setTimeout( function (){
        interval = changeSpeedOfGeneratingZombies(score, interval);
    }, 20000)
    setTimeout( function (){
        interval = changeSpeedOfGeneratingZombies(score, interval);
    }, 60000)
}

function changeSpeedOfGeneratingZombies(score, interval){
    var newInterval = timeout(score);
    if (interval != null){
        clearInterval(interval);
    }
    return newInterval;
}

function restartButtonShow(){
    document.getElementById('restart').style.display = 'block';
    document.getElementById('background').style.cursor = 'auto';
    document.getElementById('end').style.display = 'flex';
    document.getElementById('final_score').innerHTML = score;
    document.getElementById('score').style.display = 'none';
}

function restart(){
    document.getElementById('end').style.display = 'none';
    document.getElementById('score').style.display = 'block';
    document.getElementById('heart1').src = 'zdjecia/full_heart.png';
    document.getElementById('heart2').src = 'zdjecia/full_heart.png';
    document.getElementById('heart3').src = 'zdjecia/full_heart.png';
    document.getElementById('background').style.cursor = 'url(zdjecia/rsz_aim.png) 50 50, auto'
    score = 30;
    health = 3;
    document.getElementById('score').innerHTML = score;
    run();
}

function timerBasedOnScore(score){
    if (score < 10){
        return 1000;
    }
    else if (score < 1000) {
        return 600;
    }
    else{
        return 400;
    }

}

function timeout(score){
    var newInterval = setInterval( function(){
        checkHealth(interval)
        var zombie = document.createElement('div');
        zombie.classList.add('zombie');

        var scaleSize = 0.8 + Math.random() * 0.5;
        var scaleSpeed = scaleSize - (1 - scaleSize);
        zombie.style.transform = "scale("+scaleSize+")";

        zombie.style.animation = "zombieAnim 0.6s 0s infinite steps(9), zombieWalk " + 6 * scaleSpeed + "s 1 linear";

        var randomizePosition = body.offsetHeight * Math.random() + 200;
        while (randomizePosition + 310 * scaleSize > body.offsetHeight){
            var randomizePosition = body.offsetHeight * Math.random() + 200;
        }
        zombie.style.top = randomizePosition + 'px';
        zombie.addEventListener('click', function(event){
            event.stopPropagation();
            clickOnZombie()
            this.remove();
        });
        if (health > 0){
            document.getElementById('main').appendChild(zombie);
        }
    }, timerBasedOnScore(score));
    return newInterval;
}

run()