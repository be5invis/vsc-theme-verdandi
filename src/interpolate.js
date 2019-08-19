"use strict";

// Raw monotonic interpolation function
// xs must be ordered
module.exports = function(xs, ys) {
	let i, length = xs.length;
	// Get consecutive differences and slopes
	let dys = [], dxs = [], ms = [];
	for (i = 0; i < length - 1; i++) {
		let dx = xs[i + 1] - xs[i], dy = ys[i + 1] - ys[i];
		dxs.push(dx);
		dys.push(dy);
		ms.push(dy / dx);
	}

	// Get degree-1 coefficients
	let c1s = [ms[0]];
	for (i = 0; i < dxs.length - 1; i++) {
		let m = ms[i], mNext = ms[i + 1];
		if (m * mNext <= 0) {
			c1s.push(0);
		} else {
			let dx = dxs[i], dxNext = dxs[i + 1], common = dx + dxNext;
			c1s.push(3 * common / ((common + dxNext) / m + (common + dx) / mNext));
		}
	}
	c1s.push(ms[ms.length - 1]);

	// Get degree-2 and degree-3 coefficients
	let c2s = [], c3s = [];
	for (i = 0; i < c1s.length - 1; i++) {
		let c1 = c1s[i], m = ms[i], invDx = 1 / dxs[i], common = c1 + c1s[i + 1] - m - m;
		c2s.push((m - c1 - common) * invDx);
		c3s.push(common * invDx * invDx);
	}

	// Return interpolant function
	return function(x) {
		// The rightmost point in the dataset should give an exact result
		let i = xs.length - 1;
		if (x == xs[i]) {
			return ys[i];
		}

		// Search for the interval x is in, returning the corresponding y if x is one of the original xs
		let low = 0, mid, high = c3s.length - 1;
		while (low <= high) {
			mid = Math.floor(0.5 * (low + high));
			let xHere = xs[mid];
			if (xHere < x) {
				low = mid + 1;
			} else if (xHere > x) {
				high = mid - 1;
			} else {
				return ys[mid];
			}
		}
		i = Math.max(0, high);

		// Interpolate
		let diff = x - xs[i], diffSq = diff * diff;
		return ys[i] + c1s[i] * diff + c2s[i] * diffSq + c3s[i] * diff * diffSq;
	};
};
