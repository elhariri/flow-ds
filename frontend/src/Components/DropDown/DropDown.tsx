import { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";

const options = [
  {
    label: "Exo1",
    value: "",
  },
  {
    label: "Exo2: Google",
    value: "exo2/google",
  },
  {
    label: "Exo2: Amazon",

    value: "exo2/amazon",
  },
  {
    label: "Exo2: both",
    value: "exo2/both",
  },
];

type Option = (typeof options)[number];
type OptionsValues = (typeof options)[number]["value"];

function DropDown({ onSelect }: { onSelect: (value: OptionsValues) => void }) {
  const [showOptions, setOptionsVisibility] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);

  const handleSelect = (option: Option) => {
    setOptionsVisibility(false);
    setSelectedOption(option);
    onSelect(option.value);
  };

  useEffect(() => {
    const hideOptions = (e: MouseEvent) => {
      if (!(e.target as HTMLButtonElement).classList.contains(`option`)) {
        setOptionsVisibility(false);
      }
    };
    window.addEventListener("click", hideOptions);
    return () => {
      window.removeEventListener("click", hideOptions);
    };
  });

  return (
    <div className="relative my-auto text-base">
      <button
        type="button"
        className="option w-40 flex font-semibold p-2 border border-white rounded"
        onClick={() => setOptionsVisibility(!showOptions)}
      >
        {selectedOption.label}
        <TiArrowSortedDown className="my-auto ml-auto" />
      </button>
      {showOptions && (
        <div className="absolute top-[110%] z-50 bg-white border border-slate-300 flex flex-col w-full rounded-md shadow-md align-baseline align-start justify-start content-start">
          {options.map((option) => (
            <button
              type="button"
              key={option.value}
              className="text-zinc-900 hover:bg-slate-100 py-1 mb-1 last:mb-0 font-semibold title px-2"
              onClick={() => {
                handleSelect(option);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropDown;
