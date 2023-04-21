const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width = 550;
const height = canvas.height = 500;
bossFight = 0;
let bossInterval = 0;
let interval = 1;
let score = 0;
let lifetime = 0;
let start = 0;
let gameOver = 0;
let speed = {enemy:0.8, player:1}
let soundVar = {s:0, b:2, d:0, l:5, m:9};
const player = {x:40, y:240, width:28, height:48, dx:0, dy:0, dirX:189, dirY:160, health:1};
const bomb = {x:0, y:0, width:0, height:0, dirX:0, dirY:0, trueWidth:0, trueHeight:0};
const boss = {x:(1/2)*canvas.width-35, y:(1/2)*canvas.height-40, dx:0, dy:0, trueWidth:70, trueHeight:80, dirX:0, dirY:120, health:10, safe:0};
const terrainArray = [];
const map = 
[
    ['+','+','+',' ','+','-','+',' ','+','-','+',' ','+','+','+'],
    ['+',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','+'],
    ['+',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','+'],
    ['+',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','+'],
    ['-',' ',' ',' ','+',' ',' ',' ',' ',' ','+',' ',' ',' ','-'],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','+'],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','+'],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','+'],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','+'],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','+'],
    ['-',' ',' ',' ','+',' ',' ',' ',' ',' ','+',' ',' ',' ','-'],
    ['+',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','+'],
    ['+',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','+'],
    ['+',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','+'],
    ['+','+','+',' ','+','-','+',' ','+','-','+',' ','+','+','+']
]

const sfx = 
[
    new Audio("assets/sounds/Skeleton_Hit.wav"),
    new Audio("assets/sounds/Skeleton_Hit.wav"),
    new Audio("assets/sounds/Bow.wav"),
    new Audio("assets/sounds/Bow.wav"),
    new Audio("assets/sounds/Smiech.wav"),
    new Audio("assets/sounds/Boss_Damage.wav"),
    new Audio("assets/sounds/Boss_Damage.wav"),
    new Audio("assets/sounds/Boss_Damage.wav"),
    new Audio("assets/sounds/Boss_Death.wav"),
    new Audio("assets/sounds/Magic.wav"),
    new Audio("assets/sounds/Magic.wav"),
    new Audio("assets/sounds/Player_Death.mp3"),
    new Audio("assets/sounds/Death_Music.mp3"),
    new Audio("assets/sounds/Game_Music.mp3"),
    new Audio("assets/sounds/Explosion.wav")
];
const spriteSheet1 = new Image();
const pociskSprite = new Image();
const enemySprites = new Image();
const bossSprite = new Image();
const magicSprite = new Image();
const terrainSprite1 = new Image();
const terrainSprite2 = new Image();
const bombSprite = new Image();
spriteSheet1.src = "assets/sprites/Spritesheet1.png";
pociskSprite.src = "assets/sprites/Strzała1.png";
enemySprites.src = "assets/sprites/Spritesheet2.png";
bossSprite.src = "assets/sprites/Lich.png";
magicSprite.src = "assets/sprites/Magic_Ball.png";
terrainSprite1.src = "assets/sprites/Ściana1.png";
terrainSprite2.src = "assets/sprites/Ściana2.png";
bombSprite.src = "assets/sprites/Bomb.png";


canvas.style.marginTop = window.innerHeight / 2 - height / 2 + "px";

class pocisk
{
    constructor(x, y, width, height, dx, dy, dirX, dirY, trueWidth, trueHeight, limit)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dx = dx;
        this.dy = dy;
        this.dirX = dirX;
        this.dirY = dirY;
        this.trueWidth = trueWidth;
        this.trueHeight = trueHeight;
        this.limit = limit;
        this.safe = 0;
    }
}

class enemyMelee 
{
    constructor(x, y, trueWidth, trueHeight, dx, dy, dirX, dirY, health,)
    {
        this.x = x;
        this.y = y;
        this.width = 110;
        this.height = 190;
        this.dx = dx;
        this.dy = dy;
        this.dirX = dirX;
        this.dirY = dirY;
        this.health = health;
        this.trueWidth = trueWidth
        this.trueHeight = trueHeight
        this.safe = 0;
    }
}

class terrain
{
    constructor(x, y, image)
    {
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 170;
        this.dirX = 0;
        this.dirY = 100;
        this.trueWidth = 550/15;
        this.trueHeight = 500/15;
        this.image = image;
    }
}

const pociski =
[
    new pocisk(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    new pocisk(0, 0, 0, 0, 0, 0, 0, 0, 30, 30, 0),
]

const enemies = 
[
    new enemyMelee((Math.random()*(canvas.width-200))+150, (Math.random()*(canvas.height-100))+50, 28, 48, 0, 0, 478, 170, 1 ),
    new enemyMelee((Math.random()*(canvas.width-200))+150, (Math.random()*(canvas.height-100))+50, 28, 48, 0, 0, 478, 170, 1 ),
    new enemyMelee((Math.random()*(canvas.width-200))+150, (Math.random()*(canvas.height-100))+50, 28, 48, 0, 0, 478, 170, 1 )
];

map.forEach((row, i) =>
{
    row.forEach((Symbol, j) =>
    {pocisk.dx
        switch(Symbol)
        {
            case '+':
                terrainArray.push(new terrain((550/15)*j,(500/15)*i, terrainSprite1))
                break
            case '-':
                terrainArray.push(new terrain((550/15)*j,(500/15)*i, terrainSprite2))
                break    
        }
    })
})

function update() 
{
    ctx.clearRect(0,0, width, height);
    sfx[13].play();
    drawTerrain();
    for(let i = 0; i < enemies.length; i++)
    {
        drawEnemy(i);
        enemyDamage(i);
        playerDamage(enemies[i], false);
        death(enemies[i], 1, 0, 0, 28, 48, 478, 170, 10000, true, i);
        enemyTracking(i);
        terrainCollision(enemies[i], enemies[i].trueWidth, enemies[i].trueHeight, false);
        enemies[i].x += enemies[i].dx * speed.enemy;
        enemies[i].y += enemies[i].dy * speed.enemy;
    }
    help();
    scoreCounter();
    drawBomb();
    drawPlayer();
    drawPocisk();
    drawMagic();
    dynamicPlayerDirection();
    boundry(player, pociski[0]);
    boundry(boss, pociski[1]);
    terrainCollision(player, player.width, player.height, false);
    terrainCollision(pociski[0], pociski[0].trueWidth, pociski[0].trueHeight, true);
    terrainCollision(pociski[1], pociski[1].trueWidth, pociski[1].trueHeight, true);
    bossDamage();
    bombPickup();
    if(boss.health <= 0)
    {
        death(boss, 10, (1/2)*canvas.width-35, (1/2)*canvas.height-40, 70, 80, 0, 120, 2000, false, 0 );
        sfx[8].play();
        bossFight = 0;
        score += 2000;
    }
    pociski[0].x += pociski[0].dx*speed.player;
    pociski[0].y += pociski[0].dy*speed.player;
    pociski[1].x += pociski[1].dx*speed.enemy;
    pociski[1].y += pociski[1].dy*speed.enemy;
    player.x += player.dx*speed.player;
    player.y += player.dy*speed.player;
    boss.y += boss.dy*speed.enemy;

    if(bossFight == 0) bossSpawn();
    else if(bossFight == 1)
    {
        drawBoss();
        bossMovement();
        bossTracking();
        playerDamage(pociski[1], true);
    }
    playerDeath();

    if(gameOver == 0)
    {
        setTimeout(()=>
        {
            update();
        },10)
    }
}

function drawPlayer()
{
    ctx.drawImage
    (
        spriteSheet1, 
        player.dirX, 
        player.dirY,
        110, 
        190, 
        player.x, 
        player.y, 
        player.width, 
        player.height
    );
}
function drawPocisk()
{
    ctx.drawImage
    (
        pociskSprite, 
        pociski[0].dirX, 
        pociski[0].dirY, 
        pociski[0].width, 
        pociski[0].height, 
        pociski[0].x, 
        pociski[0].y, 
        pociski[0].trueWidth, 
        pociski[0].trueHeight
    );
}
function drawMagic()
{
    ctx.drawImage
    (
        magicSprite, 
        pociski[1].dirX, 
        pociski[1].dirY, 
        pociski[1].width, 
        pociski[1].height, 
        pociski[1].x, 
        pociski[1].y, 
        pociski[1].trueWidth, 
        pociski[1].trueHeight
    );
}
function drawEnemy(i)
{
    ctx.drawImage
    (
        enemySprites, 
        enemies[i].dirX, 
        enemies[i].dirY, 
        enemies[i].width, 
        enemies[i].height, 
        enemies[i].x,
        enemies[i].y,
        enemies[i].trueWidth,
        enemies[i].trueHeight  
    )
}
function drawBoss()
{
    ctx.drawImage
    (
        bossSprite,
        boss.dirX,
        boss.dirY,
        190,
        180,
        boss.x,
        boss.y,
        boss.trueWidth,
        boss.trueHeight,
    )
}
function drawBomb()
{
    ctx.drawImage
    (
        bombSprite,
        bomb.dirX,
        bomb.dirY,
        bomb.width,
        bomb.height,
        bomb.x,
        bomb.y,
        bomb.trueWidth,
        bomb.trueHeight,
    )
}

function drawTerrain(i)
{
    for(let i = 0; i < terrainArray.length; i++)
    {
        ctx.drawImage
        (
            terrainArray[i].image, 
            terrainArray[i].dirX, 
            terrainArray[i].dirY,
            terrainArray[i].width, 
            terrainArray[i].height, 
            terrainArray[i].x, 
            terrainArray[i].y, 
            terrainArray[i].trueWidth, 
            terrainArray[i].trueHeight
        )
    }
}

document.addEventListener('keydown', function(e){
	e.preventDefault();
    if(start == 1)
    {
    	if(e.code == "ArrowRight")
        { 
             player.dx = 1.2;
        }    
	    if(e.code == "ArrowLeft") 
        {
             player.dx = -1.2;
        }    
        if(e.code == "ArrowUp") 
        {
            player.dy = -1.2;
        }
        if(e.code == "ArrowDown") 
        {
            player.dy = 1.2;
        }
    }
})

document.addEventListener('keyup', function(e){
	e.preventDefault();
    if(start == 1)
    {
        if(e.code == "ArrowRight") player.dx = 0;
        if(e.code == "ArrowLeft") player.dx = 0;
        if(e.code == "ArrowUp") player.dy = 0;
        if(e.code == "ArrowDown") player.dy = 0;
        if(e.code == "ControlLeft") 
        {
            if(pociski[0].limit == 0)
            {
                sfx[soundVar.b].play();
                soundVar.b++;
                if(soundVar.b == 4) soundVar.b -= 2;
                if((player.dirX == 478) || (player.dirX == 339))
                {
                    pociski[0].width = 30;
                    pociski[0].height = 90;
                    pociski[0].trueWidth = 6;
                    pociski[0].trueHeight = 25;
                }
                if((player.dirX == 189) || (player.dirX == 30))
                {
                    pociski[0].width = 90;
                    pociski[0].height = 30;
                    pociski[0].trueWidth = 25;
                    pociski[0].trueHeight = 6;
                }
            
                if(( player.dx == 1.2) || (player.dirX == 189)) pociski[0].dx = 6;
                else if(( player.dx == -1.2) || (player.dirX == 30)) pociski[0].dx = -6;
            
                if((player.dy == 1.2) || (player.dirX == 478)) pociski[0].dy = 6;
                else if((player.dy == -1.2) || (player.dirX == 339)) pociski[0].dy = -6;

                if(player.dirX == 189)
                {
                    pociski[0].dirX = 250;
                    pociski[0].dirY = 180;
                    pociski[0].x = player.x;
                    pociski[0].y = player.y + 12;
                    pociski[0].limit = 1;
                }
                if(player.dirX == 30)
                {
                    pociski[0].dirX = 60;
                    pociski[0].dirY = 590;
                    pociski[0].x = player.x;
                    pociski[0].y = player.y + 12;
                    pociski[0].limit = 1;
                }
                if(player.dirX == 339)
                {
                    pociski[0].dirX = 480;
                    pociski[0].dirY = 160;
                    pociski[0].x = player.x + 10;
                    pociski[0].y = player.y;
                    pociski[0].limit = 1;
                }    
                if(player.dirX == 478)
                {
                    pociski[0].dirX = 90;
                    pociski[0].dirY = 150;
                    pociski[0].x = player.x + 10;
                    pociski[0].y = player.y + 20;
                    pociski[0].limit = 1;
                }
            }                      
        }
}
    
})

function objectReset(projectile)
{
    projectile.dirX = 0;
    projectile.dirY = 0;
    projectile.height = 0;
    projectile.width = 0;
    projectile.dx = 0;
    projectile.dy = 0;
    projectile.x = 0;
    projectile.y = 0;
}

function boundry(object, projectile)
{
    if(object.x + object.width > canvas.width) object.x = canvas.width - object.width;
    if(object.x < 0) object.x = 0;
    if(object.y + object.height > canvas.height) object.y = canvas.height - object.height;
    if(object.y < 0) object.y = 0;

    if(projectile.limit == 1)
    {
        if((projectile.x + projectile.trueWidth > canvas.width) || (projectile.x < 0) || (projectile.y + projectile.trueHeight > canvas.height) || (projectile.y < 0))
        {
            objectReset(projectile);
            projectile.limit = 0;
        }
    }  
}
function terrainCollision(object, ow, oh, projectile)
{
    for(let i = 0; i < terrainArray.length; i++)
    {
        if( (terrainArray[i].x < (object.x + ((1/2) * ow)) ) 
        && ((object.x + ((1/2) * ow)) < (terrainArray[i].x + terrainArray[i].trueWidth)) )
        {
            if( (terrainArray[i].y > object.y) && ( (terrainArray[i].y - (object.y + oh) < 0) ) ) 
            {
                object.y = terrainArray[i].y - oh;
                if(projectile == true)
                {
                    objectReset(object);
                    object.limit = 0;
                }
            }
           
            if( (terrainArray[i].y < object.y) && ( (object.y - terrainArray[i].y < 3) ) ) 
            {
                object.y = terrainArray[i].y + 3;
                if(projectile == true)
                {
                    objectReset(object);
                    object.limit = 0;
                }
            }
        }
        
        else if((terrainArray[i].y < (object.y + ((1/2) * oh))) 
        && (object.y + ((1/2) * oh) < (terrainArray[i].y + terrainArray[i].trueHeight)))
        {
            if( (terrainArray[i].x > object.x) && ( (terrainArray[i].x - (object.x + (2/3)*ow) < 0) ) )
            { 
                object.x = terrainArray[i].x - (2/3) * ow;
                if(projectile == true)
                {
                    objectReset(object);
                    object.limit = 0;
                }
            }
            if( (terrainArray[i].x < object.x) && ( (object.x - (terrainArray[i].x + terrainArray[i].trueWidth - (1/3)*ow) < 0) ) ) 
            {
                object.x = terrainArray[i].x + terrainArray[i].trueWidth - (1/3)*ow;
                if(projectile == true)
                {
                    objectReset(object);
                    object.limit = 0;
                }
            }
        } 
    }
}
function enemyTracking(i)
{
    if( (((enemies[i].x + 20) - (player.x + 20)) < 2) && (((player.x) - enemies[i].x) < 2) ) enemies[i].dx = 0;
    else if(((enemies[i].x + 20) - (player.x + 20)) > 2) enemies[i].dx = -0.7;
    else if(((player.x) - enemies[i].x) > 2) enemies[i].dx =  0.7;

    if( (((enemies[i].y + 20) - (player.y + 20)) < 2) && (((player.y + 20) - (enemies[i].y + 20)) < 2) ) enemies[i].dy = 0;
    else if(((enemies[i].y + 20) - (player.y + 20)) > 2) enemies[i].dy = -0.7;
    else if(((player.y + 20) - (enemies[i].y + 20)) > 2) enemies[i].dy =   0.7;


    if(enemies[i].dy == -0.7) 
    {
        enemies[i].dirX = 339;
        enemies[i].dirY = 170;
    }
    else if((enemies[i].dy ==  0.7) || (enemies[i].dy == 0))
    {
        enemies[i].dirX = 478;
        enemies[i].dirY = 170;
    }

}
function bossTracking()
{
    if(pociski[1].limit == 0)
    {
        pociski[1].dirX = 60;
        pociski[1].dirY = 150;
        pociski[1].height = 70;
        pociski[1].width = 70;
        pociski[1].x = boss.x+(1/2)*boss.trueWidth;
        pociski[1].y = boss.y+(1/2)*boss.trueHeight;

        let sum = 0;
        let vectorX = 0;
        let vectorY = 0;
        
        if( (boss.x+(1/2)*boss.trueWidth) <= (player.x + 16) )
        {
            vectorX = (player.x + 20) - (boss.x+(1/2)*boss.trueWidth);  
        }
        else if( (boss.x+(1/2)*boss.trueWidth) > (player.x + 16) )
        {
            vectorX = -((boss.x+(1/2)*boss.trueWidth) - (player.x + 20));    
        }
        
        if( (boss.y+(1/2)*boss.trueHeight) <= (player.y + 24) )
        {
            vectorY = (player.y + 24) - (boss.y+(1/2)*boss.trueHeight); 
        }
        else if( (boss.y+(1/2)*boss.trueHeight) > (player.y + 24) )
        {
            vectorY = -((boss.y+(1/2)*boss.trueHeight) - (player.y + 24)); 
        }
        sum =  Math.abs(vectorX) + Math.abs(vectorY);
        pociski[1].dx = (vectorX/sum)*2;
        pociski[1].dy = (vectorY/sum)*2;
        
        sfx[soundVar.m].play();
        soundVar.m++;

        pociski[1].limit = 1;

    }
    if(soundVar.m >= 11) soundVar.m = 9;
}

function dynamicPlayerDirection()
{
    if( (( player.dx == 1.2) && (player.dy == -1.2)) || (( player.dx == 1.2) && (player.dy == 1.2)) || (( player.dx == 1.2) && (player.dy == 0)) )
    {
        player.dirX = 189;
        player.dirY= 160;
    }
    else if( (( player.dx == -1.2) && (player.dy == -1.2)) || (( player.dx == -1.2) && (player.dy == 1.2)) || ((player.dx == -1.2) && (player.dy == 0)) )
    {
        player.dirX = 30;
        player.dirY = 160;
    }
    else if((player.dx == 0) && (player.dy == -1.2))
    {
        player.dirX = 339;
        player.dirY = 170;
    }
    else if((player.dx == 0) && (player.dy == 1.2))
    {
        player.dirX = 478;
        player.dirY = 170;
    }
}
    function enemyDamage(i)
    {
        if((pociski[0].dirX == 250))
        {
            if( ((enemies[i].x -10 <= pociski[0].x + pociski[0].trueWidth) && (pociski[0].x + pociski[0].trueWidth <= enemies[i].x + enemies[i].trueWidth)) 
                && 
                ((enemies[i].y <= pociski[0].y) && (pociski[0].y <= enemies[i].y + enemies[i].trueHeight)) )
            {
                onHit(i);
            }
        }
        else if((pociski[0].dirX == 60))
        {
            if( ((enemies[i].x -10 <= pociski[0].x) && (pociski[0].x <= enemies[i].x + enemies[i].trueWidth)) 
                && 
                ((enemies[i].y <= pociski[0].y) && (pociski[0].y <= enemies[i].y + enemies[i].trueHeight)) )
            {
                onHit(i);
            }
        }
        else if((pociski[0].dirX == 90))
        {
            if( ((enemies[i].x <= pociski[0].x) && (pociski[0].x <= enemies[i].x + enemies[i].trueWidth)) 
                && 
                ((enemies[i].y <= pociski[0].y + pociski[0].trueHeight) && (pociski[0].y + pociski[0].trueHeight <= enemies[i].y + enemies[i].trueHeight)) )
            {
                onHit(i);
            }
        }
        else if((pociski[0].dirX == 480))
        {
            if( ((enemies[i].x <= pociski[0].x) && (pociski[0].x <= enemies[i].x + enemies[i].trueWidth)) 
                && 
                ((enemies[i].y <= pociski[0].y) && (pociski[0].y <= enemies[i].y + enemies[i].trueHeight)) )
            {
                onHit(i);
            }
        }
        if(soundVar.s == 2) soundVar.s -= 2;
    }
    
    function onHit(i)
    {
        enemies[i].health = 0;
        objectReset(pociski[0]);
        pociski[0].limit = 0;
        sfx[soundVar.s].play();
        soundVar.s++;
    }
    
    function bossDamage()
    {
        if(bossFight == 1)
        {
            if( ( ( (pociski[0].x - (boss.x + 35)) < ((1/2)*boss.trueWidth) ) 
                && ( ((boss.x + 35) - (pociski[0].x + pociski[0].trueWidth)) < ((1/2)*boss.trueWidth) ) )
                && 
                ( ( (pociski[0].y - (boss.y + 40)) < ((1/2)*boss.trueHeight) ) 
                && ( ((boss.y + 40) - (pociski[0].y + pociski[0].trueHeight)) < ((1/2)*boss.trueHeight) ) ) )
            {
                boss.health -= 1;
                objectReset(pociski[0]);
                pociski[0].limit = 0;
                sfx[soundVar.l].play();
                soundVar.l++;
            }
            if(soundVar.l == 8) soundVar.l -= 3;
        }
    }
    
    function playerDamage(projectile, magic)
    {
        if(projectile.safe == 0)
        {
            if( ( ( ((projectile.x + ((1/2)*projectile.trueWidth)) - (player.x + ((1/2)*player.width))) < 10 ) 
                    && ( ((player.x + (1/2)*(player.width)) - (projectile.x + ((1/2)*projectile.trueWidth))) < 10 ) )
                    && 
                    ( ( ((projectile.y + ((1/2)*projectile.trueHeight)) - (player.y + ((1/2)*player.height))) < 20  ) 
                    && ( ((player.y + (1/2)*(player.height)) - (projectile.y + ((1/2)*projectile.trueHeight))) < 20 ) ) )
            {
                player.health = 0;
                sfx[11].play();
                console.log(projectile);
                if(magic == true)
                {
                    objectReset(pociski[1]);
                }
            }
        }
    }
function death(object, h, a, b, c, d, e, f, g, common, i)
{
    if(object.health == 0)
    {
        object.x = 0;
        object.y = 0;
        object.dx = 0;
        object.dy = 0;
        object.trueWidth = 0;
        object.trueHeight = 0;
        object.dirX = 0;
        object.dirY = 0;

        object.health = h;
        object.safe = 1;

        if(common == true)
        {
            score += 50;
        }
            
        setTimeout(() => 
        {
        if(common == false)
        {    
            object.x = a;
            object.y = b;
        }
        if(common == true) randomEnemyPlacement(i);
        object.trueWidth = c;
        object.trueHeight = d;
        object.dirX = e;
        object.dirY = f;
        object.safe = 0;
        }, Math.ceil((Math.random()*(2/3)*g)) + (1/3)*g)
    }
}

function enemyGenerator()
{
    setInterval(() => 
    {
    enemies.push
    (
        new enemyMelee(0, 0, 28, 48, 0, 0, 478, 170, 1 )
    )
    randomEnemyPlacement(enemies.length-1)
    }, 15000);    
}

function bossSpawn()
{
    if(interval == 1)
    {
        bossInterval = setInterval(() => 
            {
            if(gameOver == 0)
            {
                bossFight = 1;
                sfx[4].play();
                clearInterval(bossInterval);
                interval = 1;
            }
            }, 45000);
    }
    interval = 0;    
}

function bombSpawn()
{
    setInterval(()=>
    {
        bomb.x = (Math.random()*400)+40;
        bomb.y = (Math.random()*390)+40;
        bomb.width = 110; 
        bomb.height = 161; 
        bomb.dirX = 40; 
        bomb.dirY = 9; 
        bomb.trueWidth = 22; 
        bomb.trueHeight = 30;
    },(Math.random()*30000) + 10000)
}

function bombPickup()
{
    if( ( ( ((bomb.x + ((1/2)*bomb.trueWidth)) - (player.x + ((1/2)*player.width))) < 20 ) 
        && ( ((player.x + (1/2)*(player.width)) - (bomb.x + ((1/2)*bomb.trueWidth))) < 20 ) )
        && 
        ( ( ((bomb.y + ((1/2)*bomb.trueHeight)) - (player.y + ((1/2)*player.height))) < 20  ) 
        && ( ((player.y + (1/2)*(player.height)) - (bomb.y + ((1/2)*bomb.trueHeight))) < 20 ) ) )
    {
        sfx[14].play();
        sfx[1].play();
        bomb.x = 0;
        bomb.y = 0;
        bomb.width = 0; 
        bomb.height = 0; 
        bomb.dirX = 0; 
        bomb.dirY = 0;
        bomb.trueWidth = 0; 
        bomb.trueHeight = 0;
        
        for(let i = 0; i < enemies.length; i++)
        {
            if((enemies[i].health == 1) && enemies[i].safe == 0) enemies[i].health = 0;
        }

    }            
}

function bossMovement()
{
    if(boss.y > (1/2)*canvas.height) boss.dy = -0.4;
    else if( (boss.y < (1/2)*canvas.height-80) || (boss.dy == 0) ) boss.dy = 0.4;
}

function scoreCounter()
{
    ctx.font = "30px Gothic";
    ctx.fillStyle = "White"
    ctx.fillText("Wynik: " + score + "", 10, 50);
}

function help()
{
    ctx.font = "20px Gothic";
    ctx.fillStyle = "White"
    ctx.fillText("Ctrl - strzelanie", 10, 470);
    ctx.fillText("Strzałki - ruszanie", 10, 490);
}

function lifetimeCounter()
{
    setInterval(()=>
    {
        score += 5;
        lifetime++;
    },1000);
}

function randomEnemyPlacement(i)
{
    let dice = Math.ceil(Math.random()*6);
    
    if(dice <=3)
    {
        enemies[i].x = 116+(144*(dice-1));
        enemies[i].y = 1; 
    }
    else if(dice > 3)
    {
        enemies[i].x = 116+(144*(dice-4));
        enemies[i].y = 470-enemies[i].trueHeight;
    }
}

function gameStart()
{
    if(start === 1)
    {
        update();
        enemyGenerator();
        lifetimeCounter();
        bombSpawn();
    }
    else if(start === 0)
    {
        canvas.style.background = "rgb(20, 20, 20)";
        ctx.font = "55px Gothic";
        ctx.fillStyle = "Ivory"
        ctx.fillText("KRYPTA", 165, 140);
        ctx.fillText("CZARNOKSIĘŻNIKA", 20, 200);

        ctx.font = "30px Gothic";
        ctx.fillStyle = "White"
        ctx.fillText("NACISNIJ ENTER ABY ZACZĄĆ", 60, 320);
    }
}
function playerDeath()
{
    if(player.health <= 0)
    {
        gameOver = 1;
        gameEnd();
        player.health = 1;
    }
}
function gameEnd()
{
    if(gameOver === 1)
    {   
        start = 3;
        sfx[13].pause();
        setTimeout(()=>
    {
        sfx[12].play();
        sfx[4].play();
        canvas.style.background = "rgb(20, 20, 20)";
        ctx.clearRect(0,0, width, height);
        ctx.font = "70px Gothic";
        ctx.fillStyle = "Red"
        ctx.fillText("KONIEC GRY", 60, 180);
        ctx.font = "35px Gothic";
        ctx.fillStyle = "Ivory"
        ctx.fillText("Wynik: "+ score +"", 185, 275);
        ctx.font = "30px Gothic";
        ctx.fillText("Naciśnij Enter Aby Zagrać Ponownie", 50, 350);
    },1000)   
    }    
}
document.addEventListener('keyup', function(e)
{
    if(e.code == "Enter")
    { 
        if(start === 0)
        {
            start = 1;
            gameStart();
            canvas.style.background = "rgb(47, 54, 61)";
        }
        if(gameOver === 1)
        {
            window.location.reload(true);
        }
    }
});    
gameStart();

