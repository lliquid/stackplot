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

	var padding = this.geometry.padding
	var w = this.geometry.w - padding * 2,
		h = this.geometry.h - padding * 2

	var scaleX = w / (maxX - minX),
		scaleY = h / (maxY - minY)

	var n = data.length

	this.canvas.append('rect')
		.attr('x', 0)
		.attr('y', 0)
		.attr('width', w + padding * 2)
		.attr('height', h + padding * 2)
		.attr('fill', this.backgroundProps.color)
		.attr('fill-opacity', this.backgroundProps.opacity)
		.attr('stroke', this.pointProps.color)

	this.canvas.selectAll('.point')
		.data(_.range(n))
		.enter()
		.append('circle')
		.attr('class','point')
		.attr('cx', function(i) {
			return (data[i][attrX] - minX) * scaleX + padding
		})
		.attr('cy', function(i) {
			return  h - ((data[i][attrY] - minY) * scaleY) + padding
		})
		.attr('r', this.pointProps.size)
		.attr('fill', this.pointProps.color)
		.attr('fill-opacity', this.pointProps.opacity)

};