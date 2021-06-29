import React from 'react';
import DevBox from './dev_box';


function ContactPage(props) {



    return (
        <div className='contact-page-container'>
            <h2>The Team</h2>
            <div className='dev-box-container'>
                <DevBox name='Kevin Yunas' gitLink='https://github.com/yunasty' profilePic='https://avatars.githubusercontent.com/u/22901798?v=4' linkedin='templinkforplacement' linkedin='https://www.linkedin.com/in/kevin-yunas-987325183/'/>
                <DevBox name="Kevin O'Connor" gitLink='https://github.com/Schploink' profilePic='https://avatars.githubusercontent.com/u/77660759?v=4' linkedin='templinkforplacement' linkedin='placeholder'/>
                <DevBox name='Elijah Ally' gitLink='https://github.com/ElijahAlly' profilePic='https://avatars.githubusercontent.com/u/75961076?v=4' linkedin='templinkforplacement' linkedin='https://www.linkedin.com/in/elijah-ally-123ea/'/>
                <DevBox name='Brian Codington' gitLink='https://github.com/brcodington78' profilePic='https://avatars.githubusercontent.com/u/80482919?v=4' linkedin='templinkforplacement' linkedin='https://www.linkedin.com/in/brian-codington-8322a8216/'/>
            </div>
            
        </div>
    )
}

export default ContactPage





















