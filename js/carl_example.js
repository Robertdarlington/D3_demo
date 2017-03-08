var container = d3.select("body")
		.append("svg")
		.datum(500)
		.attr("width", function(d){
			return d+"px";
		})
		.attr("height", "500px")
		.attr("class", "container");

		//above Example 2.8 line 20
var x = d3.scaleLinear() //create the scale
    .domain([0, 40]) //input min and max
	  .range([500, 0]); //output min and max


d3.json("data/MegaCities.geojson", function(data){

	var textElements = container.selectAll(".textElement")
			.data(data.features)
			.enter()
			.append("text")
			.attr("class", "textElement")
			.attr("x", 0)
			.attr("y", function(d, i){
				return x(d.properties.Pop_2015);
			})
			.text(function(d){
				return d.properties.City;
			});
})
