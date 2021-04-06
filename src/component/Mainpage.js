import React, {useState,useEffect} from "react";
import CardMainpage from "./CardMainpage";
import "../css/mainpage.css"

const Mainpage = ()=>{

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    let constructorArray = []
    let pilotArray = []

    const setclassmentConstructor = (item)=>{
        constructorArray = []
        let check = false;
        let points = 0;
        for(const resultat of item.Results){/*set the classment of the race */
            for(const constructor of constructorArray){
                if(constructor.name === (resultat.Constructor.name)){/*if the name of the constructor is already on the list, just add points*/
                    constructor.points += parseInt(resultat.points);
                    check = true;
                }
            }
            if(check === false) {/*else add points and name of the constructor*/
                points = parseInt(resultat.points);
                constructorArray[constructorArray.length] = {name: resultat.Constructor.name, points: points}
            }
            check = false;
        }
        constructorArray.sort((n1,n2) => n2.points -n1.points);
    }
    const setclassmentPilot = (item)=>{
        pilotArray = []
        let points =0;
        for(const resultat of item.Results){/*set the classment of the pilot on the race no need to sort the api did it */
            points = parseInt(resultat.points);
            const id = resultat.Driver.driverId;
            const name = resultat.Driver.familyName;
            const constructor =  resultat.Constructor.name;
            pilotArray[pilotArray.length] = {id:id,name:name,constructor:constructor,points:points}
        }
    }

    useEffect(() => {
        fetch("http://ergast.com/api/f1/current/results.json?limit=1000")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.MRData.RaceTable.Races.slice(result.MRData.RaceTable.Races.length -3));
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else {
        return (
            <div className="c-container c-mainpage" id="mainpage">
                <div className="c-mainpage__top">
                    <h1 className="c-mainpage__top--title">Latest Races</h1>
                </div>
                <div className="c-mainpage__wrapper">
                    {items.map((item, key) => {
                        {setclassmentPilot(item)}
                        {setclassmentConstructor(item)}
                        return(
                            <CardMainpage
                                key = {key}
                                item = {item}
                                localisation = {"Mainpage"}
                                constructorClassments = {constructorArray}
                                pilotclassment ={pilotArray}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Mainpage;
