import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

import AboutMeFormContainer from 'containers/MyAccount/AboutMeFormContainer';

import '../../../node_modules/react-accessible-accordion/dist/react-accessible-accordion.css';
import styles from './myAccountProfileAccordion.scss';

export default function MyAccountProfileAccordion(props) {
  return (
    <Accordion accordion={false}>
      <AccordionItem>
        <AccordionItemTitle>
          <h3 className={styles.uPositionRelative + ' ' + styles.accordionTitle} >
                About me &amp; contact information
              <div className={styles.accordionArrow} role="presentation" />
          </h3>
        </AccordionItemTitle>
        <AccordionItemBody>
          <AboutMeFormContainer />
        </AccordionItemBody>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemTitle>
          <h3 className={styles.uPositionRelative + ' ' + styles.accordionTitle} >
                Travel identification documents
            <div className={styles.accordionArrow} role="presentation" />
          </h3>
        </AccordionItemTitle>
        <AccordionItemBody> Body Text
        </AccordionItemBody>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemTitle>
          <h3 className={styles.uPositionRelative + ' ' + styles.accordionTitle}>
                  MileagePlus&reg; partner loyalty
            <div className={styles.accordionArrow} role="presentation" />
          </h3>
        </AccordionItemTitle>
        <AccordionItemBody> Body Text
        </AccordionItemBody>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemTitle>
          <h3 className={styles.uPositionRelative + ' ' + styles.accordionTitle}>
                  Saved travelers
            <div className={styles.accordionArrow} role="presentation" />
          </h3>
        </AccordionItemTitle>
        <AccordionItemBody> Body Text
        </AccordionItemBody>
      </AccordionItem>
    </Accordion>
  );
}

MyAccountProfileAccordion.propTypes = {
  onChangeModel: PropTypes.func,
  loadMileagePlusProfileService: PropTypes.func,
  loadCountryListService: PropTypes.func,
};
