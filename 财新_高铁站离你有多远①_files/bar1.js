function default0(){
  $("#back3").removeClass("fix_center"); 
  $("#back4").css("display","none");
  $(".quater").css("display","none")
}
function back3Func(){
  $("#back4").css("display","none")
  $("#back3").addClass("fix_center");
  $("#back3").stop().fadeIn(300);
}
function back4Func(){
  $("#back3").stop().fadeOut(300);
  $("#back4").stop().fadeIn(300);
}
function mapBack(){
  $("#back4").removeClass("rank_bottom");
  $("#back4").addClass("fix");
  $("#back4").css("display","block")
}
function mapGone(){
  $("#back4").removeClass("fix");
  $("#back4").addClass("rank_bottom");
}

var duration = 1000;
var w,h,ratio,ratio_h,space_height,back1,back2,back3,back5,front1,front111,front2,front3,front4,front5,front6,front7,half_scatter_h,front9,front10,front11,credit;
var margin,rank_width,rank_height,width,height,x,y;

function resize1(){

  w = $(window).width();
  h = $(window).height();
  ratio = w/100;
  ratio_h = h/100;
    
  if(w<800){
    space_height = 1.7776 * w + 750;
    }else if(w>=800 && w<1500){
      space_height = .5622 * w + 500;
    }else{
      space_height = .5622 * w + 600;
    }
  $(".space").css("height", space_height);
  
  
  back1 = $("#back1").height();
  back2 = $("#back2").offset().top;
  var back3_top;
  if(w<800){
    back3_top =  1.7776* w + 710;
  }else{
    back3_top = .5622 * w + 500
  }
  back3 = back3_top - ( .5 * h - 250 );
  front1 = $("#front1").offset().top;
  front2 = $("#front2").offset().top - .2 * h;
  front3 = $("#front3").offset().top - .2 * h;
  front4 = $("#front4").offset().top - .2 * h;
  front5 = $("#front5").offset().top - .2 * h;
  front6 = $("#front6").offset().top - .2 * h;
  front7 = $("#front7").offset().top - .5 * h;
  front8 = $("#front8").offset().top - 1.1 * h;
  if(w<800){
    half_scatter_h = .5 *w;
  }else if(w>800 && w< 1500){
    half_scatter_h = .25 *w;
  }else{
    half_scatter_h = 350;
  }
  back5 = $("#scatter").offset().top - ( h*.5 - half_scatter_h );
  front9 = $("#front9").offset().top - h*.1;
  front10 = $("#front10").offset().top -  h*.5;
  front11 = $("#front11").offset().top -  h*.5;
  front12 = $("#front12").offset().top -  h*.5;
  credit = $(".credits").offset().top-  h*.5;


  // rank_width/rank_height是第一个交互图的总宽高；width/height是bar chart的宽高；
  if(w<800){
    margin = 25;
    rank_width = w;
    rank_height = h;
    map_width = 80 * ratio;
    map_height = 65 * ratio_h;
  }else if(w>=800 && w<1500){
    margin = 50;
    rank_width = 95 * ratio;
    rank_height = 90 * ratio_h;
    map_width = 60 * ratio;
    map_height = 70 * ratio_h;
  }else{
    margin = 50;
    rank_width = 95 * ratio;
    rank_height = 80 * ratio_h;
    map_width = 60 * ratio;
    map_height =65 * ratio_h;
  }
  
  width = rank_width - margin - margin,
  height = rank_height - margin - margin;
  if(w<800){
      x = d3.scaleLinear().range([0,width]);
      y = d3.scaleBand().range([height,0]).padding(0.5);
  }else{
      x = d3.scaleBand().range([0, width]).padding(0.5);
      y = d3.scaleLinear().range([height, 0]);
  }
} /*RESIZE1 END*/
resize1();

var map_g = d3.select("#rank_svg").append("g").attr("class","map");
var rank_svg = d3.select("#rank_svg");
var rank_g = rank_svg.append("g").attr("class","rank");
var rank_x = rank_g.append("g").attr("class", "axis rank_x");
var rank_y =  rank_g.append("g").attr("class", "axis rank_y")
var rank_x_title = rank_g.append("text").attr("class","axis_title").text("市中心——高铁站直线距离（公里）");
if(w>800){
var rank_y_title = rank_g.append("text").attr("class","axis_title").text("高铁站");
}
var tooltip = d3.select("body").append("div").attr("class", "tooltip").style("display", "none")
var tooltip_s = d3.select("body").append("div").attr("class", "tooltip_s").style("display", "none")
var scatter_g = d3.select("#scatter_svg").append("g");
var color = d3.scaleOrdinal().range(["#1f7a7a","#5bb5b1","#bfd3d8","#e8c8cf","#e87c7c","#bc4a4a","6b0505"]);
var scatter_x = scatter_g.append("g").attr("class", "axis axis_s scatter_x");
var scatter_y = scatter_g.append("g").attr("class", "axis axis_s scatter_y");
var scatter_x_title = scatter_g.append("text").attr("class","axis_title").text("（城市大小->)  建成区半径(公里)");
var scatter_y_title = scatter_g.append("text").attr("class","axis_title").text("距离指数（车站偏远程度)");
var ratio_s,width_s,height_s,x_s,y_s,xAxis_s,yAxis_s;

