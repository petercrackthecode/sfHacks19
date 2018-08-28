import React, {Component} from 'react';

const tableStyle= {
    border: '2px solid black',
    borderCollapse: 'collapse',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%'
};

const thStyle= {
    backgroundColor: 'teal',
    color: 'white',
};
const thTdCommonStyle= {
    border: '1px solid black',
    padding: '5px',
    textAlign: 'center'
};

let thValue= ['Ngày', 'Giờ', 'Sự kiện chính'];
let tdValue= [
    ['7/7/2018', '9:30 AM', 'Check-in người tham dự Cà phê và snack Network với các công ty'],
    ['', '11:00 AM', 'Lễ khai mạc'],
    ['', '11:15 AM - 11:30 AM', 'Lập đội']
];

export default class SheCodesTable extends Component {
    constructor(props)	{
        super(props);
    }


    render() {
        let renderTh= thValue.map(data => {return (<th style={{...thStyle, ...thTdCommonStyle}}>{data}</th>)});
        let renderTd= tdValue.map(element => {
            return(
                <tr>{element.map(data => {return (<td style={thTdCommonStyle}>{data}</td>)})}</tr>
            )});
        console.log(renderTh);
        return(
            <div>
                <table style={tableStyle}>
                    <tr>
                        {renderTh}
                    </tr>
                    {renderTd}
                </table>
            </div>
        );
    }
};