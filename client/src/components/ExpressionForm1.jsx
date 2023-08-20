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
        let result = "";
        let minute = userInput.minute;

        let commaSplitted = minute.split(",")
        if (commaSplitted.some(e => e === "")) return "error"

        let slashSplitted = commaSplitted.map(e => {
            if (e.includes("/") || e.includes("-")) {
                let splitted = e.split("/")
                if (splitted.some(e => e === "")) return "error"
                return e.split("/")
            } else {
                return e
            }
        })

        let hyphenSplitted = slashSplitted.map(e => {
            if (Array.isArray(e) && e[0].includes("-")) {
                let splitted = e[0].split("-")
                if (splitted.some(e => e === "")) return "error"
                return [splitted, (e[1] ? e[1] : null)]
            } else {
                return e
            }
        })

        // console.log("commaSplitted", commaSplitted)
        // console.log("slashSplitted", slashSplitted)
        // console.log("hyphenSplitted", hyphenSplitted)

        let transformed = hyphenSplitted.map(e => e);
        let stringArr = []

        for (let e of transformed) {
            if (!Array.isArray(e) && e >= 0 && e <= 59) {
                stringArr.push(e)
            } else if (Array.isArray(e)) {
                if (e[1]) {
                    stringArr.push(`every ${convertToOrdinal(e[1])} minute from ${e[0][0]} through ${e[0][1]}`)
                } else if (!e[-1]) {
                    stringArr.push(`every minute from ${e[0][0]} through ${e[0][1]}`)
                }
            }
        }

        // console.log("transformed", transformed)
        // console.log("stringArr", stringArr)

        return result

        //     if (commaSplitted.every(e => Number.isInteger(Number(e)) && e !== "")) {
        //         if (commaSplitted.length > 2) {
        //             result += "minute " + commaSplitted.slice(0, -1).join(", ") + ", and " + commaSplitted.slice(-1)
        //         } else {
        //             result += "minute " + commaSplitted.join(" and ")
        //         }
        //     }
        //     // if (!/-|\//.test(minute)) {
        //     //     let str = 
        //     // }
        // }
        // return result
    }

    function convertToOrdinal(val) {
        if (!val) return

        if (val >= 11 && val <= 19) {
            return `${val}th`
        } else {
            let ordinal = ["st","nd","rd"][["1","2","3"].indexOf(val.substring(val.length-1))]
            if (ordinal) return `${val}${ordinal}`
            else return `${val}th`
        }
    }

    function translateDayMonth() {
        return userInput.dayMonth
    }

    return (
        <div style={{ maxWidth: "400px" }}>
        <h4 className="mb-3">Expression Form 1</h4>
        <div className="d-flex mb-3" style={{ gap: "2.5%" }}>
            <input type="text" style={{width: "18%"}} name="minute" onChange={handleInputChange}></input>
            <input type="text" style={{width: "18%"}} name="hour" onChange={handleInputChange} disabled></input>
            <input type="text" style={{width: "18%"}} name="dayMonth" onChange={handleInputChange}></input>
            <input type="text" style={{width: "18%"}} name="month" onChange={handleInputChange} disabled></input>
            <input type="text" style={{width: "18%"}} name="dayWeek" onChange={handleInputChange} disabled></input>
        </div>
        translateMinute: {translateMinute()} <br/>
        translateDayMonth: {translateDayMonth()}
        </div>
    )
}