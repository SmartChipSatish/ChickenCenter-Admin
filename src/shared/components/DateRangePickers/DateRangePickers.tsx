import React, { useContext, useEffect, useRef, useState } from "react";
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { addDays } from 'date-fns'
import format from 'date-fns/format'
import "./DateRangePickers.scss"
import { Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCableCar, faCalendar } from "@fortawesome/free-solid-svg-icons";

export const DateRangePickers = ((props) => {
  const refOne = useRef(null)
  const dateRef = useRef(null)
  const {dateArray, eventType=''}=props
  const initialEndDate=()=>{return dateArray?.startDate==dateArray?.endDate ? new Date(dateArray?.endDate) : new Date(addDays(new Date(dateArray?.endDate),-1))}
  let initialState = [
    {
      startDate: dateArray? dateArray.startDate : addDays(new Date(),-364),
      endDate: dateArray ? initialEndDate() : new Date(),
      key: 'selection'
    }
  ]
  const [openCalendar, setOpenCalendar] = useState(false)
  const defaultDate = { startDate: dateArray?.startDate|| addDays(new Date(), -364), endDate: new Date(dateArray?.endDate) || new Date() }
  const [dateRange, setDateRange] = useState(initialState)

  const handleButtonClick = (target) => {
    let selected_ranges = refOne.current.dateRange.props.ranges[0]
    delete selected_ranges['key']
    let dateObj = target === "apply" ? selected_ranges : defaultDate
    setDateRange([dateObj])    
    if(target == "apply")  {props.selectedDate(dateObj);;setOpenCalendar(false)}
    else{setOpenCalendar(false);props.selectedDate(defaultDate)}

  }

  useEffect(() => {
    if(dateArray && dateArray?.startDate !== dateRange[0].startDate || dateArray?.endDate !== dateRange[0].endDate) {
      setDateRange([
        {
          startDate: dateArray? new Date(dateArray.startDate) : addDays(new Date(),-364),
          endDate: dateArray ? initialEndDate() : new Date(),
          key: 'selection'
        }
      ])
    }
  }, [dateArray?.startDate, dateArray?.endDate])

  useEffect(() => {
		const handleOutsideClick = (event) => {
			if (
				dateRef.current &&
				!dateRef.current.contains(event.target) &&
        openCalendar
			) {       
        setDateRange([
          {
            startDate: dateArray ? new Date(dateArray.startDate) : addDays(new Date(),-364),
            endDate: dateArray ? initialEndDate() : new Date(),
            key: 'selection'
          }
        ])
				setOpenCalendar(false);
			}
		};

		document.addEventListener("mousedown", handleOutsideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [dateRef, dateArray, openCalendar]);

  useEffect(() => {
    if (openCalendar) {
      let button_element = document.getElementsByClassName('rdrCalendarWrapper rdrDateRangeWrapper');
      let buttoncontent = document.createElement('span')
      buttoncontent.innerHTML = "<input type='button' id='clear' value='Clear' class='clear-btn'/>" + "<input type='button' id='apply' value='Apply' class='apply-btn'/>";
      buttoncontent.setAttribute('class', 'customm-btn-class')
      buttoncontent.onclick = (e) => { handleButtonClick(e.target.id) }
      button_element.length && button_element[0].appendChild(buttoncontent);
    }
  }, [openCalendar, refOne])

  // Hide on outside click
  // const hideOnClickOutside = (e) => {
  //   if (dateRef.current && !dateRef.current.contains(e.target)) {
  //     setOpenCalendar(false)
  //   }
  // }

  // hide dropdown on ESC press
  const hideOnEscape = (e:any) => {
    if (e.key === "Escape") {
      setOpenCalendar(false)
    }
  }

  useEffect(() => {
    // document.addEventListener("click", hideOnClickOutside, true)
    document.addEventListener("keydown", hideOnEscape, true)
  }, [])

  const maxDate = eventType && ['upcoming','cancelled'].includes(eventType) ? undefined : new Date();

  return (
    <div ref={dateRef}>
      <Form.Group className="from_period text-start">
        {/* <Form.Label className={"text-muted opacity-75 form-label"}>Date Range</Form.Label> */}
        <InputGroup className="cursor-pointer" onClick={() => { setOpenCalendar(!openCalendar) }}>
          <Form.Control type="text" value={`${format(dateRange[0].startDate, "MMM dd yyyy")} - ${format(dateRange[0].endDate, "MMM dd yyyy")}`} readOnly />
          <InputGroup.Text className={"bg-transparent"}>
            <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
          </InputGroup.Text> 
        </InputGroup>
      </Form.Group>

      <div>
        {openCalendar &&
          <DateRangePicker
            ref={refOne}
            className={"calendar-element calendar-element-responsive"}
            onChange={item => { setDateRange([item.selection ? item.selection : item.range1]) }}
            // showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={dateRange}
            direction="horizontal"
            dateDisplayFormat={"MMM dd yyyy"}
            maxDate={maxDate}
            minDate={new Date('2023-01-01')}
            // disabledDay={(date) => date.getTime() > new Date().getTime()}
          />
        }
      </div>
    </div>
  )
})