function resize2(){
  map_g.attr("transform", function(){return w<800 ? "translate(" + width/4+ "," + height/2 + ")" : "translate(" + margin + "," + margin * 2 + ")"})
    .attr("width", map_width)
    .attr("height", map_height);
  rank_svg.attr("width", rank_width).attr("height", rank_height)
  rank_g.attr("transform", function(){return w<800 ? "translate(" + margin + "," + margin*2 + ")" : "translate(" + margin + "," + margin + ")"})
  rank_x.attr("transform", function(){ return w<800 ? "translate(0,-2)" : "translate(0," + height + ")"})
  rank_y.attr("transform", function(){ return w<800 ? "translate(0,0)" : "translate(" + (width + 5) + ",0)"});
  rank_x_title.attr("x", w<800 ? width/2 : rank_width-margin)
      .attr("y", w<800 ? -margin*1.4 :- margin/2)
      .attr("dy", "0.71em");
  if(w>800){
    rank_y_title
      .attr("x", rank_width/2 - 20)
      .attr("y", height + 40);
  }

  // SCATTER
  ratio_s = $("#scatter").width()/100;
  width_s = 100 * ratio_s - margin*2;  
  height_s = width_s;
  scatter_g.attr("width", w<800 ? w : 1000).attr("height", w<800 ? w : 1000)
            .attr("transform", function(){ return w<800 ? "translate(" + margin + "," + w * .08 + ")" : "translate(" + margin + ",40)"});
  x_s = d3.scaleLinear().range([0, width_s]);
  y_s = d3.scaleLinear().range([height_s , 0]);
  xAxis_s = d3.axisBottom(x_s).tickSize(width_s).ticks(6);
  yAxis_s = d3.axisLeft(y_s).tickSize(width_s).ticks(6);
  scatter_x.attr("transform", "translate(0,0)");
  scatter_y.attr("transform", "translate(" + width_s + ",0)")
  
  scatter_x_title
      .attr("x", w<800? width_s - margin * 4 : width_s)
      .attr("y", w<800? height_s + margin * 1.3 : height_s + margin * .6)
  scatter_y_title
      .attr("x", w<800? margin * 2.5 : margin * 2.8)
      .attr("y", w<800? - margin * .7 : - margin * .2)
}
resize2();
  
queue()
    .defer(d3.csv, "data/data_bd091.csv", typeAndSet)
    .defer(d3.json, "data/china.json")
    .defer(d3.csv, "data/point.csv", typePoint)
    .await(loaded);

function typeAndSet(d) {
    d.length_km = +d.length_km;
    d.id = +d.id;
    d.level = +d.level;
    d.radius = +d.radius;
    d.q = +d.q;
    return d;
}
function typePoint(d) {
    d[0] = +d.lon;
    d[1] = +d.lat;
    d.lines = {type: "MultiLineString", coordinates: []}; 
    return d;
}

