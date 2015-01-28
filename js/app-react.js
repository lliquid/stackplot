var StackPlot = React.createClass({
	displayName: 'StackPlot',
	componentDidMount: function() {
		if (this.props.attrX.type != 'numerical' || this.props.attrY.type != 'numerical') {
			return
		}
		var canvas = this.getDOMNode();
		var stackPlot = new StackPlot_(d3.select(canvas), this.props)
		stackPlot.render(this.props.data, this.props.meta, this.props.attrX.name, this.props.attrY.name)
	},
	render: function() {
		var cx = React.addons.classSet
		var classes = cx({
			'StackPlot': true,
			'focused': this.props.focused
		})
		return React.createElement("g", {className: classes, transform: geom.transform.begin().translate(this.props.x, this.props.y).end(), onMouseOver: this.props.onMouseOver_, onClick: this.props.onClick_})
	}
})

var ScatterPlot = React.createClass({
	displayName: 'ScatterPlot',
	componentDidMount: function() {
		if (this.props.attrX.type != 'numerical' || this.props.attrY.type != 'numerical') {
			return
		}
		var canvas = this.getDOMNode();
		var scatterPlot = new ScatterPlot_(d3.select(canvas), this.props)
		scatterPlot.render(this.props.data, this.props.meta, this.props.attrX.name, this.props.attrY.name)
	},
	render: function() {
		var cx = React.addons.classSet
		var classes = cx({
			'ScatterPlot': true,
			'focused': this.props.focused
		})
		return React.createElement("g", {className: classes, transform: geom.transform.begin().translate(this.props.x, this.props.y).end(), onClick: this.props.onClick_})
	}
})


var SPLOM = React.createClass({
	displayName: 'SPLOM',
	handleMouseOverCell: function(r, c) {
		this.setState({focus: {r:r, c:c}})
	},
	handleMouseClickCell: function(r, c) {
		if (this.state.detail.r == r && this.state.detail.c == c) {
			this.setState({detail: {r:-1, c:-1}})
		}
		else {
			this.setState({detail: {r:r, c:c}})
		}
	},
	loadData: function() {
		var that = this
		d3.csv(that.props.url_csv, function(err, data){
			d3.json(that.props.url_meta, function(err, meta) {
				that.setState({data: data})
				that.setState({meta: meta})
			})
		})
	},
	getInitialState: function() {
		return {data: [], meta: {ninstances: 0, attrs: []}, focus: {r: -1, c: -1}, detail: {r: -1, c:-1}}
	},
	componentDidMount: function() {
		this.loadData()
  	},
	componentDidUpdate: function() {
		var canvas = this.getDOMNode()		
	},
  	render: function () {
		var that = this,
			x0 = that.props.splomConfiguration.geometry.x,
			y0 = that.props.splomConfiguration.geometry.y,
			w = that.props.stackPlotConfiguration.geometry.w,
			h = that.props.stackPlotConfiguration.geometry.h,
			dx = that.props.splomConfiguration.geometry.dx,
			dy = that.props.splomConfiguration.geometry.dy
		var cx = React.addons.classSet			
		var components = []
		var matrixCells = that.state.meta.attrs.map(function(attrX, i) {
			var x = (w + dx) * i
			return that.state.meta.attrs.map(function(attrY, j) {
				var y = (h + dy) * j
				if (i == that.state.detail.r && j == that.state.detail.c) {
					return React.createElement(ScatterPlot, React.__spread({data: that.state.data},  that.props.scatterPlotConfiguration, {attrX: attrX, attrY: attrY, x: (x + w / 2) - that.props.scatterPlotConfiguration.geometry.w / 2, y: (y + h / 2) - that.props.scatterPlotConfiguration.geometry.h / 2, onClick_: _.partial(that.handleMouseClickCell, i, j)}))
				}
				else {
					return React.createElement(StackPlot, React.__spread({data: that.state.data},  that.props.stackPlotConfiguration, {attrX: attrX, attrY: attrY, x: x, y: y, onMouseOver_: _.partial(that.handleMouseOverCell, i, j), onClick_: _.partial(that.handleMouseClickCell, i, j), focused: i== that.state.focus.r && j == that.state.focus.c}))
				}
			})
		})

		var xLabels = this.state.meta.attrs.map(function(attr, i) {
			var x = (w + dx) * i + w / 2,
				y = - dy
			var cls = cx({
				'xLabel': true,
				'focused': i == that.state.focus.r
			})
			return React.createElement("text", {className: cls, x: x, y: y, textAnchor: "middle"}, attr.name)
		})
		var yLabels = this.state.meta.attrs.map(function(attr, i) {
			var y = (h + dy) * i + h,
				x = - dx
			var cls = cx({
				'yLabel': true,
				'focused': i == that.state.focus.c
			})				
			return React.createElement("text", {className: cls, x: x, y: y, textAnchor: "end"}, attr.name)
 		})

 		components.push(React.createElement("g", {className: "matrixCells"}, matrixCells))
 		components.push(React.createElement("g", {className: "xLabels"}, xLabels))
 		components.push(React.createElement("g", {className: "yLabels"}, yLabels))
		return React.createElement("g", {className: "SPLOM", transform: geom.transform.begin().translate(x0, y0).end()}, components)
	}
})

$(function() {
	React.render(
		React.createElement(SPLOM, React.__spread({url_csv: "data/test/cereals.csv", url_meta: "data/test/cereals.meta.json"},  config)),
		document.getElementById('canvas')
	)
})

