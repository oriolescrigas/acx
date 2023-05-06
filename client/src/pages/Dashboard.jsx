import React, { useState } from 'react';
import axios from 'axios';

import { Header, Button, SwitchButton, SwitchButtonDisabled } from '../components';
import { earningData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const Dashboard = () => {
  const { currentColor } = useStateContext();
  const [switchState, setSwitchState] = useState(false);
  const [chatbotActive, setChatbotActive] = useState(false);

  const handleSwitchChange = (isChecked) => {
    setSwitchState(isChecked);
    setChatbotActive(isChecked);
  };

  const handleConfigurarClick = () => {
    const url = chatbotActive ? 'http://localhost:4444/activate_wa/PerExemple' : 'http://localhost:4444/deactivate_wa/PerExemple';

    const method = 'PUT';
    axios({ method, url })
      .then((response) => {
        // handle success
        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.error(error);
      });
  };

  return (
    <div className="mt-24">
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-gray-300 rounded-3xl">
        <Header title="Configuración de tu chatbot" />
        <div className="flex flex-wrap lg:flex-nowrap justify-center items-start">
          <div className="flex m-3 flex-wrap justify-center gap-3 items-start">
            {earningData.map((item) => (
              <div key={item.title} className="bg-white h-40 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl flex flex-row items-center">
                <button
                  type="button"
                  style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                  className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
                >
                  {item.icon}
                </button>
                <div className="ml-4">
                  <p className="text-lg font-bold">{item.title}</p>
                  <p className="mt-3">
                    <span className="text-lg font-semibold text-gray-500">{item.amount}</span>
                    <span className={`text-sm text-${item.pcColor} ml-2`}>
                      {item.percentage}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-2/5 justify-end">

            <div className="flex">
              <p className="font-semibold text-xl">Activa/Desactiva tu Chatbot</p>
            </div>

            <div className="mt-10 flex gap-10">
              <div>
                <p className="text-lg ">Whastapp</p>
              </div>
              <div className="flex flex-wrap lg:flex-nowrap justify-center">
                <SwitchButton checked={switchState} onChange={handleSwitchChange} />
              </div>

            </div>

            <div className="mt-10 flex gap-10">
              <div>
                <p className="text-lg ">Instagram</p>
              </div>
              <div className="flex flex-wrap lg:flex-nowrap justify-center">
                <SwitchButtonDisabled checked={switchState} onChange={handleSwitchChange} />
              </div>
            </div>

            <div className="mt-6">
              <Button
                color="white"
                bgColor={currentColor}
                text="Configurar"
                borderRadius="10px"
                onClick={handleConfigurarClick}
              />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
