import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import { Row, Col, Button } from 'antd';
import CourseRow from './courseRow';

const SPI = forwardRef((props: { branch: any, numberOfSems: any ,SemID:any,Credits:any,Grades:any}, ref) => {
    const [Courserows, setCourserows] = useState<Array<any>>([]) //the rows displayed in UI
    const [grade, setgrade] = useState<Array<any>>([]) // array containing the grades
    const [credit, setCredit] = useState<Array<any>>([]) //array containing the credits
    var coursesArray: Array<any> = [] //will contain the fetched json data

    // function to update the credit on change
    const Credit = (credittaken: any, id: number) => {
        if (credittaken === 0) {
            return
        }
        var dummycredit:any = credit
        dummycredit[id] = credittaken
        // console.log('From spi length credit', credit)
        setCredit(dummycredit)

    }

    // function ot update the grade on change
    const Grade = (gradetaken: any, id: number) => {
        if (gradetaken === undefined) {
            return
        }
        var dummygrade = grade
        dummygrade[id] = gradetaken
        // console.log('grade', grade)
        setgrade(dummygrade)
    }

    // Fetch the courses json
    const fetchJSON = async () => {
        const response = await fetch('./courses.json', { method: 'GET' })
        return response.json()
    }

    // displaying the fetched courses according to branch and sem
    useEffect(() => {
        setCourserows(prev => prev.slice(0, prev.length))
        setCredit(prev => prev.slice(0, prev.length))
        setgrade(prev => prev.slice(0, prev.length))
        fetchJSON().then((array) => {
            coursesArray = array
            let i = 0
            //Get the branch from coursesArray
            for (; i < coursesArray.length; i++) {
                if (coursesArray[i].dept === props.branch) {
                    break;
                }
            }
            let j = 0, sem, course: any = [], dummycredit: any = []
            // Get the sem using the branch object
            for (; j < Object.keys(coursesArray[i]).length; j++) {
                if (Object.keys(coursesArray[i])[j] === props.numberOfSems) {
                    sem = Object.keys(coursesArray[i])[j]
                    break;
                }
            }
            for (let index = 0; sem && index < coursesArray[i][sem].length; index++) {
                var dummyarray: Array<any> = [<CourseRow courseCode={Object.keys(coursesArray[i][sem][index])[0]} creditValue={coursesArray[i][sem][index][Object.keys(coursesArray[i][sem][index])[0]]} credits={Credit} grades={Grade} id={course.length} key={course.length} />]

                course = course.concat(dummyarray)

            }
            setCourserows(Courserows.concat(course))
        })
    }, [props.branch, props.numberOfSems])

    // to add more courses
    const Addrow = () => {
        var dummyarray: Array<any> = [<CourseRow courseCode={null} creditValue={null} credits={Credit} grades={Grade} id={Courserows.length} key={Courserows.length} />]
        setCourserows(Courserows.concat(dummyarray));
    }

    useEffect(() => {
        props.Credits(credit,props.SemID)
    }, [credit])
    useEffect(() => {
        props.Grades(grade,props.SemID)
    }, [grade])

    // function to calculate spi
    // const calculate = (Semid :any) => {
    //     var sum = 0
    //     var denominator = 0
    //     for (let i = 0; i < Courserows.length; i++) {
    //         console.log(credit[Semid][i])
    //         switch (grade[Semid][i]) {
    //             case "A*/A":
    //                 sum += credit[Semid][i] * 10
    //                 break
    //             case "B":
    //                 sum += credit[Semid][i] * 8;
    //                 break;
    //             case "C":
    //                 sum += credit[Semid][i] * 6;
    //                 break;
    //             case "D":
    //                 sum += credit[Semid][i] * 4;
    //                 break;
    //             case "E":
    //                 sum += credit[Semid][i] * 2;
    //                 break;
    //             case "F":
    //                 sum += credit[Semid][i] * 0;
    //                 break;
    //             case "drop":
    //                 sum += credit[Semid][i] * 0;
    //                 break;
    //             case undefined:
    //                 sum += credit[Semid][i] * 0;
    //                 break;
    //         }
    //         denominator += credit[Semid][i];
    //         console.log('sum', sum)
    //         console.log('denominator', denominator)
    //     }
    //     var spi = sum / denominator
    //     console.log(spi.toFixed(3))
    //     var array = [spi.toFixed(3),denominator]
    //     return (array)
    // }
    // hook to use calcualte function in calculator page (necessary for designing)
    // useImperativeHandle(
    //     ref,
    //     () => ({
    //         calculate,
    //     })
    // )

    // debugging
    console.log('From SPI lenght courserow', Courserows.length)
    console.log('From spi length credit', credit)
    console.log('grade', grade)

    // JSX
    return (
        <>
            <Row style={{ fontWeight: 'bolder', fontSize: '1rem', rowGap: '1rem', margin: '0.2rem' }}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                    Course
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                    Credits
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                    Grade
                </Col>
            </Row>
            {Courserows}
            <Row style={{ fontWeight: 'bolder', fontSize: '1rem', rowGap: '1rem', margin: '0.2rem' }}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                    <Button type='default' onClick={Addrow} style={{ color: '#1850ff' }}>Add Course</Button>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}></Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}></Col>
            </Row>
        </>
    )
})
export default SPI
