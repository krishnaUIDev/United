import PropTypes from 'prop-types';

// Images
import fog from './assets/fog.svg';
import mixedRainandSleet from './assets/mixedRainSleet.svg';
import isolatedThunderstorms from './assets/isolatedThunderStorm.svg';
import thunderstorms from './assets/Tstorm.svg';
import sunny from './assets/sunny.svg';
import windy from './assets/windy.svg';
import freezingRainNight from './assets/freezingRainAtNight.svg';
import freezingRain from './assets/freezingRain.svg';
import scatteredShowers from './assets/scatteredShower.svg';
import mixedRainandSnow from './assets/rainAndSnow.svg';
import mixedRainandHail from './assets/rainAndHail.svg';
import mostlyCloudyNight from './assets/mostlyCloudyAtNight.svg';
import mostlyCloudyDay from './assets/mostlyCloudy.svg';
import partlyCloudyDay from './assets/partlyCloudy.svg';
import snow from './assets/snow.svg';
import scatteredSnowShowers from './assets/scatteredSnow.svg';
import scatteredShowersNight from './assets/scatteredSnowAtNight.svg';
import lightSnowShowers from './assets/snowShowers.svg';
import partlyCloudyNight from './assets/cloudyAtNight.svg';
import showers from './assets/showerRain.svg';
import cloudy from './assets/cloudy.svg';
import severeHurricane from './assets/hurricane.svg';
// import rain from './assets/rain.svg';
import severeThunderstorms from './assets/severeThunderstorms.svg';
import drizzle from './assets/drizzle.svg';
import clear from './assets/clear.svg';
import scatteredSnowShowersNight from './assets/scatteredSnowShowersAtNight.svg';


// Weather Icon for Flight Checkin Left side panel - Inverted Colours
import img2 from './assets/iconsBlack/2.svg';
import img3 from './assets/iconsBlack/3.svg';
import img4 from './assets/iconsBlack/4.svg';
import img5 from './assets/iconsBlack/5.svg';
import img6 from './assets/iconsBlack/6.svg';
import img7 from './assets/iconsBlack/7.svg';
import img8 from './assets/iconsBlack/8.svg';
import img9 from './assets/iconsBlack/9.svg';
import img10 from './assets/iconsBlack/10.svg';
import img11 from './assets/iconsBlack/11.svg';
import img12 from './assets/iconsBlack/12.svg';
import img13 from './assets/iconsBlack/13.svg';
import img14 from './assets/iconsBlack/14.svg';
import img15 from './assets/iconsBlack/15.svg';
import img16 from './assets/iconsBlack/16.svg';
import img17 from './assets/iconsBlack/17.svg';
import img18 from './assets/iconsBlack/18.svg';
import img20 from './assets/iconsBlack/20.svg';
import img21 from './assets/iconsBlack/21.svg';
import img22 from './assets/iconsBlack/22.svg';
import img23 from './assets/iconsBlack/23.svg';
import img24 from './assets/iconsBlack/24.svg';
import img26 from './assets/iconsBlack/26.svg';
import img27 from './assets/iconsBlack/27.svg';
import img28 from './assets/iconsBlack/28.svg';
import img29 from './assets/iconsBlack/29.svg';
import img30 from './assets/iconsBlack/30.svg';
import img31 from './assets/iconsBlack/31.svg';
import img32 from './assets/iconsBlack/32.svg';
import img33 from './assets/iconsBlack/33.svg';
import img35 from './assets/iconsBlack/35.svg';
import img36 from './assets/iconsBlack/36.svg';
import img37 from './assets/iconsBlack/37.svg';
import img38 from './assets/iconsBlack/38.svg';
import img39 from './assets/iconsBlack/39.svg';
import img40 from './assets/iconsBlack/40.svg';
import img41 from './assets/iconsBlack/41.svg';
import img42 from './assets/iconsBlack/42.svg';
import img43 from './assets/iconsBlack/43.svg';
import img45 from './assets/iconsBlack/45.svg';
import img46 from './assets/iconsBlack/46.svg';
import img47 from './assets/iconsBlack/47.svg';

import messages from './messages';

