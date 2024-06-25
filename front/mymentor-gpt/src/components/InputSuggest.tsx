import React, { useState } from 'react';
import Notification from '../components/Notification';
import { HiOutlineLightBulb } from "react-icons/hi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";


const APIURL = import.meta.env.VITE_API_URL;

interface TooltipProps {
  classes?: string,
  text: string;
  children: React.ReactNode
}

const Tooltip: React.FC<TooltipProps> = ({ classes='', children, text }) => {
  return (
    <div className={`relative inline-block group ${classes}`}>
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
        <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 shadow-lg">
          {text}
          <svg
            className="absolute text-gray-900 h-2 left-1/2 transform -translate-x-1/2 top-full"
            viewBox="0 0 255 255"
            xmlSpace="preserve"
          >
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const InputSuggest: React.FC<{ sector: string, about: string, icon: React.ReactNode }> = ({ sector, about, icon }) => {

  const [data, setData] = useState<string[]>([]);
  const [isEmptySector, setIsEmptySector] = useState(false);
  const [text, setText] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [error, setError] = useState('');

  const handleSuggest = (about: string) => async () => {
    if (!sector) {
      setIsEmptySector(true);
      return
    }
    try {
      const response = await fetch(`${APIURL}/suggest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sector, about }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorBody = await response.json();
        console.log('errorBody ', errorBody.message);
        setError(errorBody.message || 'Something went wrong');
        setShowNotification(true)
      } else {
        const data = await response.json();
        console.log('Success:', data);
        setData(data['suggestions']);
      }
    } catch (error) {
      console.error('And the Error is:', error);
      setError(JSON.stringify(error) || 'Something went wrong');
      setShowNotification(true)
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleDeleteClick = (i: number) => () => {
   setData(data.filter((_, index) => index !== i));
  };

  const handleSelectClick = (i:number) => () => {
    setText(data[i]);
    handleDeleteClick(i)();
  };

  return (
    <div className="mb-5 ml-6">
      {showNotification && (
        <Notification message={error}/>
      )}
      {isEmptySector && (
        <Notification message={'Please first select the company`s sector'}/>
      )}
      <div
        key={about}
        className=""
      >
        <div className="flex flex-start items-center gap-2 text-xl">
          <p>{about}</p>
          { icon }
        </div>
        <textarea
          className="w-full h-48 p-4 text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
          onChange={handleChange}
          placeholder="Start brainstorming..."
          value={text} //
        />
        { data && (
          <div>
            {data.map((suggestion: string, index: number) => (
              <div className="flex gap-1 items-center mb-1 w-1/2 bg-purple-800 text-white font-semibold border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-xl transform transition-transform duration-300">
                <p className="mr-auto" key={index}>{suggestion}</p>

                <Tooltip
                  classes="mr-1"
                  text="Select"
                >
                  <button
                    onClick={handleSelectClick(index)}
                  >
                    <FaCheck
                      className="hover:text-sky-600"
                      size={25}
                    />
                  </button>
                </Tooltip>

                <Tooltip text="Delete">
                  <button
                    onClick={handleDeleteClick(index)}
                  >
                    <RiDeleteBin5Line
                      className="hover:text-sky-600"
                      size={25}
                    />
                  </button>
                </Tooltip>

              </div>
            ))}
          </div>
        )}
        <button
          onClick={handleSuggest(about)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex gap-1"
        >
          <HiOutlineLightBulb size={23}/>
          Suggest
        </button>
      </div>
    </div>
  )

};

export default InputSuggest;
