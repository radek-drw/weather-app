import React, { useState } from 'react';
import { useWeather } from '../../WeatherContext';
import { RiFahrenheitFill, RiCelsiusFill } from 'react-icons/ri';
import Toggle from './Toggle';

const TempUnitToggle: React.FC = () => {
  const { toggleTempUnit } = useWeather();

  const [isToggled, setIsToggled] = useState<boolean>(false);

  const handleClick = () => {
    setIsToggled(!isToggled);
    toggleTempUnit();
  };

  return (
    <Toggle
      isToggled={isToggled}
      onClick={handleClick}
      Icon1={RiFahrenheitFill}
      Icon2={RiCelsiusFill}
      ariaLabel="Toggle temperature unit"
    />
  );
};

export default TempUnitToggle;
