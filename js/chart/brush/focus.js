jui.define("chart.brush.focus", [], function() {
    var FocusBrush = function(chart, brush) {
        var g;

        this.draw = function() {
            var borderColor = chart.theme("focusBorderColor"),
                borderSize = chart.theme("focusBorderWidth"),
                bgColor = chart.theme("focusBackgroundColor"),
                bgOpacity = chart.theme("focusBackgroundOpacity");

            g = chart.svg.group({}, function() {
                var startX = brush.x(brush.start),
                    endX = brush.x(brush.end);

                chart.svg.line({
                    stroke: borderColor,
                    "stroke-width": borderSize,
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: chart.height()
                }).translate(startX, 0);

                chart.svg.rect({
                    width: Math.abs(endX - startX),
                    height: chart.height(),
                    fill: bgColor,
                    opacity: bgOpacity
                }).translate(startX, 0)

                chart.svg.line({
                    stroke: borderColor,
                    "stroke-width": borderSize,
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: chart.height()
                }).translate(endX, 0);
            }).translate(chart.x(), chart.y());

            return g;
        }

        this.drawSetup = function() {
            return this.getOptions({
                start: 0,
                end: 0
            });
        }
    }

    return FocusBrush;
}, "chart.brush.core");