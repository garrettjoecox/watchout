// start slingin' some d3 here.

// box with stuff inside
// add 'so many' asteroids
// all be chillin' there
// assign new coordinates every time interval 500ms or whatever
// make a Player object that follows mouse or is draggable.
// find collision path with player
  // if collision add to counter, update high score if applicable

// MVP - get asteroids to move around the screen.
var boardHeight = window.innerHeight - 100;
var boardWidth = window.innerWidth - 50;
var score = 0;
var highScore = 0;
var collisionCtr = 0;
var badguys = 30;
var enemies = _.range(0, badguys).map(function(i){
    return {
        id : i,
        x : Math.random()*boardWidth,
        y : Math.random()*boardHeight,
        tt: Math.random()*1000,
        r: 0
    }
});
var player = _.range(0, 1).map(function(i){
    return {
        x : boardWidth/2,
        y : boardHeight/2
    }
});

d3.select(".scoreboard")
    .append("svg")
    .attr("width", boardWidth+"px")
    .attr("height", boardHeight+"px")


var drag = d3.behavior.drag()
    .origin(function(d){return d})
    .on("drag", dragmove)



d3.select("svg").selectAll(".player")
    .data(player)
    .enter()
    .append("circle")
    .attr("cx", function (d){
        return d.x;
    })
    .attr("cy", function (d){
        return d.y;
    })
    .attr("r", "10")
    .attr("fill", "green")
    .call(drag);



var move = function (){
d3.select("svg").selectAll(".enemy")
    .data(enemies)
    .enter()
    .append("image")
    .attr("xlink:href","shuriken.png")
    .attr("height","20px")
    .attr("width","20px")
    .style("z-index","100")
    .attr("class", "enemy")
    .attr("x", function(d){
        return d.x;
    })
    .attr("y", function (d){
        return d.y;
    })

    var oldx, oldy

    for(i = 0; i < enemies.length;i++){
        oldx = enemies[i]['x']+10;
        oldy = enemies[i]['y']+10;
        enemies[i]['x'] = Math.random()*boardWidth;
        enemies[i]['y'] = Math.random()*boardHeight;
        enemies[i]['tt'] = Math.random()*1000;

        d3.select("svg")
        .append("line")
        .attr("style", "stroke:rgb(255,0,0);stroke-width:2")
        .attr("x1", oldx).attr("y1", oldy)
        .style("opacity",0)
        .transition()
        .style("opacity",1)
        .attr("x2", enemies[i]['x']+10).attr("y2", enemies[i]['y']+10)
        .remove()

    }

    d3.selectAll(".enemy")
    .transition()
    .delay(200)
    .duration(function(d){return d.tt})
    .tween(".enemy", collision)
    .attr("x", function(d){
        return d.x;
    })
    .attr("y", function (d){
        return d.y;
    })
    // d3.selectAll(".enemy")
    // .transition()
    // .tween(".enemy", rotate);


};

function collision(d, i){
    var colliding = false;
    return function(t){
        //select player toget x and y
        var px = player[0]['x'];
        var py = player[0]['y'];
        var x = d3.select(this).attr('x')+10;
        var y = d3.select(this).attr('y')+10;
        if (enemies[i]) { enemies[i].r = enemies[i].r + 30; }
        d3.select(this).attr("transform", "rotate(" + d.r + " " + x + " " + y + ")")
        xdiff = d3.select(this).attr('x')-px;
        ydiff = d3.select(this).attr('y')-py;
        dist = Math.sqrt(Math.pow(xdiff, 2) + Math.pow(ydiff, 2));
        //loop over the enemies , compare enemy x and y to player
        if (dist < 20 && dist !== 0){

            if (highScore < score){
                highScore = score;
            }
            if (!colliding){
                collisionCtr++;
                d3.select(".collisions").select('span').text(collisionCtr);

                colliding = true;
            }
            d3.select(".high").select('span').text(highScore);
            d3.select(".current").select('span').text(score);
            score = 0;
        }
    }
    //if less than some threshold (sum of two radius's) then
        //if current score > high score, set high score to current score
        //reset the high score
        //increment collision counter


};

function updateSlider(hi){
    badguys = hi;
    d3.select("svg").selectAll(".enemy")
    .data(enemies)
    .remove()
    enemies = _.range(0, badguys).map(function(i){
    return {
        id : i,
        x : Math.random()*boardWidth,
        y : Math.random()*boardHeight,
        tt: Math.random()*1000+400,
        r: 0
    }
});
}

function dragmove(d){
    d3.select(this)
        .attr("cx", d.x = Math.min(boardWidth, Math.max(d3.event.x, 0)))
        .attr("cy", d.y = Math.min(boardHeight, Math.max(d3.event.y, 0)));
};
move();
setInterval(move, 1500);

setInterval(function(){
    score++;
    d3.select(".current").select('span').text(score);
}, 1000);

