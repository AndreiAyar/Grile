import React, { useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

function QuestionsView({ prop, testing }) {
    let [status, setStatus] = useState(0);

    return (
        <div>


            <FormControl component="fieldset" onChange={e => {

                if (e.target.checked) {
                    setStatus(status + 1)
                    console.log(e.target.checked)

                } else {
                    setStatus(status - 1)
                }
            }}>
                <FormGroup aria-label="position" row>
                    <FormControlLabel

                        label={prop}
                        value="end"
                        control={<Checkbox color="primary" />}
                        labelPlacement="end"
                    />
                </FormGroup>
            </FormControl>

        </div >
    )
}

export default QuestionsView