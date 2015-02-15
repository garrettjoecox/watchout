var settings = {
  height: window.innerHeight,
  width: window.innerWidth,
  radius: 15,
  enemyCount : 30,
  enemyTravelTime : 1000



}
var stats = {
  current: 0,
  high: 0,
  collisions: 0
}

var rando = function(n){
  return Math.floor(Math.random()*n);
}
var randx = function (){
  return rando(settings.width);
}
var randy = function(){
  return rando(settings.height)
}
var board = d3.select('.scoreboard')
  .style({
    height: settings.height+ "px",
    width: settings.width+ "px"
    // border: solid black 2px
  });

var enemies = board.selectAll('.enemies')
  .data(d3.range(settings.enemyCount))
  .enter()
  .append('div')
  .attr("class", "enemy")
  .style({
    height: settings.radius*2+ "px",
    width: settings.radius*2+ "px",
    left: settings.width/2+ "px",
    top: settings.height/2+ "px"
  });

var player = board.selectAll('.mouse')
  .data(d3.range(1))
  .enter()
  .append('div')
  .attr("class", "mouse")
  .style({
    height: settings.radius*2+ "px",
    width: settings.radius*2+ "px",
    top: settings.height/2+ "px",
    left: settings.width/2+ "px",
    'background-color': "green"
  });

var move = function (element){
  element
  .transition()
  .duration(settings.enemyTravelTime)
  .style({
    top: randy() + "px",
    left: randx() +"px"
  })
  .each('end', function(){
    move(d3.select(this))});
}
move(enemies);




