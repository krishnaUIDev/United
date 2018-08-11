import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from  './dropdown.scss';


class DropdownComponent extends Component{

  constructor(props){
    super(props);

    this.state={
      expand:false,
      selectedItem: (props.defaultValue ? props.defaultValue : (props.isArrayOfObject ?  {value:'', text:''} :'' )),
      focusedItem: -1
    };

    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleEscapeKey = this.handleEscapeKey.bind(this);
    this.handleArrowUpKey = this.handleArrowUpKey.bind(this);
    this.handleArrowDownKey = this.handleArrowDownKey.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
    this.handleTabKey = this.handleTabKey.bind(this);
  }


  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    (this.state.wrapperRef).addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    (this.state.wrapperRef).removeEventListener('keydown', this.handleKeyDown);
  }

  toggle(){
    let expand = this.state.expand;
    this.setState({
      expand: !expand,
      focusedItem: -1
    });
  }

  handleClick(selectedItem,index){
    this.setState({
      selectedItem: selectedItem,
      expand: false
    });

    {this.props.callback ? this.props.callback(selectedItem,index) : null}
  }


  handleClickOutside(event) {
    if (this.state.wrapperRef && !(this.state.wrapperRef).contains(event.target)) {
      this.setState({expand:false});
    }
  }

  handleEscapeKey(){
    this.setState({expand:false});
  }

  handleTabKey(){
    const {expand} = this.state;
    expand ? this.setState({expand:!expand}) : null;
  }

  handleArrowUpKey(){
    let focusedItem = this.state.focusedItem;
    let {listedItems} = this.props;
    let {expand} = this.state;
    let listOfDropDownItems = (this.dropDownList);
    if (focusedItem < 0 || (listedItems.length -1) === focusedItem){
      focusedItem = 0;
      expand ? listOfDropDownItems.scrollTop = 0 : null;
    }else{
      focusedItem--;
      expand ? listOfDropDownItems.scrollTop = listOfDropDownItems.scrollTop - 24 : null;
    }
    this.setState({focusedItem:focusedItem})
  }

  handleArrowDownKey(){
    let focusedItem = this.state.focusedItem;
    let {listedItems} = this.props;
    let {expand} = this.state;
    let listOfDropDownItems = (this.dropDownList);
    if (focusedItem < 0 || (listedItems.length -1) === focusedItem){
      focusedItem = 0;
      expand ? listOfDropDownItems.scrollTop = 0 : null;
    }else{
      focusedItem++;
    }
    this.setState({focusedItem:focusedItem})

  }

  handleEnterKey(){
    let {expand, focusedItem, selectedItem} = this.state;
    let {listedItems} = this.props;
    if(expand && focusedItem > -1 && selectedItem !== focusedItem){
      this.setState({selectedItem:listedItems[focusedItem], expand:false});
      {this.props.callback ? this.props.callback(selectedItem,focusedItem) : null}
    }
    else if(!expand){
      this.setState({expand: true});
    }
    else{
      this.setState({expand: false});
    }
  }

  setWrapperRef(node) {
    this.state.wrapperRef = node;
  }

  handleKeyDown(e){
    switch(event.which) {
      case 32:
        this.toggle();
        break;
      case 13:
        this.handleEnterKey();
        break;
      case 27:
        this.handleEscapeKey();
        break;
      case 38:
        this.handleArrowUpKey();
        break;
      case 40:
        this.handleArrowDownKey();
        break;
       case 9:
        this.handleTabKey();
        break;
      default:
        return;
    }

  }



  render(){
    const {selectedItem, expand } = this.state;
    const {id, customClass, label, optionKey, valueKey,listedItems,isArrayOfObject,placeHolder,highlight,selected} = this.props;
    return(
      <div  aria-label={this.props.arialabel} tabIndex="0" role="combobox"  ref={this.setWrapperRef} id={this.props.id ? this.props.id : null} className={customClass ? `dropDownContainer ${customClass}` : styles.dropDownContainer}>
        {label ? <label
          className={expand   ? 'active-label' : null}
          >{this.props.label}</label> : null}
        <div aria-label={this.props.arialabel} className="dropDown">
          <p aria-label={this.props.arialabel} onClick={(e)=>this.toggle(e)}> &nbsp;
            {selected && (isArrayOfObject ? (selectedItem)[this.props.optionKey] : selectedItem)}
            {((isArrayOfObject && (selectedItem)[this.props.optionKey] === '') || (selectedItem === '') || !selected) ?
           placeHolder : null}
            <span className="visuallyHidden">{this.props.screenReaderText}</span>
          </p>

          {expand ?
            <ul ref={(node) => { this.dropDownList = node; }} aria-label={this.props.arialabel}>
              {(listedItems).map((item, index) => {
                return <li  key={`${isArrayOfObject ? item[valueKey] : item} ${index}`}
                           className={
                             ((isArrayOfObject ? item[valueKey] : item) === (isArrayOfObject ? (selectedItem)[valueKey] : selectedItem) && highlight) ? 'active' : (this.state.focusedItem === index ? 'focus' : null)}
                           onClick={(e) => this.handleClick(item, index)}>
                  {isArrayOfObject ? item[optionKey] : item}
                </li>
              })}
            </ul> : null
          }
        </div>
      </div>

    );
  }
}

DropdownComponent.propTypes = {
  listedItems: PropTypes.array.isRequired,
  defaultValue: PropTypes.object,
  customClass: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  callback: PropTypes.func,
  optionKey: PropTypes.string,
  valueKey: PropTypes.string,
  isArrayOfObject: PropTypes.bool,
  highlight: PropTypes.bool,
  selected: PropTypes.bool,
  placeHolder: PropTypes.string,
  screenReaderText: PropTypes.string,
  setToDefault: PropTypes.any,
  arialabel: PropTypes.string,
  id: PropTypes.string,
};



DropdownComponent.defaultProps = {
  isArrayOfObject: true,
  optionKey: 'text',
  valueKey: 'value',
  highlight: true,
  selected: true,
  placeHolder:"",
  screenReaderText:'',

};


export default (DropdownComponent);
