import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


interface deleteModal {

    deleteCount: number,
    isOpen: boolean,
    close?: any
}

export function DeleteNewsModal(props: deleteModal) {

    return (
        <div>

            <Dialog
                open={props.isOpen}
                onClose={props.close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`You delete ${props.deleteCount} data`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                        <li>
                            <span>Data is deleted as <b> soft delete </b> </span>
                        </li>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button style={{
                        background: 'tomato',
                        borderRadius: '11px',
                        height: 40,
                        color: 'white',
                        width: 80

                    }} onClick={() => {
                    }}>Delete</Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}


