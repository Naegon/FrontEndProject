import React, {useState,useEffect} from "react";

const Mainpage = ()=>{

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    let consClassment = {};
    let constructorName = {};

    const setclassment = (item)=>{

        for(const resultat of item){
            let index = 0;
            if(resultat.Constructor.name in consClassment){
                consClassment[resultat.Constructor.name] += parseInt(resultat.points);

            }
            else{
                consClassment[resultat.Constructor.name] = parseInt(resultat.points);
                constructorName[index] = resultat.Constructor.name;
                index++;
            }
        }
    }

    useEffect(() => {
        fetch("http://ergast.com/api/f1/current/results.json?limit=1000")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.MRData.RaceTable.Races.slice(result.MRData.RaceTable.Races.length -3));
                    setclassment(result.MRData.RaceTable.Races[0].Results)
                    // console.log(consClassment)
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
            <div>
                {items.map((item, key) => {
                    return(
                        <div>
                            <h1>{item.raceName}</h1>
                            <p>{item.season + " - Round " + item.round}</p>
                            {item.Results.map((item2, key2) => {
                                // setclassment(item2,key)
                                return(
                                    <div key={key2}>
                                        <p>{item2.position}</p>
                                        <p>{item2.Driver.givenName+" " +item2.Driver.familyName}</p>
                                        <p>{"Constructor: " +item2.Constructor.name}</p>
                                        {/*<p>{"Time: "+item2.Time.time}</p>*/}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
                {items.map((item, key) => {
                    setclassment(item.Results)
                    return(
                        <div>
                            <h1>Classement Constructeurs</h1>

                            {/*{constructorName.map((item9) => {*/}
                            {/*    console.log(item9)*/}
                            {/*    // <p>{key}</p>*/}
                            {/*    // <p>{item}</p>*/}
                            {/*})*/}
                            {/*}*/}

                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Mainpage;