function loaded(error, data, china, point){
    if (error) throw error;

    data.sort(function(a,b){
      return d3.ascending(a.length_km, b.length_km);
    })

    function update(data){
      if(w<800){
        // mobile的xy轴数据和pc是相反的
        x.domain([0,Math.ceil(d3.max(data, function(d) { return d.length_km; }))]);
        y.domain(data.map(function(d) { return d.station; }));
      }else{
        x.domain(data.map(function(d) { return d.station; }));
        y.domain([0, Math.ceil(d3.max(data, function(d) { return d.length_km; }))]);
      }

        var bars = rank_g.selectAll(".bar")
            .data(data);
        bars
            .enter()
            .append("rect")
            .attr("width", 0)
            .attr("height", 0)
            .attr("y", height)
            .merge(bars)
            .transition()
            .duration(duration)  
            .attr("class", function(d){
              return "bar bar" + d.id;
            })
            .attr("id", function(d){
              return d.id;
            })    
            .attr("width", function(d){ return w<800 ? x(d.length_km) : x.bandwidth();})
            .attr("height", function(d){ return w<800 ? y.bandwidth() : height - y(d.length_km);})
            .attr("x", function(d) { return w<800 ? 0 : x(d.station); })
            .attr("y", function(d) { return w<800 ? y(d.station) : y(d.length_km);});
          bars
            .exit()
            .transition()
            .duration(duration)
            .attr('width', 0)
            .attr('height', 0)
            .attr('y', height)
            .remove();   

          if(w<800){
            rank_g.select('.rank_x')
              .transition()
              .duration(duration)
              .call(d3.axisTop(x))

            rank_g.select('.rank_y')
              .transition()
              .duration(duration)
              .call(d3.axisRight(y))

            var quater_height = h - 45 - y("诏安");
            $(".quater").css("height",quater_height)
          }else{
            rank_g.select('.rank_x')
              .transition()
              .duration(duration)
              .call(d3.axisBottom(x))

            rank_g.select('.rank_y')
              .transition()
              .duration(duration)
              .call(d3.axisRight(y))

            var quater_width = x("诏安");
            $(".quater").css("width",quater_width)
          }      
    }

    function update_bartitle(data){

        var bar_title = rank_g.selectAll(".bartitle")
            .data(data);
        bar_title
            .enter()
            .append("text")
            .merge(bar_title)
            .transition()
            .duration(duration)  
            .text(function(d){ return d.station; })
            .attr("class", "bartitle")
            .attr("x", function(d) { return d.station == "贵定北"||d.station == "孝感北" ? x(d.length_km)-33 : x(d.length_km)+2; })
            .attr("y", function(d) { return y(d.station)+y.bandwidth()*.7;})
            .attr("fill", function(d) { return d.station == "贵定北" ||d.station == "孝感北" ? "#f9f4ed" : "#66363a"; })
          bar_title
            .exit()
            .transition()
            .remove();   
    }

    // draw scatter
    //  filter: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    var invalidEntries = 0;
    function isNumber(obj) {
      return obj !== undefined && typeof(obj) === 'number' && !isNaN(obj);
    }
    function filterByRadius(item) {
      if (isNumber(item.radius) && item.radius !== 0) {
        return true;
      } 
      invalidEntries++;
      return false; 
    }
    var data_s = data.filter(filterByRadius);  

    function median(values) {
      values.sort( function(a,b) {return a - b;} );
      var half = Math.floor(values.length/2);
      if(values.length % 2)
          return values[half];
      else
          return (values[half-1] + values[half]) / 2.0;
    }
    var radiuses=[], radius;
    data_s.forEach(function(d,i){
      radius = d.radius;
      radiuses.push(radius);
    })
    var qs=[], q;
    data_s.forEach(function(d,i){
      q = d.q;
      qs.push(q);
    })
    var median_x = median(radiuses),
        median_y = median(qs);
    var median_x_rect = scatter_g.append("rect").attr("class", "median median_rect"),
        median_y_rect = scatter_g.append("rect").attr("class", "median median_rect"),
        median_x_line = scatter_g.append("line").attr("class", "median median_line"),
        median_y_line = scatter_g.append("line").attr("class", "median median_line"),
        median_x_text = scatter_g.append("text").attr("class","median median_text"),
        median_y_text = scatter_g.append("text").attr("class","median median_text");

    color.domain([7,6,5,4,3,2,1]);

    function update_s(data){

      x_s.domain(d3.extent(data, function(d) { return d.radius; })).nice();
      y_s.domain(d3.extent(data, function(d) { return d.q; })).nice();
      d3.select(".scatter_x").transition().duration(duration).call(xAxis_s);
      d3.select(".scatter_y").transition().duration(duration).call(yAxis_s);

      var scatters = scatter_g.selectAll(".dot")
          .data(data);
      scatters
          .enter()
          .append("circle")
          .attr("class", function(d) { return "dot dot" + d.id; })
          .attr("id", function(d) { return d.id; })
          .attr("r", 0)
          .attr("cx", 0)
          .attr("cy", 0)
          .style("fill", "#aa3f3f")
          .merge(scatters)
          .transition()
          .duration(duration)
          .attr("r", function(){ return w<800 ? 2 : 3; })
          .attr("cx", function(d) { return x_s(d.radius); })
          .attr("cy", function(d) { return y_s(d.q); });
      scatters
          .exit()
          .transition()
          .duration(duration)
          .attr("r", 0)
          .attr("cx", 0)
          .attr("cy", 0)
          .remove();

      var scatters_title = scatter_g.selectAll("text.scatters_title")
          .data(data);
      scatters_title
          .enter()
          .append("text")
          .attr("class","scatters_title")
          .attr("x", 0)
          .attr("y", 0)
          .merge(scatters_title)
          .attr("x", function(d) { return w<800 ? x_s(d.radius) - 10 : x_s(d.radius) + 5; })
          .attr("y", function(d) { 
            if(d.station == "北京南"){
                return y_s(d.q) - 20;
              }else{
                return y_s(d.q) - 5;
              }
            })
          .text(function(d){ return d.station;})
      scatters_title
          .exit()
          .remove();

      d3.selectAll("g.axis.axis_s g.tick:not(:first-of-type) line").attr("stroke", "#999999").attr("stroke-dasharray", "2,2");
    }
    update_s(data_s);
    
    // MAP
    var china = topojson.feature(china, china.objects.china).features;
    if(w<800){
      var projection = d3.geoMercator()        
        .scale(map_width * .8)
        .translate([-map_width , map_height * .85]);
    }else{
      var projection = d3.geoMercator()   
        .scale(map_width * .5)
        .translate([-map_width * .65, map_height * .85]);
    }
    var path = d3.geoPath()
        .projection(projection);
    var geoCircle = d3.geoCircle().radius(10).precision(1);
    var circle = d3.geoCircle()
        .radius(10).precision(1);
    map_g.append("g")
        .attr("class", "china")
        .selectAll("path.china")
        .data(china)
        .enter().append("path")
        .attr("d", path);

    var points = [];
    point.forEach(function (d,i) {
        var point = { 
                coords: projection([+d.lon, +d.lat]),
                id: d.id,
                name: d.point,
                type: d.type
            };
        points.push(point);
    });    

    function isCenter(value){
      return value.type == "center";
    }
    var centers = points.filter(isCenter);
    var pointGroup = map_g.append("g").attr("class","map_point");

    function update_m(data,r){
      var maps = pointGroup.selectAll("circle.point")
        .data(data);
      maps
        .enter()
        .append("circle")
        .merge(maps)
        .transition()
        .duration(duration)
        .attr("cx", function (d,i) { return d.coords[0]; })
        .attr("cy", function (d,i) { return d.coords[1]; })
        .attr("class", function(d){
          return "point point" + d.id;
        })
        .attr("id", function(d){ return d.id; })
        .attr("r",r);
      maps
        .exit()
        .remove();
    }
    update_m(centers,1.5);

    var voronoi = d3.voronoi()
        .extent([[-1, -1],[map_width+1, map_height*.8]])
        .x(function(d,i) { return d.coords[0]; })
        .y(function(d,i) { return d.coords[1]; });
    var voronoiGroup = map_g.append("g")
        .attr("class", "voronoi");
    voronoiGroup.selectAll("path")
        .data(voronoi.polygons(centers))
        .enter()
        .append("path")
        .attr("d", function(d) { return d ? "M" + d.join("L") + "Z" : null; })
        .attr("id", function(d) { return d ? d.data.id : null; })

    function mouseover_s(){
      var id = this.id;
      console.log(id)

      d3.selectAll("circle.dot")
          .style("opacity", .3)
          .style("r", w<800 ? 2 : 3)

      d3.select("circle.dot" + id)
          .style("opacity", "1")
          .style("r", "6")
                    
      var current_data;  
      current_data = data.filter(function(d){
          if (d.id == id){
                  return d;
              }
      })
      tooltip_s
          .style("display", null) 
          .html("<span>" + current_data[0].station + "站" + "<br>" +
                     "距离指数：" + current_data[0].q  + "<br>" + 
                     "建成区半径：" + current_data[0].radius + "公里" +  "</span>");
    }
    function mousemove_s() {
      tooltip_s
        .style("top", (d3.event.pageY - 10) + "px" )
        .style("left", (d3.event.pageX + 10) + "px");
      tooltip_s.style("display", "block"); 
    };
    function mouseout_s(){
      d3.selectAll("circle.dot")
          .style("opacity", 1)
          .style("r", w<800 ? 2 : 3)

      tooltip_s.style("display", "none");  
    }

    function over_s(){
      d3.selectAll("circle.dot")
        .style("pointer-events", "all")
        .on("mouseover", mouseover_s)
        .on("mousemove", mousemove_s)
        .on("mouseout",  mouseout_s)
        .on("wheel",  mouseout_s);
    }

    function out(){
      $(".tooltip").css("display","none")
      voronoiGroup.selectAll("path")
        .on("mouseover", function(){ return false; })
        .on("mouseout",  function(){ return false; });
      d3.selectAll("rect.bar")
        .on("mouseover", function(){ return false; })
        .on("mouseout",  function(){ return false; });
      d3.selectAll("circle")
        .on("mouseover", function(){ return false; })
        .on("mouseout",  function(){ return false; });
    }

    function out_s(){
      d3.selectAll("circle.dot")
        .on("mouseover", function(){ return false; })
        .on("mousemove",  function(){ return false; })
        .on("mouseout",  function(){ return true; })
      $(".scatters_title").css("display","block");
    }

    

    // PREPARE DATA FOR THE RANK & MAP STEPS  
    // DATA less than 10
      // data for bar
      function stepTwo(value){
        return value.length_km <= 10;
      }
      dataTwo = data.filter(stepTwo);
      // data for map
        // 符合条件的城市名字array
        var twos = [];
        dataTwo.forEach(function(d,i){
          twos.push(d.center);
        });
        // 符合条件的城市地图点array
        var centers_10 = [];
        centers.forEach(function(d){
          if(twos.includes(d.name)){
            centers_10.push(d);
          }
        })

    // DATA less than 1
      function stepThree(value){
        return value.length_km <= 1
      }
      dataThree = data.filter(stepThree);
      // data for map
      var threes = [];
      dataThree.forEach(function(d,i){
        threes.push(d.center);
      });
      var centers_1 = [];
      centers.forEach(function(d){
        if(threes.includes(d.name)){
          centers_1.push(d);
        }
      });

    // DATA more than 30
      function stepFour(value){
          return value.length_km >= 30;
        }
      dataFour = data.filter(stepFour);
     // data for map
      var Fours = [];
      dataFour.forEach(function(d,i){
        Fours.push(d.center);
      });
      var centers_30 = [];
      centers.forEach(function(d){
        if(Fours.includes(d.name)){
          centers_30.push(d);
        }
      })

    // DATA for XG
      function stepFive(value){
        return value.station == "孝感北";
      }
      dataFive = data.filter(stepFive);
      // data for map
      var Fives = [];
      dataFive.forEach(function(d,i){
        Fives.push(d.center);
      });
      var centers_xg = [];
      centers.forEach(function(d){
        if(Fives.includes(d.name)){
          centers_xg.push(d);
        }
      })

    function default_rank(){
      rank_g.selectAll("rect")
          .style("opacity", 1)
          .style("stroke-width", "2px");

      d3.selectAll("circle.point")
          .style("opacity", 1)
          .style("r", 1.5);
    }

    function changeSection(n){

      for(var i=0; i<=13; i++){
        if(i==n) {section[i]=1;} 
        else {section[i]=0}
      }
    section[13]=1;
    }

    var section = [0,0,0,0,0,0,0,0,0,0,0,0,0,0]

    // current location
    var current000;

    function resize3(){

      var currentID_array = []
        $(window).scroll(function(){
          
          var windowTop = $(window).scrollTop();
          if(windowTop < back3){
            default0();
          }

          if(windowTop >= back3 - h*.5 && windowTop < back3 && section[13]==0){console.log("locate")
            changeSection(13)
            geolocation.getCurrentPosition(function(r){
              var centerIcon = new BMap.Icon("img/center.png", new BMap.Size(50,50));
              var stationIcon = new BMap.Icon("img/station.png", new BMap.Size(50,50));
              console.log(this)
                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                  // test
                  // r.point.lng = 114.2284388,   
                  // r.point.lat = 31.59305876;          
                  // console.log('您的位置：'+r.point.lng+','+r.point.lat);
                  lon = r.point.lng,
                  lat = r.point.lat;
                }
                else {
                  lon = 116.40387397;
                  lat = 39.91488908;
                }

                // 计算到每个车站的距离
                var distances = [];
                var i;
                data.forEach(function(d){
                  d.lon_s = + d.lon_s;
                  d.lat_s = + d.lat_s;
                  distances.push(Math.pow(d.lon_s - lon, 2) + Math.pow(d.lat_s - lat, 2))
                })
                var min = Math.min(...distances);

                for (i = 0; i < data.length; i++) {
                  var thisStation = document.getElementById("thisStation");
                  var thisStation2 = document.getElementById("thisStation2");
                  var thisLength = document.getElementById("thisLength");
                  var thisRank = document.getElementById("thisRank");

                  // 筛选距离最近的一个站 
                  if ((Math.pow(data[i].lon_s - lon, 2) + Math.pow(data[i].lat_s - lat, 2)) === min ){

                    thisStation.innerHTML = data[i].station;
                    thisLength.innerHTML = data[i].length_km;
                    thisStation2.innerHTML = data[i].station;
                    thisRank.innerHTML = data[i].rank;

                    var pointStation = new BMap.Point(data[i].lon_s,data[i].lat_s);  // 创建点station
                    var pointCenter = new BMap.Point(data[i].lon_c,data[i].lat_c);  // 创建点center

                    var lon_s = +data[i].lon_s;
                    var lat_s = +data[i].lat_s;
                    var lon_c = +data[i].lon_c;
                    var lat_c = +data[i].lat_c;
                    var lon_middle = (lon_s + lon_c)/2;
                    var lat_middle = (lat_s + lat_c)/2;
                    var pointMiddle = new BMap.Point(lon_middle, lat_middle); 
                    
                    var default_b;
                    if(w<800){
                      if(data[i].length_km < 1){
                        default_b = 20;
                      }else if(data[i].length_km >= 1 && data[i].length_km < 5){
                        default_b = 14;
                      }else if(data[i].length_km >= 5 && data[i].length_km < 10){
                        default_b = 12;
                      }else if (data[i].length_km >= 10 && data[i].length_km < 30){
                        default_b = 11;
                      }else{
                        default_b = 10;
                      }
                    }else{
                      if(data[i].length_km < 1){
                        default_b = 20;
                      }else if(data[i].length_km >= 1 && data[i].length_km < 5){
                        default_b = 14;
                      }else if(data[i].length_km >= 5 && data[i].length_km < 10){
                        default_b = 13;
                      }else if (data[i].length_km >= 10 && data[i].length_km < 30){
                        default_b = 12;
                      }else{
                        default_b = 10;
                      }
                    }

                    map.centerAndZoom(pointMiddle,default_b);

                    var polyline = new BMap.Polyline([pointStation,pointCenter], {strokeColor:"#aa2222", strokeWeight:3, strokeOpacity:0.8, id:"line"});  //定义折线
                    map.addOverlay(polyline);

                    
                    map.panTo(pointMiddle);

                    var centerMK = new BMap.Marker(pointCenter,{icon:centerIcon});
                    map.addOverlay(centerMK);

                    var stationMK = new BMap.Marker(pointStation,{icon:stationIcon});
                    map.addOverlay(stationMK);

                    var stationLabel = new BMap.Label(data[i].station + "站",{offset:new BMap.Size(-3,55)});
                    stationLabel.setStyle({borderWidth: "0px", fontSize: "18px", backgroundColor: "none"})
                    stationMK.setLabel(stationLabel);

                    var centerLabel = new BMap.Label(data[i].city_name,{offset:new BMap.Size(-3,55)});
                    centerLabel.setStyle({borderWidth: "0px", fontSize: "18px", backgroundColor: "none"})
                    centerMK.setLabel(centerLabel);

                    var currentID = data[i].id,
                        currentStation = data[i].station;
                        current000 == currentID;
                    currentID_array.push(currentID);
                    if($(window).width<800){
                      var userLabel = new BMap.Label("我",{offset:new BMap.Size(0,50)});
                      userLabel.setStyle({borderWidth: "0px", fontSize: "18px", backgroundColor: "none"})
                      userMK.setLabel(userLabel);
                    }
                    // zoom to points
                    var b = new BMap.Bounds(pointStation,pointCenter);

                    map.disableDragging();  
                    map.disableScrollWheelZoom()

                  }
                }

            });/*GEOLOCATION END*/
          }

          if(windowTop >= back3 && windowTop < front2){console.log("定 bMap")
            back3Func();
          }

          if(windowTop >= front2  && windowTop < front8){
            back4Func();
          }

          if(windowTop >= front2  && windowTop < front3 && section[0]==0){
            console.log("show rank")
            back4Func();
            changeSection(0)
            update(data);
            update_m(centers,1.5);
            rank_g.selectAll("rect").style("opacity",function(d){
                    return d.id == currentID_array[0] ? 1 : .1 ;
                  });
            
            out();
            if(w<800){
              d3.select('.rank_y').selectAll("text").attr("opacity", 0)
            }else{
              d3.select('.rank_x').selectAll("text").attr("opacity", 0)
            }
            $("#hand").removeClass("hand");
            $(".quater").css("display","none")
          }

          if(windowTop >= front3  && windowTop < front4  && section[1]==0){console.log("随便滑动")
            // show whole bar chart
            changeSection(1)
            update(data);
            update_m(centers,1.5);
            default_rank();
            over();
            $(".quater").css("display","none");
            d3.selectAll(".bartitle").style("display","none");
            if(w<800){
              d3.select('.rank_y').selectAll("text").attr("opacity", 0)
            }else{console.log("title gone")
              d3.select('.rank_x').selectAll("text").attr("opacity", 0)
            }
            rank_g.selectAll("rect").style("opacity",1);
            $("#hand").addClass("hand");
          }
            
          if(windowTop >= front4 && windowTop < front5 && section[2]==0){console.log("四分之三")
            // 高亮距离≤10km的车站
            changeSection(2)

            update(data);
            update_m(centers_10,1.5);
            out();

            $("#hand").removeClass("hand");
            d3.selectAll(".point").style("r",1.5)
            rank_g.selectAll("rect").style("opacity", function(d){ return d.length_km <= 10 ? 1 : .3; })

            d3.selectAll(".bartitle").style("display","none");
            if(w<800){
              d3.select('.rank_y').selectAll("text").attr("opacity", 0)
              $(".quater.mobile").css("display","block");
            }else{
              d3.select('.rank_x').selectAll("text").transition().duration(duration).attr("opacity", 0);
              $(".quater.pc").css("display","block");
            }
          }
          
          if(windowTop >= front5){
            $(".voronoi").css("display","none")
            $(".quater").css("display","none");
            if(w<800){
              d3.selectAll(".point").style("r",3)
              d3.select('.rank_y').selectAll("text").attr("opacity", 0)
            }else{
              d3.selectAll(".point").style("r",3)
            }
          }else{
            $(".voronoi").css("display","block")
            d3.selectAll(".point").style("r",1.5)
          }

          if(windowTop >= front5  && windowTop < front6 && section[3]==0){console.log("14个")
            // 高亮距离≤1km的车站
            changeSection(3)
            update(dataThree);
            update_m(centers_1,3);
            default_rank();
            over()
            d3.select('.rank_x').selectAll("text").transition().duration(duration * 4).attr("opacity", 1);
            if(w<800){
              d3.selectAll(".bartitle").style("display","block");
              update_bartitle(dataThree);
            }
          }
            

          if(windowTop >= front6  && windowTop < front7 && section[4]==0){console.log("19个")
            // 高亮距离≥30km的车站
            changeSection(4)
            d3.selectAll("rect.bar").style("display","block");
            d3.select('.rank_x').selectAll("text").attr("opacity", 1)
            update(dataFour);
            update_m(centers_30,3);
            default_rank();
            over()
            if(w<800){
              d3.selectAll(".bartitle").style("display","block");
              update_bartitle(dataFour);
            }
          }

          if(windowTop >= front7  && windowTop < front8 && section[5]==0){console.log("xiaogan")
            // 高亮孝感北站
            changeSection(5)            
            update(dataFour);
            update_m(centers_xg,3);
            out()
            rank_g.selectAll("rect")
              .style("display", function(d){
                if(d.station == "孝感北"){
                  return "block";
                }else{
                  return "none";
                }
              })

            if(w<800){
              d3.select('.rank_y').selectAll("text").attr("opacity", 0)
              d3.select('.rank_y')
                .selectAll("text")
                .attr("opacity", function(d){
                  if(d.station == "孝感北"){
                    return 1;
                  }else{
                    return 0;
                  }
                })
            }else{
              d3.select('.rank_x')
                .selectAll("text")
                .attr("opacity", function(d){
                  if(d.station == "孝感北"){
                    return 1;
                  }else{
                    return 0;
                  }
                })
            }
            d3.selectAll(".bartitle").style("display","none");

            mapBack();
          }
          if(windowTop >= front8 && windowTop < front9  && section[6]==0){console.log("mapgone")
            changeSection(6)
            
            mapGone();
            // scatter 活动
            
            $("#scatter").removeClass("fix_scatter");
            $("#scatter_p").removeClass("fix_scatter_p");
            $(".arrow").addClass("hide");
            $(".median").css("display","block");

            over_s();
          }

          if(windowTop >= front9){
            // scatter 定住
            $("#scatter").addClass("fix_scatter");
            $("#scatter_p").addClass("fix_scatter_p");

            scatter_g.selectAll(".dot")
              .style("stroke", "#f9f4ed")
              .style("stroke-width", .5);
            over_s();
            $("#back4").css("display","none")
          }

          if(windowTop >= front9 && windowTop < front10 && section[8]==0){console.log("scatter 定住")
            // scatter 定住
            
            changeSection(8)
            console.log(section[8])
            $("#scatter").addClass("fix_scatter");
            $("#scatter_p").addClass("fix_scatter_p");

            scatter_g.selectAll(".dot")
              .style("stroke", "#f9f4ed")
              .style("fill", "#aa3f3f")
              .style("stroke-width", .5)
              .style("r", function(){
                return w<800 ? 2 : 3; 
              })

            $("#mask").addClass("open");
            $(".arrow").removeClass("hide");
            $(".median").css("display","block");
            $(".legend").css("display","none");
            over_s();
            d3.selectAll(".scatters_title")
              .style("display", "none");
          }

          if(windowTop >= front10  && windowTop < front11 && section[9]==0){console.log("level")
            // 高亮城市等级
            changeSection(9)
            update_s(data_s);
            scatter_g.selectAll(".dot")
              .style("fill", function(d) { return color(d.level); })
              .style("r", function(){
                return w<800 ? 2 : 3; 
              })
            
            $(".arrow").removeClass("hide");
            $(".median").css("display","block");
            $(".legend").css("display","block");
            $(".legend_area").css("display","none");
            over_s();   

            d3.selectAll(".scatters_title")
              .style("display", function(d){
                if(d.station == "北京南" || d.station == "上海虹桥" || d.station == "深圳北" || d.station == "广州南"){
                  return "block";
                }else{
                  return "none";
                }
              })
          }
          
          if(windowTop >= front11  && windowTop < front12 && section[10]==0){console.log("大城市")
            // zoom to Level 1 cities (特大城市)
            changeSection(10)
            function stepTen(value){
              return value.radius >= 12.5;
            }
            dataTen = data_s.filter(stepTen);
            update_s(dataTen);

            scatter_g.selectAll(".dot")
              .style("fill", function(d) { return color(d.level); })
              .style("r", 5);
            
            $(".arrow").addClass("hide");
            $(".legend").css("display","none");
            $(".legend_area").css("display","none");
            $(".legend4").css("display","block");
          }

          if(windowTop >= front12 && windowTop < credit && section[11]==0){console.log("指数高")
            // zoom to 距离指数高的站 
            changeSection(11)
            function stepEleven(value){
              return value.q >= 5;
            }
            dataEleven = data_s.filter(stepEleven);

            setTimeout(update_s(data_s), 10);
            setTimeout(update_s(dataEleven), 100000);

            scatter_g.selectAll(".dot")
              .style("fill", function(d) { return color(d.level); })
              .style("r", 5);
            $(".arrow").addClass("hide");
            $(".legend").css("display","none");
            $(".legend_area").css("display","none");
            $(".legend2").css("display","block");
          }

          if(windowTop >= credit && section[12]==0){
            changeSection(12)

            $(".arrow").addClass("hide");
          }
          if(windowTop > front11){
            out_s();
          }

          // 与scroll有关的functions
          function mouseover(){console.log("over")
            var id = this.id;
            rank_g.selectAll("rect")
                .style("opacity", .5);

            rank_g.select(".bar" + id)
                .style("opacity", 1);

            d3.selectAll("circle.point")
                .style("opacity", .3);

            d3.selectAll("circle.point" + id)
                .style("opacity", "1")
                .style("fill", "#aa3f3f")
                .style("r", function(){
                    if(windowTop > front3 && windowTop <= front6){
                      return 8;
                    }else{
                      return 5;
                    }
                  });
                          
            var current_data;  
            current_data = data.filter(function(d){
                if (d.id == id){
                        return d;
                    }
            })
            tooltip
                .style("display", null) 
                .html("<span>" + current_data[0].station + "站" + "<br>" +
                           current_data[0].length_km + "公里" + "</span>");
          }
          function mouseout(){
            rank_g.selectAll("rect")
                .style("opacity", 1)
                .style("stroke-width", "2px");

            d3.selectAll("circle.point")
                .style("opacity", 1);

            d3.selectAll(".point")
                .style("fill", "#aa3f3f")
                .style("r", function(){
                    if(windowTop > front5 && windowTop <= front7){
                      return 3;
                    }else{
                      return 1.5;
                    }
                });

            tooltip.style("display", "none");  

            d3.selectAll("text.station")
                .style("opacity", 0);

            d3.selectAll("text.center")
                .style("opacity", 0);
          }
          function over(){
            tooltip.style("display","block");
            voronoiGroup.selectAll("path")
              .on("mouseover", mouseover)
              .on("mousemove", mousemove)
              .on("mouseout",  mouseout)
              .on("wheel",  mouseout)
              .on("touchmove", mouseout);

            rank_g.selectAll("rect")
              .on("mouseover", mouseover)
              .on("mousemove", mousemove)
              .on("mouseout",  mouseout)
              .on("wheel",  mouseout)
              .on("touchmove", mouseout);

            d3.selectAll("circle")
              .on("mouseover", mouseover)
              .on("mousemove", mousemove)
              .on("mouseout",  mouseout)
              .on("wheel",  mouseout)
              .on("touchmove", mouseout);
          }

          function mousemove() {
            tooltip
              .style("top", (d3.event.pageY - 10) + "px" )
              .style("left", (d3.event.pageX + 10) + "px");
          };
          
        })   /*SCROLL END*/

     
    }
    resize3()

      
    $(window).resize(function() {
      update(data);
      if(w<800){
        update_bartitle(data);
      }
      update_s(data_s)
      update_m(centers,1.5)
      resize1();
      resize2();
      resize3();
    });
  } /*LOAD DATA END*/



