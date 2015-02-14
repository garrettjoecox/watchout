// start slingin' some d3 here.

// box with stuff inside
// add 'so many' asteroids
// all be chillin' there
// assign new coordinates every time interval 500ms or whatever
// make a Player object that follows mouse or is draggable.
// find collision path with player
  // if collision add to counter, update high score if applicable

// MVP - get asteroids to move around the screen.
var boardHeight = 500;
var boardWidth = 500;
var enemies = _.range(0, 30).map(function(i){
    return {
        id : i,
        x : Math.random()*boardWidth,
        y : Math.random()*boardHeight,
        tt: Math.random()*1000
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


d3.select("svg").selectAll(".enemy")
    .data(enemies)
    .enter()
    .append("circle")
    .attr("cx", function(d){
        return d.x;
    })
    .attr("cy", function (d){
        return d.y;
    })
    .attr("r", "10")
    .attr("fill" , "red");

var move = function (){

    for(i = 0; i < enemies.length;i++){
        enemies[i]['x'] = Math.random()*boardWidth;
        enemies[i]['y'] = Math.random()*boardHeight;
        enemies[i]['tt'] = Math.random()*1000;
    }

    d3.selectAll("circle")
    .transition()
    .duration(function(d){return d.tt})
    .attr("cx", function(d){
        return d.x;
    })
    .attr("cy", function (d){
        return d.y;
    })
    .tween(".enemy", collision);
};

function collision(d){
    return function(t){
        //select player toget x and y
        var px = player[0]['x'];
        var py = player[0]['y'];

        xdiff = d.x-px;
        ydiff = d.y-py;
        dist = Math.sqrt(Math.pow(xdiff, 2) + Math.pow(ydiff, 2));
        //loop over the enemies , compare enemy x and y to player
        // console.log(dist);
        if (dist < 20 && dist !== 0){
            console.log("hit");
        }
    }
    //if less than some threshold (sum of two radius's) then
        //if current score > high score, set high score to current score
        //reset the high score
        //increment collision counter


};

function dragmove(d){
    d3.select(this)
        .attr("cx", d.x = d3.event.x)
        .attr("cy", d.y = d3.event.y);
};
move();
setInterval(move, 1200);

