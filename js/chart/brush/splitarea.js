jui.define("chart.brush.splitarea", [ "util.base" ], function(_) {

    var SplitAreaBrush = function() {

        this.drawArea = function(path) {
            var g = this.chart.svg.group(),
                maxY = this.chart.area('height'),
                split = this.brush.split,
                splitColor = this.chart.theme("areaSplitBackgroundColor");

            for(var k = 0; k < path.length; k++) {
                var opts = {
                    fill: this.color(k),
                    "fill-opacity": this.chart.theme("areaBackgroundOpacity"),
                    "stroke-width": 0
                };

                var line = this.createLine(path[k], k),
                    xList = path[k].x;

                // 날짜일 경우, 해당 인덱스를 구해야 함
                if(_.typeCheck("date", split)) {
                    for(var i = 0; i < xList.length - 1; i++) {
                        if(this.axis.x.invert(xList[i]).getTime() >= split.getTime()) {
                            split = i;
                            break;
                        }
                    }
                }

                line.each(function(i, p) {
                    if(i == 0) {
                        split = (split != null) ? split : xList.length - 1;

                        p.LineTo(xList[split], maxY);
                        p.LineTo(xList[0], maxY);
                        p.attr(opts);
                    } else {
                        opts["fill"] = splitColor;

                        p.LineTo(xList[xList.length - 1], maxY);
                        p.LineTo(xList[split], maxY);
                        p.attr(opts);
                    }

                    p.ClosePath();
                });

                this.addEvent(line, null, k);
                g.prepend(line);
            }

            return g;
        }

        this.draw = function() {
            return this.drawArea(this.getXY());
        }
    }

    return SplitAreaBrush;
}, "chart.brush.splitline");
