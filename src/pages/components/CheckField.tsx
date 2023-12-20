import React from "react";
import styles from "./styles/CheckField.module.css";

type Props = {
  prefectures?: {
    prefCode: number;
    prefName: string;
  }[];

  onChange: (name: string, prefName: number, check: boolean) => void;
};

// 都道府県一覧のチェックボックスを表示するコンポーネント
const CheckField: React.FC<Props> = ({ prefectures = [], onChange }) => {
  console.log(prefectures);
  return (
    <>
      <div>
        {prefectures.map((prefecture) => (
          <div key={prefecture.prefName}>
            <input
              type="checkbox"
              name="Prefecture name"
              onChange={(event) =>
                onChange(
                  prefecture.prefName,
                  prefecture.prefCode,
                  event.target.checked
                )
              }
              id={"checkbox" + prefecture.prefCode}
            />
            <label htmlFor={"checkbox" + prefecture.prefCode}>
              {prefecture.prefName.length === 3
                ? "　" + prefecture.prefName
                : prefecture.prefName}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default CheckField;
