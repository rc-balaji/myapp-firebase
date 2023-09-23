import { useState } from 'react'
import { auth ,googleProvider  } from '../config/firebase'
import {createUserWithEmailAndPassword ,signInWithPopup,signOut } from 'firebase/auth'


export const Auth=()=>{

    const [email,setEmail]=useState("")
    const [pass,setPass]=useState("")

    console.log(auth?.currentUser?.email)
    console.log(auth?.currentUser?.email)
    const signIn= async ()=>{

        try{

            await createUserWithEmailAndPassword(auth,email,pass)
        }catch(err){
            console.log(err)
        }
    }
    const signInGoogle= async ()=>{

        try{

            await signInWithPopup(auth,googleProvider)
        }catch(err){
            console.log(err)
        }
    }
    const logout= async ()=>{

        try{

            await signOut(auth)
        }catch(err){
            console.log(err)
        }
    }
    return(
        <div>
            <input placeholder="Email"  onChange={(event)=>{
                setEmail(event.target.value)
            }}
           />
            <input placeholder="Password" type='password'  onChange={(event)=>{
                setPass(event.target.value)
            }} />
        <button onClick={signIn} >Sign In</button>

        <button onClick={signInGoogle} >Sigh in with Google</button>
        <button onClick={logout} >Log out</button>
        
        </div>
    )
}