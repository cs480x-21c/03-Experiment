import React from 'react';
import HeaderBar from '../components/HeaderBar'
import DatabaseExample from '../components/DatabaseExample'

class Project5PageView extends React.Component{

    state = {
            
    };

    render(){
        return(
            <div>
                <HeaderBar/>
                <h5>
                    This project has not been completed yet!
                </h5>
                
                <DatabaseExample></DatabaseExample>
            </div>
        );
    }
}

export default Project5PageView;
