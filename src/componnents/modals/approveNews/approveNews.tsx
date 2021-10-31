import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {approveNews} from "../../../DB/database";
import {rowModel} from "../../news/news";


interface deleteModal {
    deleteCount: number,
    isOpen: boolean,
    close?: any,
    ids: Array<rowModel>
}

export function ApproveNewsModal(props: deleteModal) {

    return (
        <div>
            <Dialog
                open={props.isOpen}
                onClose={props.close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`You Approve ${props.deleteCount} data`}
                </DialogTitle>
                <DialogActions>
                    <Button style={{
                        background: 'lightgreen',
                        borderRadius: '11px',
                        height: 40,
                        color: 'white',
                        width: 80

                    }} onClick={() => {

                        approveNews(props.ids);

                    }}>Approve</Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}


