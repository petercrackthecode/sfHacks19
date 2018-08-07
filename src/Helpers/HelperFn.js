export const SmoothScroll = {
	timer: null,

	stop: function () {
		clearTimeout(this.timer);
	},

	scrollTo: function (id, callback) {
		var settings = {
			duration: 500,
			easing: {
				outQuint: function (x, t, b, c, d) {
					return c*((t=t/d-1)*t*t*t*t + 1) + b;
				}
			}
		};
		var percentage;
		var startTime;
		var node = document.getElementById(id);
		var nodeTop = node.offsetTop;
		var nodeHeight = node.offsetHeight;
		var body = document.body;
		var html = document.documentElement;
		var height = Math.max(
			body.scrollHeight,
			body.offsetHeight,
			html.clientHeight,
			html.scrollHeight,
			html.offsetHeight
		);
		var windowHeight = window.innerHeight
		var offset = window.pageYOffset;
		var delta = nodeTop - offset;
		var bottomScrollableY = height - windowHeight;
		var targetY = (bottomScrollableY < delta) ?
			bottomScrollableY - (height - nodeTop - nodeHeight + offset):
			delta;

		startTime = Date.now();
		percentage = 0;

		if (this.timer) {
			clearInterval(this.timer);
		}

		function step () {
			var yScroll;
			var elapsed = Date.now() - startTime;

			if (elapsed > settings.duration) {
				clearTimeout(this.timer);
			}

			percentage = elapsed / settings.duration;

			if (percentage > 1) {
				clearTimeout(this.timer);

				if (callback) {
					callback();
				}
			} else {
				yScroll = settings.easing.outQuint(0, elapsed, offset, targetY-150, settings.duration);
				window.scrollTo(0, yScroll);
				this.timer = setTimeout(step, 30);
			}
		}

		this.timer = setTimeout(step, 30);
	}
};

export const FormatNumber = (number) => {
    return number.toLocaleString("fr-CA", {minimumFractionDigits: 0});
};

export const CompareMaps = (map1, map2) => {
    var testVal;
    if (!(map1 && map2)) {
        return false;
    }
    if (map1.size !== map2.size) {
        return false;
    }
    for (let key of Array.from(Object.keys(map1))) {
        let val = map1[key];
        testVal = map2[key];
        if (testVal !== val || (testVal === null && map2[key]==null)) {
            return false;
        }
    }
    return true;
};

export const ValidateEmail = (text) => {
	// let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
	let reg = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
	if(reg.test(text) === false)
	{
		return false;
	}
	else {
		return true;
	}
}

export const GetCurrentTime = (returnType) => {
	var curDate = Date.now();

	if (returnType === "string"){
		curDate = new Date(curDate);
		curDate = curDate.toLocaleString();
	}
	if (returnType === "ms") {}

	return curDate;
}

export const ToTitleCase = (str) => {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
};
