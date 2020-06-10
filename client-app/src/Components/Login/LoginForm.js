import React, { useState } from 'react'
import { Grid, Form, Segment, Input, Button, Loader } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { userLogin} from '../../Redux/Actions/authAction'
import Spinner from '../../Helpers/Spinner'

const LoginForm = ({userLogin,failed,loader}) => {

    const [user,setUser] = useState({
        email : "",
        password : ""
    })


    return (
        <div>
            <h1>Veri iletişim platformu</h1>
            <Grid textAlign="center" verticalAlign='middle'>
                <Grid.Column style={{maxWidth: 450}}>
                    {failed && <h3 style={{color : "red"}}>Geçersiz Kullanıcı adı ve şifre girdiniz.</h3>}
                    <Form size="large" onSubmit={() => {
                        
                        userLogin(user)
                    }} >
                        <Segment stacked>
                            <Form.Field>
                                <Input fluid icon='user' name="Email" iconPosition='left' placeholder='Username' onChange={e => setUser({...user, email : e.target.value})} />
                            </Form.Field>
                            <Form.Field>
                                <Input fluid icon='lock' type="Password" name="password" iconPosition='left' onChange={e => setUser({...user, password : e.target.value})} placeholder='Password'  />
                            </Form.Field>
                            <Button type="submit" primary fluid size="large" content={loader ? <Spinner /> : "Giriş Yap"} />
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
    )
}

const mapDispatchToProps = {
    userLogin
}

const mapStateToProps = (state) => ({
    failed : state.authReducer.failed,
    loader : state.authReducer.loader
})
 
export default connect(mapStateToProps,mapDispatchToProps)(LoginForm)
