import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import classNames from "classnames";

am4core.useTheme(am4themes_animated);

export default function PieChart(props) {
  const chart = React.useRef(null);

  const { data, options, activeIndex, onChange, terdaftarDiSikap } = props;

  const classDataYear =
    "flex flex-1 flex-col font-montserrat font-medium text-xs";

  const trueTerdaftarDiSikap = terdaftarDiSikap?.map((data) => data)?.[
    activeIndex
  ];

  React.useLayoutEffect(() => {
    let x = am4core.create("terdaftar-sikap", am4charts.PieChart3D);

    chart.current = x;
    x.hiddenState.properties.opacity = 0;
    x.data = trueTerdaftarDiSikap?.data?.map((_item) => ({
      category: _item.name,
      value: _item.value,
      // color: am4core.color('#DE1B51'),
    }));

    x.legend = new am4charts.Legend();
    x.innerRadius = 100;
    x.tooltip.label.wrap = true;

    let series = x.series.push(new am4charts.PieSeries3D());
    series.slices.template.propertyFields.fill = "color";
    series.dataFields.value = "value";
    series.dataFields.category = "category";
    series.alignLabels = false;
    series.colors.list = [am4core.color("#88c46d"), am4core.color("#6696d0")];

    series.ticks.template.events.on("ready", hideSmall);
    series.ticks.template.events.on("visibilitychanged", hideSmall);
    series.labels.template.events.on("ready", hideSmall);
    series.labels.template.events.on("visibilitychanged", hideSmall);

    function hideSmall(ev) {
      if (ev.target.dataItem && ev.target.dataItem.values.value.percent === 0) {
        ev.target.hide();
      } else {
        ev.target.show();
      }
    }
    return () => {
      x.dispose();
    };
  }, [trueTerdaftarDiSikap]);

  return (
    <div className="w-full">
      <div
        className="w-full rounded border-border-on-pink mt-2"
        style={{
          boxShadow:
            "0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className="mx-auto flex flex-col items-center">
          <div className="font-montserrat font-medium text-black-2 text-sm pt-4 pb-3">
            Status Terdaftar di SIKaP
          </div>
          <div
            id="terdaftar-sikap"
            style={{ width: "100%", height: 400 }}
          ></div>
        </div>

        <div className="flex flex-row justify-between mt-4">
          {terdaftarDiSikap?.map((option, index) => (
            <div
              key={index}
              className={classNames(classDataYear, "px-4 py-2", {
                "text-pink-header": activeIndex === index,
                "text-black-2": activeIndex !== index,
              })}
              onClick={() => onChange(index)}
              component="button"
              sx={{
                bgcolor: activeIndex === index ? "grey.300" : "grey.400",
              }}
            >
              <p className="text-lg font-semibold">{option?.year}</p>
              <p className="text-sm">{option?.count}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between w-full items-center pt-5 px-4 mb-6 pb-2"></div>
      </div>
    </div>
  );
}
