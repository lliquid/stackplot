var config = {}


config.splomConfiguration = {
	geometry: {
		x: 100,
		y: 40,
		dx: 15,
		dy: 10
	}
}

config.stackPlotConfiguration = {
	geometry: {
		w: 60,
		h: 15,
		x: 0,
		y: 0
	},
	binningStrategy: "equal", //or max kl divergence
	attrs: {
		x: {
			nbins: 20,
			name: "x",
			attr: "x",
			type: "numerical",
			range: {
				begin: 0,
				end: 0
			}
		},
		y: {
			nbins: 9,
			name: "y",
			attr: "y",
			type: "numerical",
			range: {
				begin: 0,
				end: 0
			}
		}
	},
	color: {
		begin: {h: (0), s: 0.3, l: 0.2},
		end: {h: (60), s: 1.0, l: 0.9}
	},
	colorRamp:
		['rgb(215,48,39)',
		'rgb(244,109,67)',
		'rgb(253,174,97)',
		'rgb(254,224,144)',
		'rgb(255,255,191)',
		'rgb(224,243,248)',
		'rgb(171,217,233)',
		'rgb(116,173,209)',
		'rgb(69,117,180)'].map(function(rgbstr) {return tinycolor(rgbstr)}).reverse(),
	colorRamp2:
		['rgb(213,62,79)',
		'rgb(244,109,67)',
		'rgb(253,174,97)',
		'rgb(254,224,139)',
		'rgb(255,255,191)',
		'rgb(230,245,152)',
		'rgb(171,221,164)',
		'rgb(102,194,165)',
		'rgb(50,136,189)'].map(function(rgbstr) {return tinycolor(rgbstr)}).reverse()
}



config.scatterPlotConfiguration = {
	geometry: {
		w: 100,
		h: 100,
		x: 0,
		y: 0
	},
	attrs: {
		x: {
			nbins: 20,
			name: "x",
			attr: "x",
			type: "numerical",
			range: {
				begin: 0,
				end: 0
			}
		},
		y: {
			nbins: 9,
			name: "y",
			attr: "y",
			type: "numerical",
			range: {
				begin: 0,
				end: 0
			}
		}		
	}

}