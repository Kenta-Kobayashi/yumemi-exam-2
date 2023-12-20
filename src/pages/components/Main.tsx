import React, { useEffect, useState } from "react";
import CheckField from "./CheckField";
import Graph from "./Graph";
import axios from "axios";

const Main: React.FC = () => {
  const [prefectures, setPreFectures] = useState<{
    message: null;
    result: {
      prefCode: number;
      prefName: string;
    }[];
  } | null>({ message: null, result: [] });
  const [prefPopulation, setPrefPopulation] = useState<
    { prefName: string; data: { year: number; value: number }[] }[]
  >([]);

  useEffect(() => {
    // 都道府県一覧を取得する
     const fetchData = async () => {
      try {
        const apiData = await fetch(
          "https://opendata.resas-portal.go.jp/api/v1/prefectures",
          {
            headers: {
              "X-API-KEY": process.env.NEXT_PUBLIC_REACT_APP_API_KEY || "", // APIキーがundefinedの場合には空文字列をセット
            },
          }
        );

        const data = await apiData.json();
          console.log(data);
        setPreFectures(data.result);
      } catch (error) {
        alert("error");
      }
    };
    fetchData();
  }, []);

  // チェックボックスをクリックした際の処理
  const handleClickCheck = (
    prefName: string,
    prefCode: number,
    check: boolean
  ) => {
    let c_prefPopulation = prefPopulation.slice();

    // チェックをつけた処理
    if (check) {
      if (
        c_prefPopulation.findIndex((value) => value.prefName === prefName) !==
        -1
      )
        return;
        axios
        .get(
          `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=`,
          {
            headers: { "X-API-KEY": process.env.NEXT_PUBLIC_REACT_APP_API_KEY },
          }
        )
        .then((results) => {
          c_prefPopulation.push({
            prefName: prefName,
            data: results.data.result.data[0].data,
          });

          setPrefPopulation(c_prefPopulation);
        })
        .catch((error) => {
          return;
        });
    }
    // チェックを外した処理
    else {
      const deleteIndex = c_prefPopulation.findIndex(
        (value) => value.prefName === prefName
      );
      if (deleteIndex === -1) return;
      c_prefPopulation.splice(deleteIndex, 1);
      setPrefPopulation(c_prefPopulation);
    }
  };
  console.log(process.env.REACT_APP_API_KEY);

  return (
    <main>
      <h2>都道府県</h2>
      {prefectures && (
        <CheckField
          prefectures={prefectures.result}
          onChange={handleClickCheck}
        />
      )}
      <h2>人口推移グラフ</h2>
      <Graph populationdata={prefPopulation} />
    </main>
  );
};

export default Main;
