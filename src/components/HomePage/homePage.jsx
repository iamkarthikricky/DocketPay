import { useEffect } from 'react';
import axiosInstance from '../../axiosConfig/axiosConfig';


const HomePage=()=>{

    useEffect(()=>{
        const getUsers=async()=>{
            try{
                const response = await axiosInstance.get("/users")
                console.log(response)
            }catch(error){
                console.log(error)
            }
        }
        getUsers()
    },[])

    return(
        <h1>This is HomePage</h1>
    )
}


export default HomePage