import React, {Component} from 'react';

const tableStyle= {
    border: '2px solid black',
    borderCollapse: 'collapse',
    marginLeft: '20vw',
    marginRight: '20vw',
    width: '50vw'
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
    ['', '11:15 AM - 11:30 AM', 'Lập đội'],
    ['', '12:00 PM', 'Hacking bắt đầu'],
    ['', '12:30 PM', 'Bữa trưa'],
    ['', '1:30 PM', 'Workshop #1'],
    ['', '2:30 PM', 'Workshop #2'],
    ['', '3:30 PM', 'Workshop #3'],
    ['', '4:30 PM', 'Workshop #4'],
    ['', '7:00 PM', 'Bữa tối'],
    ['', '8:00 PM', 'Panel #1 cùng diễn giả'],
    ['', '9:00 PM', 'Trò chơi xếp cốc'],
    ['', '10:00 PM', 'Trò chơi Fanta/Coke Pong'],
    ['', '11:00 PM', 'Trình bày ý tưởng ngẫu hứng + Face mask'],
    ['8/7/2018', '12:00 AM', 'Cà phê + Bữa đêm'],
    ['', '7:00 AM', 'Yoga'],
    ['', '7:30 AM', 'Bữa sáng'],
    ['', '10:30 AM', 'Panel #2 cùng diễn giả'],
    ['', '12:00 PM', 'Hacking kết thúc + bữa trưa'],
    ['', '1:00 PM', 'Trình bày dự án + Giám khảo đánh giá'],
    ['', '2:00 PM', 'Lễ bế mạc'],
    ['', '3:00 PM', 'Hackathon kết thúc']
];

export default class SheCodesTable extends Component {
    constructor(props)	{
        super(props);
    }


    render() {
        let renderTh= thValue.map(data => <th style={{...thStyle, ...thTdCommonStyle}}>{data}</th>);
        let renderTd= tdValue.map(element => {
            return(
                <tr>{element.map(data => <td style={thTdCommonStyle}>{data}</td>)}</tr>
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