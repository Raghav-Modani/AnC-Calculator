import type { NextPage } from 'next'
import styles from '../styles/calculator.module.css'
import { Menu, Dropdown, Button, Card,Tabs, Row, Col } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useState, useRef } from 'react';
import CPI from '../components/cpi';

const Calculator: NextPage = () => {

    const cpiRef  = useRef<any>(null) // ref used for getting access to the CalculateCPI function of CPI component

    const [CPIorSPI, setCPIorSPI] = useState("spi")
    const [Dept, setDept] = useState(null)
    const [Sem, setSem] = useState(null)
    const [answer, setanswer] = useState(null) 

    const { TabPane } = Tabs;

    const onClick = (key: any) => {
        setCPIorSPI(key)
    };
    const onClickDept = ({ key }: any) => {
        setDept(key)
    }
    const onClickSem = ({ key }: any) => {
        setSem(key)
    };
    const deptMenu = (
        <Menu onClick={onClickDept}>
            <Menu.Item key="CHE">CHE</Menu.Item>
            <Menu.Item key="BSBE">BSBE</Menu.Item>
            <Menu.Item key="ME">ME</Menu.Item>
        </Menu>
    );
    const semMenu = (
        <Menu onClick={onClickSem}>
            <Menu.Item key="sem1">1st Sem</Menu.Item>
            <Menu.Item key="sem2">2nd Sem</Menu.Item>
            <Menu.Item key="sem3">3rd Sem</Menu.Item>
        </Menu>
    )
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 style={{ color: '#e5e5e5' }}>CPI/SPI Calculator</h1>
                    <h3 style={{ color: '#e5e5e5' }}>Calculate your SPI , CPI</h3>
                </div>
                <Card>
                    <Card className={styles.card}>
                        <div className={styles.dropdowns}>
                            <Dropdown overlay={deptMenu}>
                                <Button type='primary' onClick={e => e.preventDefault()}>
                                    {Dept ? Dept : 'Select your department'} <DownOutlined />
                                </Button>
                            </Dropdown>
                            <Dropdown overlay={semMenu} disabled={!Dept}>
                                <Button type='primary' onClick={e => e.preventDefault()}>
                                    {CPIorSPI === "cpi" ?
                                        (Sem ? Sem : 'Upto Sem') :
                                        (Sem ? Sem : 'Select semester')}<DownOutlined />
                                </Button>
                            </Dropdown>
                        </div>
                        <Tabs className={styles.tabs} onTabClick={onClick}>
                            <TabPane tab="SPI" key="spi" className={styles.tabpane}>
                                {Dept&&Sem ? <CPI branch={Dept} numberOfSems={Sem} inSPITab={true} ref={cpiRef}/>  : 'Please select department and sem'}
                                
                            </TabPane>
                            <TabPane tab="CPI" key="cpi" className={styles.tabpane}>
                               {Dept&&Sem ? <CPI branch={Dept} numberOfSems={Sem} inSPITab={false} ref={cpiRef}/> : 'Please select department and sem'}
                            </TabPane>
                        </Tabs>
                    </Card>
                    <Row style={{ fontWeight: 'bolder', fontSize: '1rem', marginTop: '0.2rem', display: 'flex', alignItems: 'center' }}>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <Button type='primary' danger onClick={() => {
                                if(cpiRef.current) {
                                    setanswer(cpiRef.current.calculate())
                                }
                            }}>
                                {CPIorSPI === "cpi" ? 'Calculate CPI' : 'Calculate SPI'}
                            </Button>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8} xl={8} style={{ textAlign: 'center', fontSize: '1rem' }}>
                            {answer? CPIorSPI === "cpi" ? 'Your CPI is:' : 'Your SPI is' : null}
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8} xl={8} className={styles.spi}>
                            {answer}
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>

    )
}
export default Calculator