// variables with 'null' do not have an icon to go with it
// TODO: add all to messages
export function WeatherIcons(props, isInverted = false) {
  let weatherIcon;
  let weatherDsc;
  switch (props) {
    case 0: // tornado
      weatherIcon = isInverted ? img2 : severeHurricane;
      weatherDsc = messages.tornado.defaultMessage;
      break;
    case 1: // severe tornado
      weatherIcon = isInverted ? img2 : severeHurricane;
      weatherDsc = messages.severeTornado.defaultMessage;
      break;
    case 2:
      weatherIcon = isInverted ? img2 : severeHurricane;
      weatherDsc = messages.severeHurricane.defaultMessage;
      break;
    case 3:
      weatherIcon = isInverted ? img3 : severeThunderstorms;
      weatherDsc = messages.severeThunderstorms.defaultMessage;
      break;
    case 4:
      weatherIcon = isInverted ? img4 : thunderstorms;
      weatherDsc = messages.thunderstorms.defaultMessage;
      break;
    case 5:
      weatherIcon = isInverted ? img5 : mixedRainandSnow;
      weatherDsc = messages.mixedRainandSnow.defaultMessage;
      break;
    case 6:
      weatherIcon = isInverted ? img6 : mixedRainandSleet;
      weatherDsc = messages.mixedRainandSleet.defaultMessage;
      break;
    case 7:
      weatherIcon = isInverted ? img7 : mixedRainandSleet;
      weatherDsc = messages.mixedSnowAndSleet.defaultMessage;
      break;
    case 8:
      weatherIcon = isInverted ? img8 : mixedRainandSleet;
      weatherDsc = messages.freezingDrizzle.defaultMessage;
      break;
    case 9:
      weatherIcon = isInverted ? img9 : drizzle;
      weatherDsc = messages.drizzle.defaultMessage;
      break;
    case 10:
      weatherIcon = isInverted ? img10 : freezingRain;
      weatherDsc = messages.freezingRain.defaultMessage;
      break;
    case 11:
      weatherIcon = isInverted ? img11 : showers;
      weatherDsc = messages.showers.defaultMessage;
      break;
    case 12: // BreezyOrLightRain
      weatherIcon = isInverted ? img12 : drizzle;
      weatherDsc = messages.breezyOrLightRain.defaultMessage;
      break;
    case 13: // Flurries
      weatherIcon = isInverted ? img13 : snow;
      weatherDsc = messages.flurries.defaultMessage;
      break;
    case 14:
      weatherIcon = isInverted ? img14 : lightSnowShowers;
      weatherDsc = messages.lightSnowShowers.defaultMessage;
      break;
    case 15: // BlowingSnow
      weatherIcon = isInverted ? img15 : snow;
      weatherDsc = messages.blowingSnow.defaultMessage;
      break;
    case 16:
      weatherIcon = isInverted ? img16 : snow;
      weatherDsc = messages.snow.defaultMessage;
      break;
    case 17: // Hail
      weatherIcon = isInverted ? img17 : freezingRain;
      weatherDsc = messages.hail.defaultMessage;
      break;
    case 18: // Sleet
      weatherIcon = isInverted ? img18 : freezingRain;
      weatherDsc = messages.sleet.defaultMessage;
      break;
    case 19: // dust
      weatherIcon = isInverted ? img20 : fog;
      weatherDsc = messages.dust.defaultMessage;
      break;
    case 20:
      weatherIcon = isInverted ? img20 : fog;
      weatherDsc = messages.fog.defaultMessage;
      break;
    case 21: // hazy
      weatherIcon = isInverted ? img21 : fog;
      weatherDsc = messages.hazy.defaultMessage;
      break;
    case 22: // smoky
      weatherIcon = isInverted ? img22 : fog;
      weatherDsc = messages.smokey.defaultMessage;
      break;
    case 23: // blustery
      weatherIcon = isInverted ? img23 : windy;
      weatherDsc = messages.breezy.defaultMessage;
      break;
    case 24:
      weatherIcon = isInverted ? img24 : windy;
      weatherDsc = messages.windy.defaultMessage;
      break;
    case 25: // cold
      weatherIcon = isInverted ? img24 : windy;
      weatherDsc = messages.cold.defaultMessage;
      break;
    case 26:
      weatherIcon = isInverted ? img26 : cloudy;
      weatherDsc = messages.cloudy.defaultMessage;
      break;
    case 27:
      weatherIcon = isInverted ? img27 : mostlyCloudyNight;
      weatherDsc = messages.mostlyCloudyNight.defaultMessage;
      break;
    case 28:
      weatherIcon = isInverted ? img28 : mostlyCloudyDay;
      weatherDsc = messages.mostlyCloudy.defaultMessage;
      break;
    case 29:
      weatherIcon = isInverted ? img29 : partlyCloudyNight;
      weatherDsc = messages.partlyCloudyNight.defaultMessage;
      break;
    case 30:
      weatherIcon = isInverted ? img30 : partlyCloudyDay;
      weatherDsc = messages.partlyCloudy.defaultMessage;
      break;
    case 31:
      weatherIcon = isInverted ? img31 : clear;
      weatherDsc = messages.clear.defaultMessage;
      break;
    case 32:
      weatherIcon = isInverted ? img32 : sunny;
      weatherDsc = messages.sunny.defaultMessage;
      break;
    case 33: // FairDay
      weatherIcon = isInverted ? img33 : sunny;
      weatherDsc = messages.mostlySunny.defaultMessage;
      break;
    case 34: // FairNight
      weatherIcon = isInverted ? img29 : partlyCloudyNight;
      weatherDsc = messages.fairNight.defaultMessage;
      break;
    case 35:
      weatherIcon = isInverted ? img35 : mixedRainandHail;
      weatherDsc = messages.mixedRainandHail.defaultMessage;
      break;
    case 36: // hot
      weatherIcon = isInverted ? img36 : sunny;
      weatherDsc = messages.hotAndSunny.defaultMessage;
      break;
    case 37:
      weatherIcon = isInverted ? img37 : isolatedThunderstorms;
      weatherDsc = messages.isolatedThunderstorms.defaultMessage;
      break;
    case 38: // ScatteredThunderstorms
      weatherIcon = isInverted ? img38 : isolatedThunderstorms;
      weatherDsc = messages.scatteredThunderstorms.defaultMessage;
      break;
    case 39: // ScatteredThunderstormsSunny
      weatherIcon = isInverted ? img39 : isolatedThunderstorms;
      weatherDsc = messages.scatteredThunderstorms.defaultMessage;
      break;
    case 40:
      weatherIcon = isInverted ? img40 : scatteredShowers;
      weatherDsc = messages.scatteredShowers.defaultMessage;
      break;
    case 41: // HeavyRain
      weatherIcon = isInverted ? img41 : showers;
      weatherDsc = messages.heavyRain.defaultMessage;
      break;
    case 42:
      weatherIcon = isInverted ? img42 : scatteredSnowShowers;
      weatherDsc = messages.scatteredSnowShowers.defaultMessage;
      break;
    case 43: // HeavySnow
      weatherIcon = isInverted ? img43 : snow;
      weatherDsc = messages.heavySnow.defaultMessage;
      break;
    case 44: // Unknown...
      weatherIcon = null;
      weatherDsc = messages.unknown.defaultMessage;
      break;
    case 45:
      weatherIcon = isInverted ? img45 : scatteredShowersNight;
      weatherDsc = messages.scatteredShowersAtNight.defaultMessage;
      break;
    case 46:
      weatherIcon = isInverted ? img46 : scatteredSnowShowersNight;
      weatherDsc = messages.scatteredSnowShowersNight.defaultMessage;
      break;
    case 47:
      weatherIcon = isInverted ? img47 : freezingRainNight;
      weatherDsc = messages.freezingRainNight.defaultMessage;
      break;
    case 999: // Unknown...
      weatherIcon = null;
      weatherDsc = messages.unknown.defaultMessage;
      break;
    default:
      break;
  }
  return { weatherIcon, weatherDsc };
}

WeatherIcons.propTypes = {
  weatherType: PropTypes.number,
};

export default WeatherIcons;
