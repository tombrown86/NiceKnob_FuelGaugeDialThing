"use strict";
function NiceKnob() {
	this.build = function (size, properties) {
		const canvas = document.createElement('canvas');
		const div = document.createElement('div');

		const knob = {
			_canvas: canvas,
			_div: div,
			_size: size,
			angle_start: -0.75 * Math.PI,
			angle_end: 0.75 * Math.PI,
			angle_offset: -0.5 * Math.PI,
			dial_width: 0.4,
			minimum_value: 0,
			maximum_value: 100,
			default_colour: 'gray',
			values: [],
			colours: [],
			needle_value: null,
			get: function () {
				const div = this._div;
				return div;
			},
			paint: function () {
				const canvas = this._canvas;
				div.style.height = this.size + 'px';
				div.style.width = this.size + 'px';
				div.style.position = 'relative';
				canvas.style.height = this._size;
				canvas.style.width = this._size;
				canvas.height = this._size;
				canvas.width = this._size;
				const actual_start = this.angle_start + this.angle_offset;
				const actual_end = this.angle_end + this.angle_offset;
				const dial_width = this.dial_width;
				const center_coord = 0.5 * this._size;
				const radius = 0.4 * this._size;
				const line_width = Math.round(dial_width * radius);
				const font = 0.55 * this._size / this.values.length + 'px Arial';

				// outer ring
				const ctx = canvas.getContext('2d');
				ctx.clearRect(0, 0, this._size, this._size);
				ctx.beginPath();
				ctx.arc(center_coord, center_coord, radius, actual_start, actual_end);
				ctx.lineCap = 'butt';
				ctx.lineWidth = line_width;
				ctx.strokeStyle = this.default_colour;
				ctx.stroke();

				// to loop through values in descending order with reference
				// to the original index positions (for related colour lookup)
				const indexed_values = this.values.map((value, index) => ({value, index}));
				const sorted_values = indexed_values.slice().sort((a, b) => b.value - a.value);

				// inner rings and text
				sorted_values.forEach(({value, index}) => {
					const colour = this.colours[index];
					const rel_value = (value - this.minimum_value) / (this.maximum_value - this.minimum_value);
					const rel_angle = rel_value * (this.angle_end - this.angle_start);
					const angle_val = actual_start + rel_angle;

					ctx.beginPath();

					let font_colour;
					if (typeof colour === 'object') {
						const bar_colour = colour.bar_colour;
						const glow_colour = colour.glow_colour;
//	TODO: handle gradient / glow effect
//						const gradient = ctx.createLinearGradient(20, 0, 220, 0);
//						gradient.addColorStop(0, bar_colour);
//						gradient.addColorStop(1, glow_colour);
//						ctx.fillStyle = gradient;
//						font_colour = bar_colour;
						ctx.strokeStyle = bar_colour;
						font_colour = bar_colour;
					} else {
						ctx.strokeStyle = colour;
						font_colour = colour;
					}
					ctx.arc(center_coord, center_coord, radius, actual_start, angle_val);

					ctx.lineCap = 'butt';
					ctx.lineWidth = line_width;
					ctx.stroke();

					ctx.font = font;
					ctx.fillStyle = font_colour;
					ctx.textAlign = 'center';
					ctx.textBaseline = 'middle';
					ctx.fillText(value, center_coord, center_coord - center_coord / this.values.length * (index - 1));
				});
				
				// needle
				if(this.needle_value !== null) {
					const rel_value = (this.needle_value - this.minimum_value) / (this.maximum_value - this.minimum_value);
					const rel_angle = rel_value * (this.angle_end - this.angle_start);
					const angle_val = actual_start + rel_angle;
					ctx.beginPath();
					ctx.arc(center_coord, center_coord, radius, actual_start + rel_angle - 0.05, actual_start + rel_angle + 0.05);
					ctx.strokeStyle = 'black';
					ctx.lineCap = 'butt';
					ctx.lineWidth = line_width * 1.6;
					ctx.stroke();
				}

				div.appendChild(canvas);
			},
			safeValue: function(value) {
				return value == null
					? null
					: Math.round(Math.max(this.minimum_value, Math.min(this.maximum_value, value)));
			},
			setValues: function (values, colours, needle_val) {
				const safe_vals = [];
				for (const value of values) {
					safe_vals.push(this.safeValue(value));
				}
				this.values = safe_vals;
				this.colours = colours;
				this.needle_value = this.safeValue(needle_val);

				this.paint();
			},
			setSize: function (size) {
				this._size = size;
				this.paint();
			}
		};
		const resizeListener = function (e) {
			knob.paint();
		};
		if (properties) {
			for (const [key, value] of Object.entries(properties)) {
				knob[key] = value;
			}
		}
		return knob;
	};
}
