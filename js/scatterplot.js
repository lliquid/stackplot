var ScatterPlot_ = function(canvas, config) {
	this.canvas = canvas
	_.extend(this, config)	
}


ScatterPlot_.prototype.render = function(data, meta, attrX, attrY) {

	var itrX = function(d) {return d[attrX]},
		itrY = function(d) {return d[attrY]}

	var minX = _.min(data, itrX)[attrX],
		maxX = _.max(data, itrX)[attrX],
		minY = _.min(data, itrY)[attrY],
		maxY = _.max(data, itrY)[attrY]

	var w = this.geometry.w,
		h = this.geometry.h

	var scaleX = w / (maxX - minX),
		scaleY = h / (maxY - minY)

	this.canvas.selectAll('.point')
		.enter()
		.append('circle')
		.attr('class','point')
		.attr('fill', function(r) {
			
		})


};