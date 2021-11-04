import React , { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router'
import { checkLoginAction, cleanLoginCheck } from '../../../Controllers/actions/loginAction'
import { getAllUsers } from '../../../Controllers/actions/userActions'

import LoginFormComponents from './LoginFormComponents'
import GoogleLogin from 'react-google-login'
import { GOOGLE_ID } from '../../../constants'
import { Link } from 'react-router-dom'



function LoginComponentsContainer({Joined, setUsername, setLogin, login}) {

    //funcion que llame el listado de usernames y mails
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getAllUsers())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const history = useHistory()

    const users = useSelector(state => state.userReducer.users)
    const userNames = users.map(elem=>elem.username)


    const [showErrorText, setShowErrorText] = useState(false)
    const [userIndex, setUserIndex] = useState()
    const [userFind, setUserFind] = useState('')
    const [passVerified, setPassVerified] = useState('')
    const [UserCanLog, setUserCanLog] = useState(true)
    const [passError, setPassError] = useState(false)

    const [usernameField, setUsernameField] = useState()
    const [passField, setPassField] = useState()
    
    const [errors, setErrors] = useState({
        username:'have some error',
        password:'have some error'
    })
    
    const [userFields, setuserFields] = useState({
        username:'',
        password:''
    })

    // FUNCTIONS ///////////////

    const handleErrors=()=>{
        if(userFind.length>0){
            setErrors({
                ...errors, username:'' 
            })
            return;
        }
        if(passVerified.length>0){
            setErrors({
                ...errors, password:'' 
            })
            setPassError(false)
            return
        }
    }

    const cleanErrors=(prop)=>{
        setErrors({
            ...errors, [prop]:''
        })
    }

    const checkErrors = ()=>{
        if(errors.username.length>0){
            setUserCanLog(true)
        }else if(errors.password.length>0){
            setUserCanLog(true)
        }else {
            setUserCanLog(false)
        }
    }

    const handleFields=(e)=>{
        if(e.target.name==='username'){
            setuserFields({
                ...userFields, username:e.target.value
                })
                if(userNames.includes(e.target.value)){
                    setUserIndex(userNames.indexOf(e.target.value))
                    setUserFind('User Coincidence')
                    cleanErrors('username')
                    checkErrors()
                    return
                }else if(!userNames.includes(e.target.value)){
                    setUserIndex({})
                    setUserFind('')
                    handleErrors(e.target.name)
                    setUserCanLog(true)
                }
                userFind.length===0 && setErrors({
                    username:'have some error',
                    password:'have some error'
                })
            return
        }
        if(e.target.name==='password'){
            if(e.target.value.length>=6){
                setPassVerified('Password Verified')
                cleanErrors('password')
                setuserFields({
                    ...userFields, password:e.target.value
                })
                checkErrors()
                setShowErrorText(false)
            }else if(e.target.value.length<=5){
                setUserCanLog(true)
                setPassVerified('')
                handleErrors(e.target.name)
                setuserFields({
                    ...userFields, password:''
                })
            }
            return
        }
        
    }

    const UserLog = useSelector(state=> state.sessionReducer.status)
    //console.log(UserLog)
    //console.log(UserLog.token)
    //console.log(UserLog.username)

    if(UserLog === 'Las contraseñas no coinciden'){
        setPassError(true)
        setLogin(false)
        setuserFields({
            username:'',
            password:''
        })
        dispatch(cleanLoginCheck())
        setShowErrorText(true)
    }

    const logIn = ()=>{
        dispatch(checkLoginAction({username:userNames[userIndex], password: userFields.password}))
            //console.log('PRE JOINED => ')
            //console.log({username:userNames[userIndex], password: userFields.password})
            setUsername(userNames[userIndex])
            Joined(userNames[userIndex])
            setShowErrorText(true)
    }
    //console.log(UserLog)
    //console.log({username:userFields.username, password: userFields.password})



    const responseGoogle =(res)=>{
        //console.log(res.profileObj)
        //console.log(res.profileObj.email)
        const endUN = res.profileObj.email.indexOf('@')
        if(!userNames.includes(res.profileObj.email.slice(0, endUN))){
            alert('Usuario inexistente , por favor crea tu cuenta ! ')
            return history.push('/registro')
        }
        //console.log(res.profileObj.email.slice(0, endUN))
        setUsername(res.profileObj.email.slice(0, endUN))
        Joined(res.profileObj.email.slice(0, endUN))
        setShowErrorText(true)
        dispatch(checkLoginAction({username:res.profileObj.email.slice(0, endUN), password:res.profileObj.googleId}))
        //console.log({username:res.profileObj.email.slice(0, endUN), password:res.profileObj.googleId})
    }


    // const Joined=()=>{
    //     if(!window.localStorage.login && UserLog==='Correcto')console.log('LOGEANDO')
    // }
    //window.localStorage.login = true : window.localStorage.login = ''
    /* 
    const Joined = () => {
        window.localStorage.login = true;
    }
    
    const Logout = () => {
        window.localStorage.login = '';
    }
    */

    return (
        <div class='flex flex-col items-center justify-start mt-44 h-screen'>
            {(UserLog.token && UserLog.token.length>0) ? 
                <Redirect to={`/miperfil/${UserLog.username}`}/>
                    :
            ( UserLog!=='Correcto') &&
                <LoginFormComponents    handleFields={handleFields}
                                        logIn={logIn}
                                        tagUser={userFind}
                                        tagPass={passVerified}
                                        UserCanLog={UserCanLog}
                                        passError={passError}
                                        UserLog={UserLog}
                                        showError={showErrorText}
                                        Joined={Joined}
                                        login={login}
                                        usernameField={usernameField}
                                        setUsernameField={setUsernameField}
                                        passField={passField}
                                        setPassField={setPassField}
                                    />
            }
            
                {/* <LoginFormComponents    handleFields={handleFields}
                                        logIn={logIn}
                                        tagUser={userFind}
                                        tagPass={passVerified}
                                        UserCanLog={UserCanLog}
                                        passError={passError}
                                        UserLog={UserLog}
                                        showError={showErrorText}
                                        Joined={Joined}
                                        login={login}
                                        usernameField={usernameField}
                                        setUsernameField={setUsernameField}
                                        passField={passField}
                                        setPassField={setPassField}
                                    /> */}
            <br/>
            <GoogleLogin
                        clientId={GOOGLE_ID}
                        buttonText="Iniciar Sesion"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
            <div className='flex flex-col items-center justify-center mt-6 text-2xl font-semibold text-green-600  '>
                <Link   className='hover:no-underline hover:text-red-400 duration-700' 
                        to={'/registro'}>Crea tu cuenta!</Link>
            </div>
            
        </div>
    )
}

export default LoginComponentsContainer
