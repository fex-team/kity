var KCGenderChart = kity.createClass("GenderChart", (function() {
	return {
		constructor: function(data, target) {
			this.centerX = 250;
			this.centerY = 150;
			this.r = 80;
			this.R = 120;
			this._paper = new kity.Paper(target);
			this.renderData(data);
		},
		renderData: function(d) {
			var genderDis = d.data;
			var me = this;
			console.log(me.centerX, me.centerY);
			var renderPie = function(pMale, pFemale) {
				var _paper = me._paper;
				var _colors = d.colors;
				var mPie = new kityPie(me.r, me.R, 0, pMale * 360, me.centerX, me.centerY);
				var fPie = new kityPie(me.r, me.R, pMale * 360, 360, me.centerX, me.centerY);
				console.log(pFemale * 360);
				mPie.fill(_colors[0]).stroke("white");
				fPie.fill(_colors[1]).stroke("white");

				_paper.addShapes([mPie, fPie]);
			};
			renderPie(genderDis.male, genderDis.female);
		}
	};
})());