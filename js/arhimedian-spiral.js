var center = new paper.Point(200, 195);
paper = mypapers[0];

var field;
drawField();
    
var buttonRedraw;
drawButtons();
    
    
var origin = field.bounds.center;
var maxArea = 120;
var maxTopLeft = new paper.Point(origin.x - maxArea, origin.y - maxArea);
var maxBottomRight = new paper.Point(origin.x + maxArea, origin.y + maxArea);
    
drawAxis();
    
/*!*/var a1 = 10;
/*!*/var line = new paper.Path();
var lineR = new paper.Path.Line({
  strokeColor: '#5CCDC9',
  strokeJoin: 'round',
  dashArray: [5, 5],
  from: origin,
  to: [100, 200],
});
var dot = new paper.Path.Circle({
  center: origin,
  radius: 4,
  fillColor: 'red',
})
drawArhimedianSpiral();
       
scroll();   
    
    
    //=== function defenition ===//
function drawField() {
  var canvas = new paper.Path.Rectangle({
    from: [0,0],
    to: [400, 440],
    strokeColor: 'black', 
  });
      
  field = new paper.Path.Rectangle({
    from: [center.x - 178, center.y - 172],
    to: [center.x + 178, center.y + 172],
    strokeColor: '#C9902E',
    strokeJoin: 'round',
    dashArray: [10, 5],
    fillColor: '#FAEBD7',
  });
};

function drawButtons() {
  var buttonsSubstrate = new paper.Path.Rectangle({
    point: field.bounds.bottomRight - [80,10],
    size: [70, 20],
    strokeColor: '#C9902E',
    strokeJoin: 'round',
    dashArray: [10, 5],
    fillColor: '#FAEBD7',
    name: 'buttonsSubstrate',
  });
  var textRedraw = new PointText({
    content: 'REDRAW',
    position: buttonsSubstrate.bounds.center,
    fillColor: 'black',
    name: 'textRedraw',
  });
  
  buttonRedraw = new Group({
    children: [buttonsSubstrate, textRedraw],
  })
  
  buttonRedraw.onMouseDown = function(event) {
    buttonRedraw.children['buttonsSubstrate'].fillColor = '#FAEB89';
    buttonRedraw.children['textRedraw'].fillColor = '#C9902E';
  }
  buttonRedraw.onMouseUp = function(event) {
    buttonRedraw.children['buttonsSubstrate'].fillColor = '#FAEBD7';
    buttonRedraw.children['textRedraw'].fillColor = 'black';
    
    /*!*/line.remove();
    /*!*/line = new Path();
    /*!*/drawArhimedianSpiral();
  }
};

function drawAxis() {
  var arrowSize = 7;
  var arrowLenght = 10;
  var arrowAngle = 3;
  var yAxis = new Path();   
  yAxis.add(
    [origin.x, origin.y + maxArea + arrowSize],
    [origin.x, origin.y - maxArea - arrowSize],
    [origin.x + arrowSize - arrowAngle, origin.y - maxArea],
    [origin.x, origin.y - maxArea - arrowSize],
    [origin.x - arrowSize + arrowAngle, origin.y - maxArea]
  );
  yAxis.strokeColor = 'grey';
  
  var xAxis = yAxis.clone();
  xAxis.rotate(90);
}

function scroll() {
  var r1 = 10;
  var r2 = 100;
  var scrollLine = Path.Rectangle({
    from: [20+r1, 301+r2],
    to: [200+r1, 304+r2],
    fillColor: 'orange'
  });       
  var scrollBar = Path.Rectangle({
    from: [150+r1, 295+r2],
    to: [158+r1, 310+r2],
    fillColor: 'orange'
  });
  
  var text = new PointText({
    point: [240+r1, 300+r2],
    fillColor: 'black',
    content: 'a: ' + (Math.round(scrollBar.position.x/15)),
  });
  
  scrollBar.onMouseDrag = function(event) {
    //íóæíî ïîäóìàòü, ñòîèò ëè îãðàíè÷èâàòü ïî âåðòèêàëè?..
    //ìîæåò ñäåëàòü, ÷òî åñëè óêàçàëåëü áóäåò ïåðåäâèãàòüñÿ â îïðåäåëåííîé îáëàñòè, òî scrollBar òóäà ïåðåìåñòèòüñÿ?
    if (event.point.x > 20+r1 && event.point.y > 295+r2 
        && event.point.x < 200+r1 && event.point.y < 310+r2) {
      this.position.x = event.point.x;
      this.fillColor = 'red';
      
      a1 = this.position.x/15;
      /*!*/text.content = 'a: ' + (Math.round(this.position.x/15));
   
    }
  }
  scrollBar.onMouseUp = function(event) {
    this.fillColor = 'orange';
  }
  scrollBar.onMouseDown = function(event) {
    this.fillColor = 'red';
  }
}

function drawArhimedianSpiral() {
  var a = /*!*/a1;
  var r = 0; //radius vector
  var fi = 0; //angle
  var k = 1.3/a;
  var i = 0;
  var point = origin;
  line.strokeColor = 'orange';
  line.strokeWidth = 2.5;
  
  view.onFrame = function(event) {
    if (point.x > maxTopLeft.x 
    && point.y > maxTopLeft.y 
    && point.x < maxBottomRight.x
    && point.y < maxBottomRight.y ) {
      r = a * fi;
      var x = r * Math.cos(fi);
      x = Math.round(x);
      var y = r * Math.sin(fi);
      y = Math.round(y); 
     
      var vector = new Point(x, y);
      point = vector + origin;
      
      line.add(point);
      dot.position = point;
      lineR.segments[1].point = point;
      
      fi = fi + k;
      
      if (i % 20 == 0) k *= 0.91;
      i++;
    }
    line.smooth();
    //line.selected = true
  }

  line.smooth();
}
