//execute script when window is loaded
window.onload = function(){

//SVG dimension variables
	  var w = 900, h = 500;

    var container = d3.select("body") //get the <body> element from the DOM
		.append("svg") //put a new svg in the body
		.attr("width", w) //assign the width
    .attr("height", h) //assign the height
    .attr("class", "container") //always assign a class (as the block name) for styling and future selection
		.style("background-color", "rgba(0,0,0,0.2)"); //only put a semicolon at the end of the block!


//innerRect block
	 	var innerRect = container.append("rect") //put a new rect in the svg
		.datum(400)
		.attr("width", function(d){ //rectangle width
        return d * 2; //400 * 2 = 800
    })
    .attr("height", function(d){ //rectangle height
        return d; //400
    })
		.attr("class", "innerRect") //class name
    .attr("x", 60) //position from left on the x (horizontal) axis
    .attr("y", 50) //position from top on the y (vertical) axis
    .style("fill", "#FFFFFF"); //fill color

				//below Example 1.9
    //var dataArray = [10, 20, 30, 40, 50];

		//america's 4 largest cities
		var cityPop = [
				{
						city: 'New York City',
						population: 8175133
				},
				{
						city: 'Los Angeles',
						population: 3792621
				},
				{
						city: 'Chicago',
						population: 2695598
				},
				{
						city: 'Houston',
						population: 2099451
				}
		];


		//above Example 2.8 line 20
    var x = d3.scaleLinear() //create the scale
        .range([200, 700]) //output min and max
        .domain([0, 3]); //input min and max

		//above Example 2.8 line 20
    //find the minimum value of the array
    var minPop = d3.min(cityPop, function(d){
        return d.population;
    });

    //find the maximum value of the array
    var maxPop = d3.max(cityPop, function(d){
        return d.population;
    });

    //scale for circles center y coordinate
    var y = d3.scaleLinear()
				.range([450, 50]) //was 440, 95
				.domain([0, 10000000]); //was minPop, maxPop

		//color scale generator
    var color = d3.scaleLinear()
        .range([
            "#FDBE85",
            "#D94701"
        ])
        .domain([
            minPop,
            maxPop
        ]);


		var circles = container.selectAll(".circles") //but wait--there are no circles yet!
        .data(cityPop) //here we feed in an array
        .enter() //one of the great mysteries of the universe
				.append("circle") //add a circle for each datum
        .attr("class", "circles") //apply a class name to all circles
				.attr("id", function(d){
            return d.city;
        })
        .attr("r", function(d){
            //calculate the radius based on population value as circle area
            var area = d.population * 0.002;
            return Math.sqrt(area/Math.PI);
        })
        .attr("cx", function(d, i){
            //use the index to place each circle horizontally
            //return 90 + (i * 180);
						//use the scale generator with the index to place each circle horizontally
            return x(i);
        })
        .attr("cy", function(d){
            //subtract value from 450 to "grow" circles up from the bottom instead of down from the top of the SVG
            //return 450 - (d.population * 0.0005);
						return y(d.population);
        })
				.style("fill", function(d, i){ //add a fill based on the color scale generator
            return color(d.population);
        })
        .style("stroke", "#000"); //black circle stroke

				//below Example 3.5...create y axis generator
				var yAxis = d3.axisLeft(y);

				//create axis g element and add axis
			  var axis = container.append("g")
			         .attr("class", "axis")
							 .attr("transform", "translate(60, 0)")
							 .call(yAxis);
			  yAxis(axis);

				//below Example 3.9...create a text element and add the title
				var title = container.append("text")
						.attr("class", "title")
						.attr("text-anchor", "middle")
						.attr("x", 450)
						.attr("y", 30)
						.text("America's Largest Cities by Population");

					//Example 3.14 line 1...create circle labels
		    var labels = container.selectAll(".labels")
		        .data(cityPop)
		        .enter()
		        .append("text")
		        .attr("class", "labels")
		        .attr("text-anchor", "left")
		        .attr("y", function(d){
		            //vertical position centered on each circle
		            return y(d.population) - 30;
		        });

		    //first line of label
		    var nameLine = labels.append("tspan")
		        .attr("class", "nameLine")
		        .attr("x", function(d,i){
		            //horizontal position to the right of each circle
		            return x(i) + Math.sqrt(d.population * 0.002 / Math.PI) + 5;
		        })
		        .text(function(d){
		            return d.city;
		        });

				//create format generator
    		var format = d3.format(",");

				//Example 3.16 line 1...second line of label
		    var popLine = labels.append("tspan")
		        .attr("class", "popLine")
		        .attr("x", function(d,i){
		            return x(i) + Math.sqrt(d.population * 0.002 / Math.PI) + 5;
		        })
		        .attr("dy", "20") //vertical offset
		        .text(function(d){
		            return "Pop. " + format(d.population); //use format generator to format numbers
		        });
};
