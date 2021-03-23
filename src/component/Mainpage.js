import React, {useState,useEffect} from "react";

const Mainpage = ()=>{

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("http://ergast.com/api/f1/current/results.json?limit=1000")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.MRData.RaceTable.Races.slice(result.MRData.RaceTable.Races.length -3));
                    console.log(result);
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
                                return(
                                    <div key={key2}>
                                        <p>{item2.position}</p>
                                        <p>{item2.Driver.givenName+" " +item2.Driver.familyName}</p>
                                        <p>{"Constructor: " +item2.Constructor.name}</p>
                                        <p>{"Time: "+item2.Time.time}</p>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Mainpage;
