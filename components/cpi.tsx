import React, { useState ,useRef ,useEffect, useImperativeHandle, forwardRef} from 'react'
import SPI from './spi'

const CPI = forwardRef((props : {branch :any , numberOfSems :any,inSPITab:Boolean} ,ref) => {
    const spiRef = useRef(null)
    const [Sems,setSems] = useState<Array<any>>([])
    const [grade, setgrade] = useState<Array<any>>([]) // array containing the grades
    const [credit, setCredit] = useState<Array<any>>([]) //array containing the credits
    var index = Number(props.numberOfSems[3])
    var dummyarray = Sems

    const AppendCredit = (creditArray:any,id:any) => {
        var dummycredit:any = credit
        dummycredit[id] = creditArray
        setCredit(dummycredit)
    }
    const AppendGrade = (gradeArray:any,id:any) => {
        var dummygrade = grade
        dummygrade[id] = gradeArray
        setgrade(dummygrade)
    }

    useEffect(() => {
        if(props.inSPITab){
            dummyarray = dummyarray.concat([<SPI branch={props.branch} numberOfSems={props.numberOfSems} SemID={0} Credits={AppendCredit} Grades={AppendGrade} ref={spiRef} key={dummyarray.length}/>])
            setSems(dummyarray) 
            return
        }
        for (let i = 0; i < index; i++) {
            dummyarray= dummyarray.concat([<SPI branch={props.branch} numberOfSems={'sem'+(i+1)} SemID={dummyarray.length} Credits={AppendCredit} Grades={AppendGrade} ref={spiRef} key={dummyarray.length}/>]) 
        }
        setSems(dummyarray)
    }, [props.branch,props.numberOfSems])
    
    // const CalculateCPI = () => {
    //     var numerator =0,credits =0
    //     if (spiRef.current) {
    //         for (let i = 0; i < index; i++) {
    //             const [answerReceived,totalCredits] = spiRef.current.calculate(Sems.length)
    //             numerator += (answerReceived)*(totalCredits)
    //             credits += totalCredits
    //         }
    //         var CPI = numerator/credits
    //         return CPI.toFixed(3)
    //     }
    // }
    const calculate = () => {
        if(props.inSPITab){
            index=1
        }
        var sum = 0
        var denominator = 0
        for (let i = 0; i < index; i++) {
            for (let j = 0; j < credit[i].length; j++) {
                switch (grade[i][j]) {
                    case "A*/A":
                        sum += credit[i][j] * 10
                        break
                    case "B":
                        sum += credit[i][j] * 8;
                        break;
                    case "C":
                        sum += credit[i][j] * 6;
                        break;
                    case "D":
                        sum += credit[i][j] * 4;
                        break;
                    case "E":
                        sum += credit[i][j] * 2;
                        break;
                    case "F":
                        sum += credit[i][j] * 0;
                        break;
                    case "Drop":
                        sum += credit[i][j] * 0;
                        denominator -= credit[i][j];
                        break;
                    case undefined:
                        sum += credit[i][j] * 0;
                        break;
                }
                denominator += credit[i][j];
            }
        }
        var cpi = sum / denominator
        console.log(cpi.toFixed(3))
        return (cpi.toFixed(3))
    }
    // hook to use CalcualteCPI function in calculator page (necessary for designing)
    useImperativeHandle(
        ref,
        () => ({
            calculate,
        })
    )
    // debugging
    console.log('From cpi credit', credit)
    console.log('From cpi grade', grade)
    return (
        <>
            {/* <Row style={{ fontWeight: 'bolder', fontSize: '1rem', rowGap: '1rem', margin: '0.2rem' }}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}></Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}></Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}></Col>
            </Row> */}
            {Sems}
        </>
    )
})

export default CPI
