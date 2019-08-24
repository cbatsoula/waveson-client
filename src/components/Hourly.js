import React from 'react';

function Hourly(props) {
  console.log("hourly", props)
  return (
    <div className="Beach-Details">
      <ul>
        <li>Feels like: {props.weather.FeelsLikeF} F </li>
        <li>{props.weather.weatherDesc[0].value}</li>
        <li>Humidity: {props.weather.humidity} % </li>
        <li>Percipitation: {props.weather.precipInches} "</li>
        <li>Significant wave height: {props.weather.sigHeight_m} meter(s)</li>
        <li>Swell direction: {props.weather.swellDir16Point}</li>
        <li>Swell height: {props.weather.swellHeight_ft} ft</li>
        <li>Swell period: {props.weather.swellPeriod_secs} sec</li>
        <li>Water temp: {props.weather.waterTemp_F} F </li>
        <li>Wind chill: {props.weather.WindChillF} F </li>
        <li>Wind gust: {props.weather.WindGustMiles} mph </li>
        <li>Wind direction: {props.weather.winddir16Point}</li>
        <li>Wind speed: {props.weather.windspeedMiles} miles</li>
        <li>Visibility: {props.weather.visibilityMiles} mile(s)</li>

      </ul>

    </div>
  )
}
export default Hourly
