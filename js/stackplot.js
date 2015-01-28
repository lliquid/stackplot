var StackPlot_ = function(canvas, config) {
	this.canvas = canvas
	_.extend(this, config)	
}


StackPlot_.prototype.render = function(data, meta, attrX, attrY) {

	var itrX = function(d) {return d[attrX]},
		itrY = function(d) {return d[attrY]}

	var minX = _.min(data, itrX)[attrX],
		maxX = _.max(data, itrX)[attrX],
		minY = _.min(data, itrY)[attrY],
		maxY = _.max(data, itrY)[attrY]

	var n = this.attrs.x.nbins,
		m = this.attrs.y.nbins

	var pdf = matrix.zero(m, n),
		marginalX = matrix.zero(1, n)

	var r = 0,
		c = 0

	if (this.binningStrategy == 'equal') {
		var xbinsize = (maxX - minX) / n,
			ybinsize = (maxY - minY) / m
		for (var d in data) {
			r = Math.floor((data[d][attrY] - minY) / ybinsize)
			c = Math.floor((data[d][attrX] - minX) / xbinsize)
			r = r == m ? m-1 : r
			c = c == n ? n-1 : c
			pdf[r][c] += 1
		}
	}

	for (var r in pdf) {
		for (var c in pdf[r]) {
			marginalX[0][c] += pdf[r][c]
		}
	}

	var dx = this.geometry.w / n,
		h = this.geometry.h,
		colorRamp = this.colorRamp2


	this.canvas.selectAll('.col')
		.data(_.range(n))
		.enter()
		.append('g')
		.attr('class', 'col')
		.attr('transform', function(c) {return geom.transform.begin().translate(c * dx, 0).end()})
		.each(function(c) {
			var ys = [],
				y = h 
			for (var r in _.range(m)) {
				y -=  marginalX[0][c] == 0 ? 0 : pdf[r][c] / marginalX[0][c] * h
				ys.push(y);
			}
			d3.select(this)
				.selectAll('.row')
				.data(_.range(m))
				.enter()
				.append('rect')
				.attr('class','row')
				.attr('y', function(r) {
					return ys[r]
				})
				.attr('height', function(r) {
					return marginalX[0][c] == 0 ? 0 : pdf[r][c] / marginalX[0][c] * h
				})
				.attr('width', dx)
				.attr('fill', function(r) {
            		var cidx = Math.floor(r / m * colorRamp.length)
					return "#" + colorRamp[cidx].toHex()
				})
		})



};