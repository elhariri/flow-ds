import { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { CompanyOption } from "../../App.types";

function DropDown({
  options = [],
  onSelect,
}: {
  options: CompanyOption[];
  onSelect: (value: string) => void;
}) {
  const [showOptions, setOptionsVisibility] = useState(false);

  const [selectedOption, setSelectedOption] = useState<CompanyOption>(
    options[0]
  );

  const handleSelect = (option: CompanyOption) => {
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
        {selectedOption ? selectedOption.name : "No campany found"}
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
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropDown;
