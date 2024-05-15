import React ,{createContext,useContext,useState} from 'react'
const StateContext =createContext();


const initialdashboardState = {
    teachers: true,
    subjects: false,
    

    }

export const ContextProvider =({children})=>{
        
        const [isClicked,setClicked]=useState(initialdashboardState)

        const handelclicked=((click)=>setClicked(click
        
            ));

            return(
                <StateContext.Provider value={
                    {
                        isClicked,
                        handelclicked
                    }
                }>
                    {children}
                </StateContext.Provider>
            )
    }
export const  useStateContext=()=>useContext(StateContext)
