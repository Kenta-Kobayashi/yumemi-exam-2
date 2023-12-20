import React from "react";
import Highchairs from "highcharts";
import HighchartsReact from "highcharts-react-official";


type Props = {
  populationdata: {
    prefName: string;
    data: { year: number; value: number }[];
  }[];
};


// 選んだ都道府県の人口推移グラフを表示するコンポーネント
const Graph: React.FC<Props> = ({ populationdata }) => {
  let series: Highchairs.SeriesOptionsType[] = [];
  let categories = [];

  for (let p of populationdata) {
    let data = [];

    for (let pd of p.data) {
      data.push(pd.value);
      categories.push(String(pd.year));
    }

    series.push({
      type: "line",
      name: p.prefName,
      data: data,
    });
  }

  const options: Highchairs.Options = {
    title: {
      text: "総人口推移",
    },
    xAxis: {
      title: {
        text: "年度",
      },
      categories: categories,
    },
    yAxis: {
      title: {
        text: "人口数",
      },
    },
    // 都道府県を一つも選んでいない場合との分岐条件
    series:
      series.length === 0
        ? [{ type: "line", name: "都道府県名", data: [] }]
        : series,
  };

  return (
    <div>
      <HighchartsReact highchairs={Highchairs} options={options} />
    </div>
  );
};

export default Graph;
