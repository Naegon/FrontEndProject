import React from 'react';

import "../css/cardmainpage.css"

const CardMainpage = (props)=>{

    return(
        <div className="c-mainpage__card">
            <div className="c-mainpage__card-title">
                <h1>{props.item.raceName}</h1>
                <p>{props.item.season + " - Round " + props.item.round}</p>
            </div>
            <div className="c-mainpage__card-container">
                <h2>Classment Pilots</h2>
                <div className="c-mainpage_colName ">
                    <h4>Pos.</h4>
                    <h4>Driver</h4>
                    <h4>Constructor</h4>
                    <h4>Points</h4>
                </div>
                {props.pilotclassment.slice(0, 3).map((item2, key2) => {/* we only keep the 3 first results for the overview*/
                    return(
                        <div className="c-mainpage__card-content" key={key2}>
                            <p>{key2+1}</p>
                            <p>{item2.name}</p>
                            <p>{item2.constructor}</p>
                            <p>{item2.points}</p>
                        </div>
                    );
                })}
            </div>
            <div className="c-mainpage__card-container">
                <h2>Classment Constructeurs</h2>
                <div className="c-mainpage_colName c-mainpage_colName-constructor">
                    <h4>Pos.</h4>
                    <h4>Name</h4>
                    <h4>Points</h4>
                </div>
                {props.constructorClassments.slice(0,3).map((item3, key3) => {/* we only keep the 3 first results for the overview*/
                    return(
                        <div className="c-mainpage__card-content c-mainpage__card-content-container" key={key3}>
                            <p>{key3+1}</p>
                            <p>{item3.name}</p>
                            <p>{item3.points}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
export default CardMainpage;
