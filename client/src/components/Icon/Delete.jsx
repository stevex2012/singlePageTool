import React from 'react';
import styled from 'styled-components';

const Div = styled.div(({style={}})=>{
    return {
        cursor:'pointer',
         ...style
    }
})
function Delete(props) {
    return (
        <Div {...props}>
            <svg t="1591421859410" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4466" width="16" height="16"><path d="M839.27272695 287H184.72727305c-12.27272695 0-20.45454521-8.18181826-20.4545461-20.45454521s8.18181826-20.45454521 20.4545461-20.4545461h654.5454539c12.27272695 0 20.45454521 8.18181826 20.4545461 20.4545461s-8.18181826 20.45454521-20.4545461 20.45454521zM383.13636348 753.36363652c-12.27272695 0-20.45454521-8.18181826-20.45454522-20.45454521v-286.36363652c0-12.27272695 8.18181826-20.45454521 20.45454522-20.4545461s20.45454521 8.18181826 20.45454521 20.4545461v284.31818174c0 12.27272695-8.18181826 22.5-20.45454521 22.49999999zM512 753.36363652c-12.27272695 0-20.45454521-8.18181826-20.45454521-20.45454521v-286.36363652c0-12.27272695 8.18181826-20.45454521 20.45454521-20.4545461s20.45454521 8.18181826 20.45454521 20.4545461v284.31818174c0 12.27272695-8.18181826 22.5-20.45454521 22.49999999zM640.86363652 753.36363652c-12.27272695 0-20.45454521-8.18181826-20.45454521-20.45454521v-286.36363652c0-12.27272695 8.18181826-20.45454521 20.45454521-20.4545461s20.45454521 8.18181826 20.45454522 20.4545461v284.31818174c0 12.27272695-8.18181826 22.5-20.45454522 22.49999999z" p-id="4467"></path><path d="M716.54545479 943.59090869H307.45454521c-45 0-81.81818174-36.81818174-81.81818173-81.81818174v-613.63636347h572.72727305v613.63636347c0 45-34.77272695 81.81818174-81.81818174 81.81818174z m-450-654.5454539v572.72727216c0 22.5 18.40909131 40.90909131 40.90909042 40.90909131h409.09090958c22.5 0 40.90909131-18.40909131 40.90909042-40.90909131v-572.72727216H266.54545479z" p-id="4468"></path><path d="M329.95454521 280.86363653c-10.22727305 0-18.40909131-6.13636347-20.45454521-16.36363653 0-4.09090869-2.04545479-10.22727305-2.04545479-16.36363652v-81.81818174c0-45 36.81818174-81.81818174 81.81818174-81.81818174h265.90909131c45 0 81.81818174 36.81818174 81.81818174 81.81818174v81.81818174c0 6.13636347 0 10.22727305-2.04545479 16.36363652-2.04545479 10.22727305-12.27272695 18.40909131-24.5454539 16.36363653-10.22727305-2.04545479-18.40909131-12.27272695-16.36363652-24.54545479V166.31818174c0-22.5-18.40909131-40.90909131-40.90909132-40.90909043H389.27272695c-22.5 0-40.90909131 18.40909131-40.90909043 40.90909043v81.81818173c0 4.09090869 0 6.13636347 2.04545479 10.22727305 2.04545479 10.22727305-4.09090869 22.5-14.31818262 24.54545479-2.04545479-2.04545479-4.09090869-2.04545479-6.13636348-2.04545479z" p-id="4469"></path></svg>
        </Div>

    )
}
export default Delete;