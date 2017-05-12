/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'logo\'">' + entity + '</span>' + html;
	}
	var icons = {
		'logo-bull-color-o': '&#xe906;',
		'logo-bull-blue-o': '&#xe909;',
		'logo-bull-grass-o': '&#xe90a;',
		'logo-bull-grass': '&#xe907;',
		'logo-bull-blue': '&#xe908;',
		'logo-super-minimal': '&#xe905;',
		'logo-simple-bull-o': '&#xe904;',
		'logo-charging-s': '&#xe902;',
		'logo-bull-no-shadow': '&#xe903;',
		'logo-bull-o': '&#xe901;',
		'logo-bull': '&#xe900;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/logo-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
