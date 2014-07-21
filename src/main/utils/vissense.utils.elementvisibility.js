/**
 * @license
 * Vissense <http://vissense.com/>
 * Copyright 2014 tbk <theborakompanioni+vissense@gmail.com>
 * Available under MIT license <http://opensource.org/licenses/MIT>
 */
 /*
 *
 * - percentage
 * - isVisible
 * - isFullyVisible
 * - isHidden
 */
;(function(window, Math, VisSenseUtils, undefined) {
  'use strict';

	function percentage(element) {
		if(!VisSenseUtils.isInViewport(element) || !VisSenseUtils.isVisibleByStyling(element) || !VisSenseUtils.isPageVisible()) {
			return 0;
		}
		// r's height and width are greater than 0 because element is in viewport
		var r = VisSenseUtils._getBoundingClientRect(element);

		var vh = 0; // visible height
		var vw = 0; // visible width
		var viewport = VisSenseUtils.viewport(element);

		if(r.top >= 0) {
			vh = Math.min(r.height, viewport.height - r.top);
		} else if(r.bottom > 0) {
			vh = Math.min(viewport.height, r.bottom);
		} /* otherwise {
			this path cannot be taken otherwise element would not be in viewport
		} */

		if(r.left >= 0) {
			vw = Math.min(r.width, viewport.width - r.left);
		} else if(r.right > 0) {
			vw = Math.min(viewport.width, r.right);
		} /* otherwise {
			 this path cannot be taken otherwise element would not be in viewport
		} */

		var area = (vh * vw) / (r.height * r.width);

		return Math.max(area, 0);
	}

	function isFullyVisible(element) {
		return VisSenseUtils.isPageVisible() &&
		VisSenseUtils.isFullyInViewport(element) &&
		VisSenseUtils.isVisibleByStyling(element);
	}

    function isVisible(element) {
        return VisSenseUtils.isPageVisible() &&
        VisSenseUtils.isInViewport(element) &&
        VisSenseUtils.isVisibleByStyling(element);
    }

    function isHidden(element) {
        return !isVisible(element);
    }

    VisSenseUtils.percentage = percentage;
    VisSenseUtils.isFullyVisible = isFullyVisible;
    VisSenseUtils.isVisible = isVisible;
    VisSenseUtils.isHidden = isHidden;

}(window, Math, window.VisSenseUtils));