
var origin = new Point(200, 200);
var maxArea = 90;

var maxTopLeft     = new Point(origin.x - maxArea, origin.y - maxArea);
//var maxTopRight    = new Point(origin.x + maxArea, origin.y + maxArea);
//var maxBottomLeft  = new Point(origin.x - maxArea, origin.y - maxArea);
var maxBottomRight = new Point(origin.x + maxArea, origin.y + maxArea);

//testing
var area = new Path.Rectangle({
    from: maxTopLeft,
    to: maxBottomRight,
    strokeColor: 'grey'
});
//-------

var arrowSize = 7;
var arrowAngle = 3;
var xAxis = new Path();
xAxis.strokeColor = 'black';
xAxis.add(
    new Point(origin.x, origin.y + maxArea + arrowSize),
    new Point(origin.x, origin.y - maxArea - arrowSize),
    new Point(origin.x + arrowSize - arrowAngle, origin.y - maxArea),
    new Point(origin.x, origin.y - maxArea - arrowSize),
    new Point(origin.x - arrowSize + arrowAngle, origin.y - maxArea)
    );
var yAxis = xAxis.clone();
yAxis.rotate(90);


var additionAngle = 1;

var a = 1;
var r = 0; //radius vector
var fi = 0; //angle

var i = 0;

var point = new Point();
var line = new Path();
line.strokeColor = 'orange';

while(point >= maxTopLeft && point <= maxBottomRight) {
    r = a * fi++;
    
    var x = r * Math.cos(fi);
    x = Math.round(x);
    var y = r * Math.sin(fi);
    y = Math.round(y); 
    
    var vector = new Point(x, y);
    
    line.add(vector + origin);
    console.log("11")
    
    if (i++ == 10) break; 
};














