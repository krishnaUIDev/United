

import fog from '../assets/fog.svg';
import mixedRainandSleet from '../assets/mixedRainSleet.svg';
import isolatedThunderstorms from '../assets/isolatedThunderStorm.svg';
import thunderstorms from '../assets/Tstorm.svg';
import sunny from '../assets/sunny.svg';
import windy from '../assets/windy.svg';
import freezingRainNight from '../assets/freezingRainAtNight.svg';
import freezingRain from '../assets/freezingRain.svg';
import scatteredShowers from '../assets/scatteredShower.svg';
import mixedRainandSnow from '../assets/rainAndSnow.svg';
import mixedRainandHail from '../assets/rainAndHail.svg';
import mostlyCloudyNight from '../assets/mostlyCloudyAtNight.svg';
import mostlyCloudyDay from '../assets/mostlyCloudy.svg';
import partlyCloudyDay from '../assets/partlyCloudy.svg';
import snow from '../assets/snow.svg';
import scatteredSnowShowers from '../assets/scatteredSnow.svg';
import scatteredShowersNight from '../assets/scatteredSnowAtNight.svg';
import lightSnowShowers from '../assets/snowShowers.svg';
import partlyCloudyNight from '../assets/cloudyAtNight.svg';
import showers from '../assets/showerRain.svg';
import cloudy from '../assets/cloudy.svg';
import severeHurricane from '../assets/hurricane.svg';
// import rain from '../assets/rain.svg';
import severeThunderstorms from '../assets/severeThunderstorms.svg';
import drizzle from '../assets/drizzle.svg';
import clear from '../assets/clear.svg';
import scatteredSnowShowersNight from '../assets/scatteredSnowShowersAtNight.svg';

// Weather Icon for Flight Checkin Left side panel - Inverted Colours
import img2 from '../assets/iconsBlack/2.svg';
import img3 from '../assets/iconsBlack/3.svg';
import img4 from '../assets/iconsBlack/4.svg';
import img5 from '../assets/iconsBlack/5.svg';
import img6 from '../assets/iconsBlack/6.svg';
import img7 from '../assets/iconsBlack/7.svg';
import img8 from '../assets/iconsBlack/8.svg';
import img9 from '../assets/iconsBlack/9.svg';
import img10 from '../assets/iconsBlack/10.svg';
import img11 from '../assets/iconsBlack/11.svg';
import img12 from '../assets/iconsBlack/12.svg';
import img13 from '../assets/iconsBlack/13.svg';
import img14 from '../assets/iconsBlack/14.svg';
import img15 from '../assets/iconsBlack/15.svg';
import img16 from '../assets/iconsBlack/16.svg';
import img17 from '../assets/iconsBlack/17.svg';
import img18 from '../assets/iconsBlack/18.svg';
import img20 from '../assets/iconsBlack/20.svg';
import img21 from '../assets/iconsBlack/21.svg';
import img22 from '../assets/iconsBlack/22.svg';
import img23 from '../assets/iconsBlack/23.svg';
import img24 from '../assets/iconsBlack/24.svg';
import img26 from '../assets/iconsBlack/26.svg';
import img27 from '../assets/iconsBlack/27.svg';
import img28 from '../assets/iconsBlack/28.svg';
import img29 from '../assets/iconsBlack/29.svg';
import img30 from '../assets/iconsBlack/30.svg';
import img31 from '../assets/iconsBlack/31.svg';
import img32 from '../assets/iconsBlack/32.svg';
import img33 from '../assets/iconsBlack/33.svg';
import img35 from '../assets/iconsBlack/35.svg';
import img36 from '../assets/iconsBlack/36.svg';
import img37 from '../assets/iconsBlack/37.svg';
import img38 from '../assets/iconsBlack/38.svg';
import img39 from '../assets/iconsBlack/39.svg';
import img40 from '../assets/iconsBlack/40.svg';
import img41 from '../assets/iconsBlack/41.svg';
import img42 from '../assets/iconsBlack/42.svg';
// import img43 from '../assets/iconsBlack/43.svg';
import img45 from '../assets/iconsBlack/45.svg';
import img46 from '../assets/iconsBlack/46.svg';
import img47 from '../assets/iconsBlack/47.svg';

