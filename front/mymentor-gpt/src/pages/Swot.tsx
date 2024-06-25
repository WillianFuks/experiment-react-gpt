import { useState } from 'react';
import InputSuggest from '../components/InputSuggest';
import { GiOpenTreasureChest } from "react-icons/gi";
import { MdOutlineCenterFocusWeak } from "react-icons/md";
import { GiBiceps } from "react-icons/gi";
import { GrThreats } from "react-icons/gr";


function SwotPage() {

  const [sector, setSector] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSector(event.target.value);
  };

  const data = [
    ['SWOT: Strength', <GiBiceps/>],
    ['SWOT: Weakness', <MdOutlineCenterFocusWeak/>],
    ['SWOT: Opportunities', <GiOpenTreasureChest/>],
    ['SWOT: Threats', <GrThreats/>]
  ]

  return (
    <div>

      <div className="flex flex-col p-4 gap-1">
        <label
          className="text-2xl text-semibold mb-4"
          htmlFor="sector-input"
        >Sector the company belongs to:</label>
        <input
          className="ml-6 w-1/4 mb-10 border rounded shadow-lg bg-white h-12 text-xl pl-2 focus:outline-none focus:ring-2 focus:border-blue-500 text-gray-900"
          id="sector-input"
          type="text"
          value={sector}
          onChange={handleChange}
          placeholder="Type in sector ..."
        />
        <p className="text-2xl text-semibold mb-4">BrainStorm</p>

        {data.map((e) => (
            <InputSuggest
              sector={sector}
              about={e[0] as string}
              key={e[0] as string}
              icon={e[1]}
            />
        ))}

      </div>


    </div>
  );
}

export default SwotPage
