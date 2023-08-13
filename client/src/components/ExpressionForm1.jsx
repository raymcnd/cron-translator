import { useState } from "react";

export default function ExpressionForm1() {
    const [userInput, setUserInput] = useState({
        minute: "",
        hour: "",
        dayMonth: "",
        month: "",
        dayWeek: ""
    })

    function handleInputChange(event) {
        setUserInput({
            ...userInput,
            [event.target.name]: event.target.value
        })
    }

    function translateMinute() {
        return userInput.minute
    }

    function translateDayMonth() {
        return userInput.month
    }



    return (
        <div style={{ maxWidth: "400px" }}>
        <h4 className="mb-3">Expression Form 1</h4>
        <div className="d-flex mb-3" style={{ gap: "2.5%" }}>
            <input type="text" style={{width: "18%"}} name="minute" onChange={handleInputChange}></input>
            <input type="text" style={{width: "18%"}} name="houre" onChange={handleInputChange} disabled></input>
            <input type="text" style={{width: "18%"}} name="dayMonth" onChange={handleInputChange}></input>
            <input type="text" style={{width: "18%"}} name="month" onChange={handleInputChange} disabled></input>
            <input type="text" style={{width: "18%"}} name="dayWeek" onChange={handleInputChange} disabled></input>
        </div>
        translateMinute: {translateMinute()} <br/>
        translateDayMonth: {translateDayMonth()}
        </div>
    )
}