import messages from '../messages';

import { WeatherIcons } from '../index';

describe('<WeatherIcons />', () => {
  it('should return null for variables without icons and correct description(s)', () => {
    expect(WeatherIcons(44).weatherIcon).toEqual(null);
    expect(WeatherIcons(999).weatherIcon).toEqual(null);

    expect(WeatherIcons(44).weatherDsc).toEqual(messages.unknown.defaultMessage);
    expect(WeatherIcons(999).weatherDsc).toEqual(messages.unknown.defaultMessage);
  });
  it('should return severeHurricane icon and correct description(s)', () => {
    expect(WeatherIcons(2).weatherIcon).toEqual(severeHurricane);
    expect(WeatherIcons(2, true).weatherIcon).toEqual(img2);
    expect(WeatherIcons(0).weatherIcon).toEqual(severeHurricane);
    expect(WeatherIcons(1).weatherIcon).toEqual(severeHurricane);
    expect(WeatherIcons(0, true).weatherIcon).toEqual(img2);
    expect(WeatherIcons(1, true).weatherIcon).toEqual(img2);

    expect(WeatherIcons(2).weatherDsc).toEqual(messages.severeHurricane.defaultMessage);
    expect(WeatherIcons(2, true).weatherDsc).toEqual(messages.severeHurricane.defaultMessage);
    expect(WeatherIcons(0).weatherDsc).toEqual(messages.tornado.defaultMessage);
    expect(WeatherIcons(1).weatherDsc).toEqual(messages.severeTornado.defaultMessage);
    expect(WeatherIcons(0, true).weatherDsc).toEqual(messages.tornado.defaultMessage);
    expect(WeatherIcons(1, true).weatherDsc).toEqual(messages.severeTornado.defaultMessage);
  });
  it('should return severeThunderstorms icon and correct description(s)', () => {
    expect(WeatherIcons(3).weatherIcon).toEqual(severeThunderstorms);
    expect(WeatherIcons(3, true).weatherIcon).toEqual(img3);

    expect(WeatherIcons(3).weatherDsc).toEqual(messages.severeThunderstorms.defaultMessage);
    expect(WeatherIcons(3, true).weatherDsc).toEqual(messages.severeThunderstorms.defaultMessage);
  });
  it('should return thunderstorms icon and correct description(s)', () => {
    expect(WeatherIcons(4).weatherIcon).toEqual(thunderstorms);
    expect(WeatherIcons(4, true).weatherIcon).toEqual(img4);

    expect(WeatherIcons(4).weatherDsc).toEqual(messages.thunderstorms.defaultMessage);
    expect(WeatherIcons(4, true).weatherDsc).toEqual(messages.thunderstorms.defaultMessage);
  });
  it('should return mixedRainandSnow icon and correct description(s)', () => {
    expect(WeatherIcons(5).weatherIcon).toEqual(mixedRainandSnow);
    expect(WeatherIcons(5, true).weatherIcon).toEqual(img5);

    expect(WeatherIcons(5).weatherDsc).toEqual(messages.mixedRainandSnow.defaultMessage);
    expect(WeatherIcons(5, true).weatherDsc).toEqual(messages.mixedRainandSnow.defaultMessage);
  });
  it('should return mixedRainandSleet icon and correct description(s)', () => {
    expect(WeatherIcons(6).weatherIcon).toEqual(mixedRainandSleet);
    expect(WeatherIcons(7).weatherIcon).toEqual(mixedRainandSleet);
    expect(WeatherIcons(8).weatherIcon).toEqual(mixedRainandSleet);
    expect(WeatherIcons(6, true).weatherIcon).toEqual(img6);
    expect(WeatherIcons(7, true).weatherIcon).toEqual(img7);
    expect(WeatherIcons(8, true).weatherIcon).toEqual(img8);

    expect(WeatherIcons(6).weatherDsc).toEqual(messages.mixedRainandSleet.defaultMessage);
    expect(WeatherIcons(6, true).weatherDsc).toEqual(messages.mixedRainandSleet.defaultMessage);
    expect(WeatherIcons(7).weatherDsc).toEqual(messages.mixedSnowAndSleet.defaultMessage);
    expect(WeatherIcons(7, true).weatherDsc).toEqual(messages.mixedSnowAndSleet.defaultMessage);
    expect(WeatherIcons(8).weatherDsc).toEqual(messages.freezingDrizzle.defaultMessage);
    expect(WeatherIcons(8, true).weatherDsc).toEqual(messages.freezingDrizzle.defaultMessage);
  });
  it('should return drizzle icon and correct description(s)', () => {
    expect(WeatherIcons(9).weatherIcon).toEqual(drizzle);
    expect(WeatherIcons(12).weatherIcon).toEqual(drizzle);
    expect(WeatherIcons(9, true).weatherIcon).toEqual(img9);
    expect(WeatherIcons(12, true).weatherIcon).toEqual(img12);

    expect(WeatherIcons(9).weatherDsc).toEqual(messages.drizzle.defaultMessage);
    expect(WeatherIcons(9, true).weatherDsc).toEqual(messages.drizzle.defaultMessage);
    expect(WeatherIcons(12).weatherDsc).toEqual(messages.breezyOrLightRain.defaultMessage);
    expect(WeatherIcons(12, true).weatherDsc).toEqual(messages.breezyOrLightRain.defaultMessage);
  });
  it('should return freezingRain icon and correct description(s)', () => {
    expect(WeatherIcons(10).weatherIcon).toEqual(freezingRain);
    expect(WeatherIcons(17).weatherIcon).toEqual(freezingRain);
    expect(WeatherIcons(18).weatherIcon).toEqual(freezingRain);
    expect(WeatherIcons(10, true).weatherIcon).toEqual(img10);
    expect(WeatherIcons(17, true).weatherIcon).toEqual(img17);
    expect(WeatherIcons(18, true).weatherIcon).toEqual(img18);

    expect(WeatherIcons(10).weatherDsc).toEqual(messages.freezingRain.defaultMessage);
    expect(WeatherIcons(10, true).weatherDsc).toEqual(messages.freezingRain.defaultMessage);
    expect(WeatherIcons(17).weatherDsc).toEqual(messages.hail.defaultMessage);
    expect(WeatherIcons(17, true).weatherDsc).toEqual(messages.hail.defaultMessage);
    expect(WeatherIcons(18).weatherDsc).toEqual(messages.sleet.defaultMessage);
    expect(WeatherIcons(18, true).weatherDsc).toEqual(messages.sleet.defaultMessage);
  });
  it('should return showers icon and correct description(s)', () => {
    expect(WeatherIcons(11).weatherIcon).toEqual(showers);
    expect(WeatherIcons(41).weatherIcon).toEqual(showers);
    expect(WeatherIcons(11, true).weatherIcon).toEqual(img11);
    expect(WeatherIcons(41, true).weatherIcon).toEqual(img41);

    expect(WeatherIcons(11).weatherDsc).toEqual(messages.showers.defaultMessage);
    expect(WeatherIcons(11, true).weatherDsc).toEqual(messages.showers.defaultMessage);
    expect(WeatherIcons(41).weatherDsc).toEqual(messages.heavyRain.defaultMessage);
    expect(WeatherIcons(41, true).weatherDsc).toEqual(messages.heavyRain.defaultMessage);
  });
  it('should return snow icon and correct description(s)', () => {
    expect(WeatherIcons(13).weatherIcon).toEqual(snow);
    expect(WeatherIcons(15).weatherIcon).toEqual(snow);
    expect(WeatherIcons(16).weatherIcon).toEqual(snow);
    expect(WeatherIcons(13, true).weatherIcon).toEqual(img13);
    expect(WeatherIcons(15, true).weatherIcon).toEqual(img15);
    expect(WeatherIcons(16, true).weatherIcon).toEqual(img16);

    expect(WeatherIcons(13).weatherDsc).toEqual(messages.flurries.defaultMessage);
    expect(WeatherIcons(13, true).weatherDsc).toEqual(messages.flurries.defaultMessage);
    expect(WeatherIcons(15).weatherDsc).toEqual(messages.blowingSnow.defaultMessage);
    expect(WeatherIcons(15, true).weatherDsc).toEqual(messages.blowingSnow.defaultMessage);
    expect(WeatherIcons(16).weatherDsc).toEqual(messages.snow.defaultMessage);
    expect(WeatherIcons(16, true).weatherDsc).toEqual(messages.snow.defaultMessage);
  });
  it('should return lightSnowShowers icon and correct description(s)', () => {
    expect(WeatherIcons(14).weatherIcon).toEqual(lightSnowShowers);
    expect(WeatherIcons(14, true).weatherIcon).toEqual(img14);

    expect(WeatherIcons(14).weatherDsc).toEqual(messages.lightSnowShowers.defaultMessage);
    expect(WeatherIcons(14, true).weatherDsc).toEqual(messages.lightSnowShowers.defaultMessage);
  });
  it('should return fog icon and correct description(s)', () => {
    expect(WeatherIcons(19).weatherIcon).toEqual(fog);
    expect(WeatherIcons(20).weatherIcon).toEqual(fog);
    expect(WeatherIcons(21).weatherIcon).toEqual(fog);
    expect(WeatherIcons(22).weatherIcon).toEqual(fog);
    expect(WeatherIcons(20, true).weatherIcon).toEqual(img20);
    expect(WeatherIcons(21, true).weatherIcon).toEqual(img21);
    expect(WeatherIcons(22, true).weatherIcon).toEqual(img22);

    expect(WeatherIcons(19).weatherDsc).toEqual(messages.dust.defaultMessage);
    expect(WeatherIcons(19, true).weatherDsc).toEqual(messages.dust.defaultMessage);
    expect(WeatherIcons(20).weatherDsc).toEqual(messages.fog.defaultMessage);
    expect(WeatherIcons(20, true).weatherDsc).toEqual(messages.fog.defaultMessage);
    expect(WeatherIcons(21).weatherDsc).toEqual(messages.hazy.defaultMessage);
    expect(WeatherIcons(21, true).weatherDsc).toEqual(messages.hazy.defaultMessage);
  });
  it('should return windy icon and correct description(s)', () => {
    expect(WeatherIcons(23).weatherIcon).toEqual(windy);
    expect(WeatherIcons(24).weatherIcon).toEqual(windy);
    expect(WeatherIcons(23, true).weatherIcon).toEqual(img23);
    expect(WeatherIcons(24, true).weatherIcon).toEqual(img24);
    expect(WeatherIcons(25).weatherIcon).toEqual(windy);
    expect(WeatherIcons(25, true).weatherIcon).toEqual(img23);

    expect(WeatherIcons(23).weatherDsc).toEqual(messages.breezy.defaultMessage);
    expect(WeatherIcons(23, true).weatherDsc).toEqual(messages.breezy.defaultMessage);
    expect(WeatherIcons(24).weatherDsc).toEqual(messages.windy.defaultMessage);
    expect(WeatherIcons(24, true).weatherDsc).toEqual(messages.windy.defaultMessage);
    expect(WeatherIcons(25).weatherDsc).toEqual(messages.cold.defaultMessage);
    expect(WeatherIcons(25, true).weatherDsc).toEqual(messages.cold.defaultMessage);
  });
  it('should return cloudy icon and correct description(s)', () => {
    expect(WeatherIcons(26).weatherIcon).toEqual(cloudy);
    expect(WeatherIcons(26, true).weatherIcon).toEqual(img26);

    expect(WeatherIcons(26).weatherDsc).toEqual(messages.cloudy.defaultMessage);
    expect(WeatherIcons(26, true).weatherDsc).toEqual(messages.cloudy.defaultMessage);
  });
  it('should return mostlyCloudyNight icon and correct description(s)', () => {
    expect(WeatherIcons(27).weatherIcon).toEqual(mostlyCloudyNight);
    expect(WeatherIcons(27, true).weatherIcon).toEqual(img27);

    expect(WeatherIcons(27).weatherDsc).toEqual(messages.mostlyCloudyNight.defaultMessage);
    expect(WeatherIcons(27, true).weatherDsc).toEqual(messages.mostlyCloudyNight.defaultMessage);
  });
  it('should return mostlyCloudyDay icon and correct description(s)', () => {
    expect(WeatherIcons(28).weatherIcon).toEqual(mostlyCloudyDay);
    expect(WeatherIcons(28, true).weatherIcon).toEqual(img28);

    expect(WeatherIcons(28).weatherDsc).toEqual(messages.mostlyCloudy.defaultMessage);
    expect(WeatherIcons(28, true).weatherDsc).toEqual(messages.mostlyCloudy.defaultMessage);
  });
  it('should return partlyCloudyNight icon and correct description(s)', () => {
    expect(WeatherIcons(29).weatherIcon).toEqual(partlyCloudyNight);
    expect(WeatherIcons(29, true).weatherIcon).toEqual(img29);
    expect(WeatherIcons(34).weatherIcon).toEqual(partlyCloudyNight);
    expect(WeatherIcons(34, true).weatherIcon).toEqual(img29);

    expect(WeatherIcons(29).weatherDsc).toEqual(messages.partlyCloudyNight.defaultMessage);
    expect(WeatherIcons(29, true).weatherDsc).toEqual(messages.partlyCloudyNight.defaultMessage);
    expect(WeatherIcons(34).weatherDsc).toEqual(messages.fairNight.defaultMessage);
    expect(WeatherIcons(34, true).weatherDsc).toEqual(messages.fairNight.defaultMessage);
  });
  it('should return partlyCloudyDay icon and correct description(s)', () => {
    expect(WeatherIcons(30).weatherIcon).toEqual(partlyCloudyDay);
    expect(WeatherIcons(30, true).weatherIcon).toEqual(img30);

    expect(WeatherIcons(30).weatherDsc).toEqual(messages.partlyCloudy.defaultMessage);
    expect(WeatherIcons(30, true).weatherDsc).toEqual(messages.partlyCloudy.defaultMessage);
  });
  it('should return clear icon and correct description(s)', () => {
    expect(WeatherIcons(31).weatherIcon).toEqual(clear);
    expect(WeatherIcons(31, true).weatherIcon).toEqual(img31);

    expect(WeatherIcons(31).weatherDsc).toEqual(messages.clear.defaultMessage);
    expect(WeatherIcons(31, true).weatherDsc).toEqual(messages.clear.defaultMessage);
  });
  it('should return sunny icon and correct description(s)', () => {
    expect(WeatherIcons(32).weatherIcon).toEqual(sunny);
    expect(WeatherIcons(33).weatherIcon).toEqual(sunny);
    expect(WeatherIcons(36).weatherIcon).toEqual(sunny);
    expect(WeatherIcons(32, true).weatherIcon).toEqual(img32);
    expect(WeatherIcons(33, true).weatherIcon).toEqual(img33);
    expect(WeatherIcons(36, true).weatherIcon).toEqual(img36);

    expect(WeatherIcons(32).weatherDsc).toEqual(messages.sunny.defaultMessage);
    expect(WeatherIcons(32, true).weatherDsc).toEqual(messages.sunny.defaultMessage);
    expect(WeatherIcons(33).weatherDsc).toEqual(messages.mostlySunny.defaultMessage);
    expect(WeatherIcons(33, true).weatherDsc).toEqual(messages.mostlySunny.defaultMessage);
    expect(WeatherIcons(36).weatherDsc).toEqual(messages.hotAndSunny.defaultMessage);
    expect(WeatherIcons(36, true).weatherDsc).toEqual(messages.hotAndSunny.defaultMessage);
  });
  it('should return mixedRainandHail icon and correct description(s)', () => {
    expect(WeatherIcons(35).weatherIcon).toEqual(mixedRainandHail);
    expect(WeatherIcons(35, true).weatherIcon).toEqual(img35);

    expect(WeatherIcons(35).weatherDsc).toEqual(messages.mixedRainandHail.defaultMessage);
    expect(WeatherIcons(35, true).weatherDsc).toEqual(messages.mixedRainandHail.defaultMessage);
  });
  it('should return isolatedThunderstorms icon and correct description(s)', () => {
    expect(WeatherIcons(37).weatherIcon).toEqual(isolatedThunderstorms);
    expect(WeatherIcons(38).weatherIcon).toEqual(isolatedThunderstorms);
    expect(WeatherIcons(39).weatherIcon).toEqual(isolatedThunderstorms);
    expect(WeatherIcons(37, true).weatherIcon).toEqual(img37);
    expect(WeatherIcons(38, true).weatherIcon).toEqual(img38);
    expect(WeatherIcons(39, true).weatherIcon).toEqual(img39);

    expect(WeatherIcons(37).weatherDsc).toEqual(messages.isolatedThunderstorms.defaultMessage);
    expect(WeatherIcons(37, true).weatherDsc).toEqual(messages.isolatedThunderstorms.defaultMessage);
    expect(WeatherIcons(38).weatherDsc).toEqual(messages.scatteredThunderstorms.defaultMessage);
    expect(WeatherIcons(38, true).weatherDsc).toEqual(messages.scatteredThunderstorms.defaultMessage);
    expect(WeatherIcons(39).weatherDsc).toEqual(messages.scatteredThunderstorms.defaultMessage);
    expect(WeatherIcons(39, true).weatherDsc).toEqual(messages.scatteredThunderstorms.defaultMessage);
  });
  it('should return scatteredShowers icon and correct description(s)', () => {
    expect(WeatherIcons(40).weatherIcon).toEqual(scatteredShowers);
    expect(WeatherIcons(40, true).weatherIcon).toEqual(img40);

    expect(WeatherIcons(40).weatherDsc).toEqual(messages.scatteredShowers.defaultMessage);
    expect(WeatherIcons(40, true).weatherDsc).toEqual(messages.scatteredShowers.defaultMessage);
  });
  it('should return scatteredSnowShowers icon and correct description(s)', () => {
    expect(WeatherIcons(42).weatherIcon).toEqual(scatteredSnowShowers);
    expect(WeatherIcons(42, true).weatherIcon).toEqual(img42);

    expect(WeatherIcons(42).weatherDsc).toEqual(messages.scatteredSnowShowers.defaultMessage);
    expect(WeatherIcons(42, true).weatherDsc).toEqual(messages.scatteredSnowShowers.defaultMessage);
  });
  it('should return scatteredShowersNight icon and correct description(s)', () => {
    expect(WeatherIcons(45).weatherIcon).toEqual(scatteredShowersNight);
    expect(WeatherIcons(45, true).weatherIcon).toEqual(img45);

    expect(WeatherIcons(45).weatherDsc).toEqual(messages.scatteredShowersAtNight.defaultMessage);
    expect(WeatherIcons(45, true).weatherDsc).toEqual(messages.scatteredShowersAtNight.defaultMessage);
  });
  it('should return scatteredSnowShowersNight icon and correct description(s)', () => {
    expect(WeatherIcons(46).weatherIcon).toEqual(scatteredSnowShowersNight);
    expect(WeatherIcons(46, true).weatherIcon).toEqual(img46);

    expect(WeatherIcons(46).weatherDsc).toEqual(messages.scatteredSnowShowersNight.defaultMessage);
    expect(WeatherIcons(46, true).weatherDsc).toEqual(messages.scatteredSnowShowersNight.defaultMessage);
  });
  it('should return freezingRainNight icon and correct description(s)', () => {
    expect(WeatherIcons(47).weatherIcon).toEqual(freezingRainNight);
    expect(WeatherIcons(47, true).weatherIcon).toEqual(img47);

    expect(WeatherIcons(47).weatherDsc).toEqual(messages.freezingRainNight.defaultMessage);
    expect(WeatherIcons(47, true).weatherDsc).toEqual(messages.freezingRainNight.defaultMessage);
  });
});
